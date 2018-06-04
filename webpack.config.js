const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动创建html文件
const CleanWebpackPlugin = require('clean-webpack-plugin');//清除多余文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
    devtool: 'inline-source-map',//用于开发调试，方便清楚是那个文件出错
    entry: {
        index: './dev/index.js'
        // another: './src/another-module.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        },{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            loader: 'url-loader?name=font/[name].[ext]'
        }]
    },
    devServer: {
        contentBase: './dist',
        port: 8081,
        hot: true
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'dev/index.html'
        }),
        extractSass,
        new ExtractTextPlugin("style.css")
    ]
};