const Path = require( 'path' );
const UglifyPlugin = require( 'uglifyjs-webpack-plugin' );
const HtmlPlugin = require( 'html-webpack-plugin' );

const WebpackBaseCfg = {
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
                test: /\.(html|htm)$/,
                use: [
                    {
                        loader: 'html-withimg-loader'
                    }
                ]
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
            filename: 'index.html'
        })
    ],
    devServer: {
        host: '127.0.0.1',
        port: '10091',
        compress: true,
        hot: true,
        open: true,
        watchContentBase: true
    }
};

module.exports = WebpackBaseCfg
