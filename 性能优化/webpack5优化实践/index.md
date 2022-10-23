## vuecli 项目 使用webpack5优化实践

## 跑通

##### 1. 首先是对 env的配置 `vue-cli` 通过.env 文件配置环境变量。

`.env`文件如下

```js
VUE_APP_API_BASE_URL=http://dev.iczer.com
```

而`webpack5` 可以通过 `webpack.DefinePlugin`定义 注意 value必须用 `JSON.stringify`包裹

```js
module.exports = {
  //...
  plugins:[
    //...
    new webpack.DefinePlugin({
        'process.env': {
            'VUE_APP_API_BASE_URL': JSON.stringify('http://dev.iczer.com')
        }
    }),
  ]
}
```

##### 2. `rules`的配置

`vue-cli` 内置了`rules`

`webpack5`配置如下

**注意** 因为项目中用到了 `ant-design-vue`因此`less-loader`需要使用6.0.0版本

 `vue-loader`需要支持`webpack5`的版本

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5');
module.exports = {
   //...
   module: {
      rules: [
          {
              test: /\.vue$/i,
              use: ['vue-loader'],
          },
          {
              test: /\.js$/i,
              use: ["babel-loader"],
          },
          {
              test: /\.less$/i,
              use: ['style-loader', 'css-loader', 'less-loader'],
          },
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
          },
          {
              test: /\.(png|jpg|gif|jpeg|svg)$/i,
              type: 'asset',
              parser: {
                  dataUrlCondition: {
                      maxSize: 10 * 1024,
                  },
              },
              generator: {
                  filename: 'images/[base]',
              },
          },
      ],
  },
  plugins:[
    //...
    // 这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    // 参考：https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE
    // 用来复制规则
    new VueLoaderPlugin(),
  ]
}
```

##### 3. alias与可省略扩展名

`vue-cli`支持 `js vue`扩展名胜率，以及自定义的`@等`别名

```js
import xxx from './xxx'
import '@/xxx/xxx'
```

`webpack5`配置

```js
module.exports = {
	// ...
  resolve: {
      alias: {
          '@': resolve('src/'),
      },
      extensions: ['.js', '.vue'],
  },
}
```

##### 4.`html`入口

`vue-cli`默认入口 `public/index.html` 获通过`pages:{//...}`来配置入口

`webpack5`配置 通过 `html-webpack-plugin`插件 注意需要使用5.+版本

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path')
function resolve(file) {
    return path.resolve(__dirname, file);
}
module.exports = {
	// ...
	plugins:[
    //...
    new HtmlWebpackPlugin({
      	// 更多配置：https://github.com/jantimon/html-webpack-plugin
        template: resolve('public/index.html'),
        filename: 'index.html',
    }),
  ]
}
```

5.配置文件入口 打包出口

```js
module.exports = (env) => {
  const isProd = env.production
  return {
      mode: isProd ? 'production' : 'development',
      profile: true,
      entry: resolve("src/main"),
      output: {
          filename: "[name].js",
          path: resolve('dist')
      },
  }
}
```



##### 6.其他配置 主题色等

原项目要到了 主题色及切换功能

使用了 `style-resources-loader`来全局引入`less`文件,以及配置`less`变量,`webpack-theme-color-replacer`进行主题切换

```js
module.exports = {
  //...
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")],
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
    configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "whatwg-fetch", "./src/main.js"];
    config.performance = {
      hints: false
    }
    if (isProd) {
      config.plugins.push(new StatoscopeWebpackPlugin())
    }
    config.plugins.push(
       new ThemeColorReplacer({
         fileName: 'css/theme-colors-[contenthash:8].css',
         matchColors: getThemeColors(),
         injectCss: true,
         resolveCss
       })
     )
  },
}
```

`webpack5` `less-loader` 6.0 支持的是 `appendData`，而最新的需要使用`additionalData`

参考：https://webpack.docschina.org/loaders/less-loader/

```js
module.exports = (env)=> {
  return {
    // ...
    module:{
      rules:[
        // ...
        {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', {
            loader: 'less-loader',
            options: {
                lessOptions: {
                    modifyVars: modifyVars(),
                    javascriptEnabled: true,
                },
                appendData: `@import '@/theme/theme.less';`
            },
        	},],
        },
      ]
    },
    plugins:[
      new ThemeColorReplacer({
                fileName: 'css/theme-colors-[contenthash:8].css',
                matchColors: getThemeColors(),
                injectCss: true,
                resolveCss
       }),
    ]
  }
}
```

##### 7.引入可视化工具 打包可视化方案选择 `@statoscope/webpack-plugin`

```js
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default
module.exports = (env) => {
    return {
      	// ...
        plugins: [
           // ...
            new StatoscopeWebpackPlugin()
        ]
    };
}

```

##### 8.整体配置

```js
const path = require('path')
function resolve(file) {
    return path.resolve(__dirname, file);
}
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { getThemeColors, modifyVars } = require('./src/utils/themeUtil')
const { resolveCss } = require('./src/utils/theme-color-replacer-extend')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const webpack = require('webpack')

module.exports = (env) => {
    const isProd = env.production
    return {
        mode: isProd ? 'production' : 'development',
        profile: true,
        entry: resolve("src/main"),
        output: {
            filename: "[name].js",
            path: resolve('dist')
        },
        resolve: {
            alias: {
                '@': resolve('src/'),
            },
            extensions: ['.js', '.vue'],
        },
        module: {
            rules: [
                {
                    test: /\.vue$/i,
                    exclude: /node_modules/,
                    use: ['vue-loader'],
                },
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.less$/i,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader', {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: modifyVars(),
                                javascriptEnabled: true,
                            },
                            appendData: `@import '@/theme/theme.less';`
                        },
                    },],
                },
                {
                    test: /\.css$/i,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpg|gif|jpeg|svg)$/i,
                    exclude: /node_modules/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024,
                        },
                    },
                    generator: {
                        filename: 'images/[base]',
                    },
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'VUE_APP_API_BASE_URL': JSON.stringify('http://dev.iczer.com')
                }
            }),
            new HtmlWebpackPlugin({
                template: resolve('public/index.html'),
                filename: 'index.html',
            }),
            new ThemeColorReplacer({
                fileName: 'css/theme-colors-[contenthash:8].css',
                matchColors: getThemeColors(),
                injectCss: true,
                resolveCss
            }),
            new VueLoaderPlugin(),
            new StatoscopeWebpackPlugin()
        ]
    };
}


```



##### `webpack`最终结果

![webpack5初始配置](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/webpack5初始配置.png)

##### `vue-cli`结果

![未优化项目](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/未优化项目.png)

## 优化

##### 1.`webpack5`会默认打包出`xxx.LICENSE.text`文件，`terser-webpack-plugin`

```
module.exports = {
	// ...
  optimization: {
      minimize: isProd ? true : false,
      minimizer: [
          new TerserPlugin({
              extractComments: false,
          }),
      ],
  },
}
```

##### 2.配置`externals` html注入CDN

```js
// webpack.config.js
const assetsCDN = {
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        nprogress: 'NProgress',
        clipboard: 'ClipboardJS',
        '@antv/data-set': 'DataSet',
        'js-cookie': 'Cookies'
    },
    css: [
        'https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css'
    ],
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
        '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
        '//cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js',
        '//cdn.jsdelivr.net/npm/@antv/data-set@0.11.4/build/data-set.min.js',
        '//cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js'
    ]
}

module.exports = (env) => {
    return {
      	// ...
        plugins: [
						// ...
            new HtmlWebpackPlugin({
                template: resolve('public/index.html'),
                filename: 'index.html',
                CDN: assetsCDN,
              	title:'title!!!'
            }),
        ],
        externals: assetsCDN.externals
    };
}

```

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%= htmlWebpackPlugin.options.title %></title>
  <% for(var css of htmlWebpackPlugin.options.CDN.css) { %>
    <link href="<%=css%>" rel="preload" as="style" />
    <% } %>
</head>

<body>
  <% for(var js of htmlWebpackPlugin.options.CDN) { %>
    <script src="<%=js%>"></script>
    <% } %>
  <div id="popContainer" class="beauty-scroll" style="height: 100vh; overflow-y: scroll">
    <div id="app"></div>
  </div>

</body>

</html>
```

![externals](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/externals.png)

###### 

##### 3.`ant-design-vue`的特殊处理

**注意：**`moment`需要在`ant-design-vue`前引用，否则会报错。

通过`IgnorePlugin` 避免打包 `moment`

```js
const assetsCDN = {
    externals: {
				// ...
        'ant-design-vue': 'antd',
        moment: "moment"
    },
    js: [
        '//cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js', 
        '//cdn.jsdelivr.net/npm/moment@2.29.1/locale/zh-cn.js',
        '//cdn.jsdelivr.net/npm/ant-design-vue@1.7.2/dist/antd.min.js',
    ]
}
module.exports = (env) => {
    return {
				// ...
        plugins: [
            // ...
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment/,
            }),

        ],
        externals: assetsCDN.externals
    };
}
```

**打包结果**

![CDN引入](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/CDN引入.png)

##### 4.将样式代码抽离成单独的 CSS 文件 `mini-css-extract-plugin` 替代 `style-loader`

```js
module.exports = (env) => {
    const isProd = env.production
    return {
        module: {
            rules: [
								// ...
                {
                    test: /\.less$/i,
                    exclude: /node_modules/,
                    use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: modifyVars(),
                                javascriptEnabled: true,
                            },
                            appendData: `@import '@/theme/theme.less';`
                        },
                    },],
                },
                {
                    test: /\.css$/i,
                    use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
                },
                
            ],
        },
        plugins: [
           // ...
            new MiniCssExtractPlugin(),
        ],
    };
}


```

**抽离前：**

![抽离css文件前](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/抽离css文件前.png)

![抽离css前-打包](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/抽离css前-打包.png)

**抽离后：**

![抽离css后](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/抽离css后.png)

![抽离css后-打包](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/抽离css后-打包.png)

##### 5.将样式代码进行压缩 `css-minimizer-webpack-plugin`

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = (env) => {
    return {
      	//...
        optimization: {
            minimizer: [
                '...',
                new CssMinimizerPlugin(),
            ],
        },
    };
}
```

**压缩前:**

![css压缩前](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/css压缩前.png)

**压缩后:**

![css压缩后](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/css压缩后.png)

##### 6.压缩`html` `html-minimizer-webpack-plugin`

```js
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
module.exports = (env) => {
    return {
      	//...
        optimization: {
            minimizer: [
                '...',
                new HtmlMinimizerPlugin({
                    minimizerOptions: {
                        collapseBooleanAttributes: true,
                        useShortDoctype: true,
                      	// ...
                    },
                }),
            ],
        },
    };
}
```

##### 7.图片压缩

```js
module.exports = (env) => {
    return {
        // ...
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif|jpeg|svg)$/i,
                    exclude: /node_modules/,
                    type: "asset/resource",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024,
                        },
                    },
                    generator: {
                        filename: 'images/[base]',
                    },
                    use: [{
                        loader: 'image-webpack-loader',
                      	// jpg/png/webp
                      	// https://www.npmjs.com/package/image-webpack-loader 
                        options: { 
                            optipng: {
                                quality: 80
                            },
                        }
                    }]
                },
            ],
        },
    }
```

**图片压缩前:**

![图片压缩前](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/图片压缩前.png)

**图片压缩后：**

![图片压缩后](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/图片压缩后.png)

##### 8.开启 `tree-shaking` 以及 `splitchunk`

```js
module.exports = (env) => {
    return {
        optimization: {
						// ...
            usedExports: true, // 开启 Tree Shaking 
             splitChunks: {
                chunks: 'all',
                maxSize: 500000,
                minSize: 20000,
                minChunks: 1,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    }
                }
            }
        },
    }
 }
```

##### 9.开启并行任务 `TerserPlugin`  `HappyPack`

```js
// 当前主机线程-2
const parallel = require('os').cpus().length - 2
module.exports = (env) => {
    const isProd = env.production
    return {
        optimization: {
            minimize: isProd ? true : false, // 默认production 会开始压缩
            minimizer: [
                '...',
                new TerserPlugin({
                    parallel: parallel,
                    extractComments: false,
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    use: 'happypack/loader?id=js',
                },
            ],
        },
        plugins: [
            new HappyPack({
                id: 'js',
                loaders: ['babel-loader']
            }),
        ],
    };
}

```

![最终打包结果](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/最终打包结果.png)

![最终结果](/Users/ninja/workspace/blog/性能优化/webpack5优化实践/最终结果.png)
