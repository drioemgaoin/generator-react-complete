const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
    devtool: 'eval-source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
});