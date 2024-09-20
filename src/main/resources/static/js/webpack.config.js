const path = require('path');

module.exports = {
    entry: './postView/index.js', // index.js의 상대 경로
    output: {
        filename: 'postView.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    mode: 'development',
};
