const Path = require( 'path' )
const Webpack = require( 'webpack' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const OptimizeCssAssetsWebpackPlugin = require( 'optimize-css-assets-webpack-plugin' )  

const _now = now()

function now(){
    const d = new Date()
    const arr = [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ]
    return arr.map(( item )=>{
        return item > 9 ? String( item ) : '0' + String( item )
    }).join( '' )
}

module.exports = {
    _now: _now,    
    entry: {
        main: './src/main.js'
    },
    output: {
        path: Path.join(__dirname, `/dist/${_now}`)
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
                include: /src/,  // 仅包含
                exclude: /node_modules/  // 排除目录
            },
            {
                test: /\.less/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }, 
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: 'file-loader',
                            name: '[name].[hash].[ext]',  // 指定图片文件输出文件名                                
                            // outputPath: './images/',  // 指定图片文件输出路径
                            publicPath: './',  // 指定CSS文件中的url路径前缀(一般写CDN路径)                                             
                        }
                    }
                ]
            }, 
            {
                test: /\.(html|htm)$/,
                use: [
                    {
                        loader: 'html-withimg-loader'
                    }
                ]
            }
        ]  // 模块解析规则
    },
    resolve: {
        modules: [
            Path.resolve( 'node_modules' )
        ],
        extensions: [
            '.js', 
            '.css', 
            '.json'
        ]
    },  // 解析第三方模块包依赖
    externals: {
        //...
    }
}