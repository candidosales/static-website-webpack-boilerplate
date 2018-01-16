const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.*(sass|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    { loader: 'css-loader', options: { minimize: true } },
                    { loader: 'sass-loader' }
                ]
            })
        }, ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Money Ex - Embrace the Future - São Paulo',
            template: './src/index.html',
            // minify: {
            // 	caseSensitive: true,
            // 	collapseWhitespace: true,
            // 	keepClosingSlash: true
            // }
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            disable: false,
            allChunks: true,
        }),
        new UglifyJSPlugin({
            sourceMap: false,
            uglifyOptions: {
                ie8: true,
                ecma: 5,
                output: {
                    comments: false,
                    beautify: false
                }
            }
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(css|js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new CopyWebpackPlugin([{
            from: './src/google2d8732aaf3fcf28d.html'
        }, {
            from: './src/robots.txt'
        }, {
            from: './src/img/favicon.ico',
            to: './img'
        }, {
            from: './src/img/metadata.png',
            to: './img'
        }, {
            from: './src/img/icon_192x192.png',
            to: './img'
        }])
    ]
});