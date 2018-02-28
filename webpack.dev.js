const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    watch: true,
    cache: true,
    devtool: 'inline-source-map',
    devServer: {
        contentBase: 'dist',
        port: 9000
    }
});
