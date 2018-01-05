const webpack = require('webpack');
const path = require('path');

const srcPath = path.join(__dirname, '/src');
const distPath = path.join(__dirname, '/dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    watch: true,
    cache: true,
    devtool: '#cheap-module-eval-source-map',
    context: srcPath,
    entry: {
        app: './js/index.js',
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js',
    },
    resolve: {
        modules: ["node_modules"],
    },
    module: {
        // devtool: 'source-map',
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
            /*
             * File loader for supporting images, for example, in CSS files.
             */
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            },

            /* File loader for supporting fonts, for example, in CSS files.
             */
            {
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        // new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin([distPath]),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        /**
         * Plugin: CompressionPlugin
         * Description: Prepares compressed versions of assets to serve
         * them with Content-Encoding
         *
         * See: https://github.com/webpack/compression-webpack-plugin
         */
        //  install compression-webpack-plugin
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new CopyWebpackPlugin([{
            from: './manifest.json'
        }, {
            from: './manifest.webapp'
        }, {
            from: './robots.txt'
        }, {
            from: './favicon.ico'
        }, {
            from: './img/**/*',
            to: './'
        }]),
    ],
    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
        port: 3000,
        host: 'localhost',
        public: 'localhost:3000',
        historyApiFallback: true,
        watchOptions: {
            // if you're using Docker you may need this
            // aggregateTimeout: 300,
            // poll: 1000,
            ignored: /node_modules/
        }
    },
    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};


// module.exports = {
// 	context: path.resolve('./app'),
// 	entry: './js/index.js',
// 	output: {
// 		path: path.resolve('./dist/'),
// 		filename: 'js/bundle.js',
// 		publicPath: '/'
// 	},
// 	module: {
// 		devtool: 'source-map',
// 		loaders: [{
// 			test: /\.js$/,
// 			loader: 'babel',
// 			exclude: /node_modules/,
// 			query: {
// 				presets: ['es2015']
// 			}
// 		},{
// 			test: /\.html$/,
// 			loader: 'html'
// 		},{
// 			test: /\.scss$/,
// 			loaders: ["style", "css", "sass"]
// 		},{
// 			test: /\.css$/,
// 			loaders: ["style", "css"]
// 		},{
// 			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
// 			loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
// 		},{
// 			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
// 			loader: "file?name=fonts/[name].[ext]"
// 		},{
// 			test: /\.(jpe?g|png|gif)$/,
//   		loader:'file?name=img/[name].[ext]'
// 		}]
// 	},
// 	plugins: [
// 		new CleanWebpackPlugin(['dist']),
// 		new HtmlWebpackPlugin({
// 			template: './index.html'
// 		}),
// 		new webpack.ProvidePlugin({
// 			$: 'jquery',
// 			jQuery: 'jquery',
// 		}),
// 		new BrowserSyncPlugin({
// 			server: {
// 				baseDir: ['dist']
// 			},
// 			port: 3000,
// 			host: 'localhost',
// 			open: false
// 		}),
// 		new CopyWebpackPlugin([{
// 			from: './manifest.json'
// 		},{
// 			from: './manifest.webapp'
// 		},{
// 			from: './robots.txt'
// 		},{
// 			from: './favicon.ico'
// 		},{
// 			from: './img/**/*',
// 			to: './'
// 		}])
// 	]
// }