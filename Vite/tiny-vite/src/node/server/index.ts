import connect from "connect"; // 中间件机制的 轻量nodejs框架
import { blue, green } from "picocolors";
import { optimize } from "../optimizer/index"; // 预构建
import { resolvePlugins } from "../plugins";
import type { Plugin } from '../plugin'
import { createPluginContainer, PluginContainer } from "../pluginContainer";
import { indexHtmlMiddware } from "./middlewares/indexHtml";
import { transformMiddleware } from "./middlewares/transform";
import { staticMiddleware } from "./middlewares/static";
import { ModuleGraph } from "../ModuleGraph";
import chokidar, { FSWatcher } from "chokidar";
import { createWebSocketServer } from "../ws";
import { bindingHMREvents } from "../hmr";

export interface ServerContext {
    root: string;
    pluginContainer: PluginContainer;
    app: connect.Server;
    plugins: Plugin[];
    moduleGraph: ModuleGraph;
    ws: { send: (data: any) => void; close: () => void };
    watcher: FSWatcher;
}

export async function startDevServer() {
    const app = connect();
    const root = process.cwd();
    const startTime = Date.now();
    const ws = createWebSocketServer(app)
    const watcher = chokidar.watch(root, {
        ignored: ["**/node_modules/**", "**/.git/**"],
        ignoreInitial: true,
    });

    const plugins = resolvePlugins();
    const pluginContainer = createPluginContainer(plugins);
    const moduleGraph = new ModuleGraph((url) => pluginContainer.resolveId(url))
    const serverContext: ServerContext = {
        root: process.cwd(),
        app,
        pluginContainer,
        plugins,
        moduleGraph,
        ws,
        watcher
    };
    bindingHMREvents(serverContext);
    for (const plugin of plugins) {
        if (plugin.configureServer) {
            await plugin.configureServer(serverContext);
        }
    }

    app.use(transformMiddleware(serverContext));

    app.use(indexHtmlMiddware(serverContext));

    app.use(staticMiddleware());

    app.listen(3000, async () => {
        await optimize(root);
        console.log(
            green("🚀 No-Bundle 服务已经成功启动!"),
            `耗时: ${Date.now() - startTime}ms`
        );
        console.log(`> 本地访问路径: ${blue("http://localhost:3000")}`);
    });
}

