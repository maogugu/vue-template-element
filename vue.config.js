const moment = require('moment')
const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const CompressionPlugin = require('compression-webpack-plugin')
const PUBLIC_PATH = '/'

process.env.VUE_APP_Version = require('./package.json').version

const buildInfo = {
  buildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
  appVersion: require('./package.json').version,
  env: process.env.NODE_ENV
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'lodash-es': '_',
  lodash: '_',
  moment: 'moment',
  'dingtalk-jsapi': 'dd',
  'element-ui': 'ELEMENT'
}

const cdn = { // 将会注入index.html js 顺序不可乱 注意版本
  css: [
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/theme-chalk/index.css'
  ],
  js: [
    'https://g.alicdn.com/dingding/dingtalk-jsapi/2.8.33/dingtalk.open.js',
    'https://xfw-bscnym-test.oss-cn-hangzhou.aliyuncs.com/static/js/vue.min.js',
    'https://xfw-bscnym-test.oss-cn-hangzhou.aliyuncs.com/static/js/vue-router.min.js',
    'https://xfw-bscnym-test.oss-cn-hangzhou.aliyuncs.com/static/js/vuex.min.js',
    'https://xfw-bscnym-test.oss-cn-hangzhou.aliyuncs.com/static/js/axios.min.js',
    'https://xfw-bscnym-test.oss-cn-hangzhou.aliyuncs.com/static/js/moment.min.js',
    'https://xfw-bscnym-test.oss-cn-hangzhou.aliyuncs.com/static/js/moment-zh-cn.js',
    'https://xfw-bscnym-test.oss-cn-hangzhou.aliyuncs.com/static/js/lodash.min.js',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/index.js'
  ]
}

module.exports = {
  runtimeCompiler: true,
  devServer: {
    // host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    disableHostCheck: true // 解决127.0.0.1指向其他域名时出现"Invalid Host header"问题
    // proxy: {
    //   '/bscnym': {
    //     target: 'http://172.17.9.148:8000',
    //     changOrigin: true,
    //     pathRewrite: { '^/': '/' }
    //   }
    // }
  },
  publicPath: PUBLIC_PATH,
  outputDir: 'dist', // 项目名
  lintOnSave: true, // 编译警告
  // auto fix eslint
  chainWebpack: config => {
    config.plugin('html') // 注入环境变量
      .tap(args => {
        args[0].cdn = cdn
        args[0].buildInfo = buildInfo
        return args
      })
    config.resolve.alias
      .set('@', resolve('src'))
    config
      .module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      // 6kb 过于小会导致请求次数变多 影响优化
      // 同时添加css 路径到cdn
      .tap(options => Object.assign(options, {
        limit: 6144
      }))
    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config.merge({
            externals: externals
          })
          config.devtool('none')
          config.optimization.minimizer('terser').tap((args) => {
            args[0].terserOptions.compress.drop_console = true // 移除 console.log
            return args
          })
          config
            .plugin('Purgecss')
            .use(PurgecssPlugin, [{
              paths: glob.sync([
                path.join(__dirname, './public/index.html'),
                path.join(__dirname, './**/*.vue'),
                path.join(__dirname, './src/**/*.js')
              ], {
                nodir: true
              }),
              whitelist: ['html', 'body'],
              whitelistPatterns: [/data-v-.*/, /v-(modal|bind)$/, /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!cursor-move).+-move$/, /^router-link(|-exact)-active$/],
              whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
            }])
            .end()
          config
            // 以下是打包依赖分析 push 请关闭 请只在本地使用
            // .plugin('webpack-bundle-analyzer')
            // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
            // .end()
            .plugin('CompressionPlugin')
            .use(CompressionPlugin)
            .end()
        }
      )
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('eval-source-map')
      )
  }
}
