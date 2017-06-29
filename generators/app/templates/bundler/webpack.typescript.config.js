const path = require('path');

module.exports = {
    context: path.join(__dirname),
    entry: [
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /(\.ts)|(\.tsx)$/,
                loader: 'ts-loader'
            },
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
        extensions: ['.js', '.ts', '.tsx']
    }
};
