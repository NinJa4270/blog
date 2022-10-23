## Webpack

### 减少 `loader` 要做的事情
1. 设置 `include/exclude`
2. 启缓存将转译结果缓存至文件系统 `loader: 'babel-loader?cacheDirectory=true'`

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader?cacheDirectory=true',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

### `DllPlugin` 替代 `externals` `CommonsChunkPlugin`
这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包
```js
//  webpack.dll.js 
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
      // 依赖的库数组
      vendor: [
        'vue',
        'vue-router'
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      library: '[name]_[hash]',
    },
    plugins: [
      new webpack.DllPlugin({
        // DllPlugin的name属性需要和libary保持一致
        name: '[name]_[hash]',
        path: path.join(__dirname, 'dist', '[name]-manifest.json'),
        // context需要和webpack.config.js保持一致
        context: __dirname,
      }),
    ],
}
```

```json
{
  "scripts": {
    "build:dll": "webpack --config webpack.dll.js",
  },
}
```

```js
// webpack.config.js
const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // 插件把 dll 加入到 index.html
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest就是我们第一步中打包出来的json文件
      manifest: require('./dist/vendor-manifest.json'),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/_dll_vue.js'),
    }),
  ]
}
```

### Happypack loader单进程转多进程
```js
const HappyPack = require('happypack')
// 手动创建进程池
const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.js$/,
        // 问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
        loader: 'happypack/loader?id=happyBabel',
        ...
      },
    ],
  },
  plugins: [
    ...
    new HappyPack({
      // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
      id: 'happyBabel',
      // 指定进程池
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    })
  ],
}
```

### 构建结果体积压缩

1. 文件结构可视化 `webpack-bundle-analyzer`
   ```js
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    
    module.exports = {
      plugins: [
          new BundleAnalyzerPlugin()
      ]
    }
   ```
2. 拆分资源 `DllPlugin`
3. 冗余代码 
   webpack3 `uglifyjs-webpack-plugin` 删除注释/console **webpack4 通过optimization.minimize 与 optimization.minimizer**
    ```js
        const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
        module.exports = {
            plugins: [
                new UglifyJsPlugin({
                        // 允许并发
                        parallel: true,
                        // 开启缓存
                        cache: true,
                        compress: {
                        // 删除所有的console语句    
                        drop_console: true,
                        // 把使用多次的静态值自动定义为变量
                        reduce_vars: true,
                    },
                        output: {
                        // 不保留注释
                        comment: false,
                        // 使输出的代码尽可能紧凑
                        beautify: false
                    }
                })
            ]
        }
    ```
4. 按需加载
5. Gzip压缩