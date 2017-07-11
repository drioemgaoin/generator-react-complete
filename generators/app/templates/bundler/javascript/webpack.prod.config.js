const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.[chunkhash].js'
    },

    plugins: [
        // Extract imported CSS into own file
        new ExtractTextPlugin('bundle.[chunkhash].css'),
        // Minify JS
        new UglifyJsPlugin({
            sourceMap: false,
            compress: true,
        }),
        // Minify CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        })
    ]
});