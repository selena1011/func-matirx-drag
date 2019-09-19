const Glob =  require( 'glob' );
const Path = require( 'path' );
const UglifyPlugin = require( 'uglifyjs-webpack-plugin' );
const HtmlPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const PurifyCSSWebpackPlugin = require( 'purifycss-webpack' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );


const WebpackBaseConfig = {
    mode: 'development',
    devtool: '#source-map',
    entry: {
        main: './src/main.js'
    },
    output: {
        path: Path.resolve(__dirname, './dist/'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: 'file-loader',
                            name: '[name].[hash].[ext]',  // 指定图片文件输出文件名                                
                            outputPath: './images',  // 指定图片文件输出路径   
                            publicPath: '../images/',  // 指定CSS文件中的url路径前缀                                                  
                        }
                    }
                ]
            }, {
                test: /\.(html|htm)$/,
                use: [
                    {
                        loader: 'html-withimg-loader'
                    }
                ]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'less-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new UglifyPlugin(),
        new HtmlPlugin({
            minify: {
                removeComments: true,
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
            template: Path.resolve(__dirname, './template/index.html'),
            filename: '../index.html'
        }),
        new ExtractTextPlugin( './main.css' ),  // 当前输出目录的为基准
        // new PurifyCSSWebpackPlugin({
        //     // 配置一个paths
        //     // 主要是需找html模板
        //     // purifycss根据这个配置会遍历你的文件, 查找哪些css被使用了。
        //     paths: Glob.sync( Path.resolve(__dirname, '../src/*.html') )
        // })
    ],
    devServer: {
        host: '127.0.0.1',
        port: '10010',
        compress: true,
        hot: true,
        open: true,
        watchContentBase: true
    }
};

module.exports = WebpackBaseConfig
