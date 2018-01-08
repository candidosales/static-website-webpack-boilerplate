const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    module: {
        rules: [
            // {
            // 	test: /\.css$/,
            // 	use: ExtractTextPlugin.extract({
            // 		fallback: 'style-loader',
            // 		use: [
            // 			{ loader: 'css-loader', options: { minimize: true } }
            // 		]
            // 	})
            // },
            {
                test: /\.*(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                        { loader: 'sass-loader' }
                    ]
                })
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'MoneyEx - Embrace the Future - São Paulo',
            template: './src/index.html',
            // minify: {
            // 	caseSensitive: true,
            // 	collapseWhitespace: true,
            // 	keepClosingSlash: true
            // }
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new UglifyJSPlugin({
            sourceMap: false,
            uglifyOptions: {
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
            from: './src/robots.txt'
        }, {
            from: './src/favicon.ico'
        }, {
            from: './src/img/metadata.png'
        }])
    ],
    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
});