const webpack = require('webpack');
const path = require('path');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
    // watch: true,
    cache: true,
    // devtool: '#cheap-module-eval-source-map',
    context: srcPath,
    entry: {
        app: './js/index.js',
    },
    /**
         * Options affecting the output of the compilation.
         *
         * See: http://webpack.github.io/docs/configuration.html#output
         */
        output: {
					
											/**
											 * The output directory as absolute path (required).
											 *
											 * See: http://webpack.github.io/docs/configuration.html#output-path
											 */
											path: distPath,
					
											/**
											 * Specifies the name of each output file on disk.
											 * IMPORTANT: You must not specify an absolute path here!
											 *
											 * See: http://webpack.github.io/docs/configuration.html#output-filename
											 */
											filename: '[name].[chunkhash].bundle.js',
				
											/**
											 * The filename of non-entry chunks as relative path
											 * inside the output.path directory.
											 *
											 * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
											 */
											chunkFilename: '[name].[chunkhash].chunk.js'
					
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
            // {
            //     test: /\.(jpe?g|png|gif)$/,
            //     use: 'file-loader'
            // },

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
						template: './index.html',
						minify: {
							caseSensitive: true,
							collapseWhitespace: true,
							keepClosingSlash: true
						}
				}),
				new UglifyJSPlugin({
					sourceMap: false
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
        }]),
				new ManifestPlugin()
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
