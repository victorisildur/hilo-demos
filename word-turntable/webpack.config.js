var webpack = require('webpack');
var externals = {
    'hilo': 'window.Hilo'
}

module.exports = {
    entry: {
        index: './index'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build'
    },
    externals: externals,
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'babel-loader!ts-loader',
                exclude: ['node_modules']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
};
