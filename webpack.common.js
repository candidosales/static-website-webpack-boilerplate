const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        app: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },
    resolve: {
        modules: ["node_modules"],
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
                    'file-loader?file?name=img/[name].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // Specifying webp here will create a WEBP version of your JPG/PNG images
                            webp: {
                                quality: 75
                            }
                        },
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
        new HtmlWebpackPlugin({
            title: 'MoneyEx - Embrace the Future - São Paulo',
            template: './src/index.html'
        }),
        new WebpackPwaManifest({
            name: 'MoneyEx - Embrace the Future',
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