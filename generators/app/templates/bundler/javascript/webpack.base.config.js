const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname),
    entry: [
        path.join(__dirname, "<%= entryPoint %>")
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /(\.js)|(\.jsx)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.EnvironmentPlugin([
        'NODE_ENV',
        ]),
    ]
};
