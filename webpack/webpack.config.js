const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                // use:['style-loader','css-loader']
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader:"css-loader",
                        options: { importLoaders: 1 }
                    },"postcss-loader"]
                })
            },
            {
                test:/\.scss$/,
                // use:['style-loader','css-loader','sass-loader']
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"]
                })
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500,
                        outputPath: 'images/'
                    }
                }]
            },{
                test:/\.(htm|html)/i,
                use:['html-withimg-loader']
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            filename: 'xx.html',
            minify: {
                removeAttributeQuotes: true
            },
            template: './src/index.html',
            hash: true
        }),
        new ExtractTextPlugin('index.css')
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        compress: true,
        port: 8081,
        open: true
    }
}