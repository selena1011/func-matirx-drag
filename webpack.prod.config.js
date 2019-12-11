const Path = require( 'path' )
const Webpack = require( 'webpack' )
const WebpackMrge = require( 'webpack-merge' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const UglifyjsWebpackPlugin = require( 'uglifyjs-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const OptimizeCssAssetsWebpackPlugin = require( 'optimize-css-assets-webpack-plugin' )  

const WebpackBaseConfig = require( './webpack.base.config' )
const _now = WebpackBaseConfig._now

delete WebpackBaseConfig._now


module.exports = WebpackMrge(WebpackBaseConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: false,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsWebpackPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                },  // 公共的模块
                vandor: {
                    priority: 100,  // 权重
                    test: /node_modules/,  // 需要匹配的引入目录
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2
                }  // 引自node_modules中的第三方包文件
            }  // 缓存组
        }  // 分割代码块
    },
    output: {
        publicPath: `./${_now}/`,
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    devtool: 'source-map',  // 源码映射
    watch: true,  // 实时编译
    watchOptions: {
        // poll: 1000, // 每秒扫描1000此
        // aggreateTimeout: 500 // 防抖设置
        ignored: /node_modules/
    },
    plugins: [
        new UglifyjsWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: Path.resolve(__dirname, './template/index.ejs'),
            minify: {
                removeComments: true,
                hash: true
            },
            hash: true,
            //chunks: []
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
        new Webpack.DefinePlugin({
            DEV: JSON.stringify( 'dev' )
        })  // 定义环境变量
    ]
})