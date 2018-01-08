const path = require('path');
const webpack = require("webpack");

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    resolve: {
        modules: ["node_modules"],
        alias: {
            jquery: 'js/jquery-3.2.1.min.js',
        }
    },
    entry: {
        vendors: ['jquery'],
        app: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [{
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
            }
        ]
    },
    plugins: [
        // new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(['./dist/*']),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            'window.jQuery': "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'js/vendors.js', minChunks: Infinity }),
        new HtmlWebpackPlugin({
            title: 'MoneyEx - Embrace the Future - São Paulo',
            template: './src/index.html'
        }),
        new WebpackPwaManifest({
            name: 'MoneyEx',
            short_name: 'MoneyEx',
            description: 'Driving People, Technology, Finance and Design to Build an Exponencial Future.',
            background_color: '#134a6e',
            icons: [{
                src: path.resolve('src/img/logo-1024x1024.png'),
                sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
            }]
        })
    ]
};