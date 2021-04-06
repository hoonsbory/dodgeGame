const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {

    entry: {
        app: [
            'babel-polyfill', './main.js',
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.[hash].js',

    },
    target: ['web', 'es5'], //es5로 트랜스파일링
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/, //css파일을 최상단 js에서 require해주면 style태그로 바꿔서 head에 들어감
                use: ['style-loader', 'css-loader']
            },
            // {
            //     test: /\.(ico|png)$/,
            //     loader: 'url-loader',
            //     options: {
            //       name: '[hash].[ext]',
            //       limit: 100000000,
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', //html파일 전송
            //   favicon: 'public/favicon.ico'
        })
    ],
    devServer: {
        host: 'localhost',
        port: port,
        open: true,
        historyApiFallback: true
    }
};