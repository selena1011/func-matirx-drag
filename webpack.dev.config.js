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
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    devtool: 'source-map',  // 源码映射
    watch: true,  // 实时编译
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        // new UglifyjsWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: Path.resolve(__dirname, './template/index.ejs'),
            minify: {
                removeComments: true,
                hash: true
                // collapseWhitespace: true,
                // removeRedundantAttributes: true,
                // useShortDoctype: true,
                // removeEmptyAttributes: true,
                // removeStyleLinkTypeAttributes: true,
                // keepClosingSlash: true,
                // minifyJS: true,
                // minifyCSS: true,
                // minifyURLs: true
            },
            hash: true,
            // chunks: [...]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
        // new CleanWebpackPlugin(),
        new Webpack.DefinePlugin({
            DEV: JSON.stringify( 'dev' )
        })  // 定义环境变量        
    ],
    devServer: {
        host: '127.0.0.1',
        port: '10095',
        contentBase: './',
        hot: true,
        open: false,
        progress: true,
        watchContentBase: true,
        proxy: {
            '/form': {
                target: 'http://localhost:10095',
                pathRewrite: {
                    '^/form': ''
                }
            }
        }
    }
})