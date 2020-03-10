const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                ],
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                use: {
                    loader: 'babel-loader',
                },
                test: /\.js|jsx?$/,
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.json', 'ts', 'tsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
