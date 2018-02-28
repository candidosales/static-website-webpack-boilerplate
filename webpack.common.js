const path = require('path');
const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

const precss = require('precss');
const autoprefixer = require('autoprefixer');

var basePath = __dirname;


module.exports = {
    entry: {
        app: './src/js/index.js',
        vendor: ['jquery']
    },
    output: {
        path: path.resolve(basePath, 'dist/'),
        filename: '[chunkhash].[name].js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }, {
                test: /\.html$/,
                use: 'html-loader'
            }, {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function() { // post css plugins, can be exported to postcss.config.js
                            return [
                                precss,
                                autoprefixer
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader?name=./img/[name].[ext]?[hash]',
                    {
                        loader: 'image-webpack-loader'
                    },
                ],
            },

            /* File loader for supporting fonts, for example, in CSS files.
             */
            {
                test: /\.(eot|woff2?|ttf)([\?]?.*)$/,
                use: 'file-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Money Ex - Embrace the Future - São Paulo',
            template: './src/index.html',
            filename: './src/index.html',
            hash: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery",
            'window.jQuery': "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new WebpackPwaManifest({
            name: 'Money Ex',
            short_name: 'Money Ex',
            description: 'Driving People, Technology, Finance and Design to Build an Exponencial Future.',
            background_color: '#134a6e',
            icons: [{
                src: path.resolve('src/img/logo-1024x1024.png'),
                sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
            }]
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
};
