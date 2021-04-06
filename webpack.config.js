const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.target = ['web', 'es5']
        //es5 트랜스파일을 설정하면 웹팩 핫리로드가 적용이안됨... 그래서 배포할떄만 es5로 트랜스파일링
        config.output.publicPath = "./"
        //ie에서는 publicpath를 생략하면 에러가난다. 
        //배포 빌드 할 때 Webpack plugins(ulr-loader,file-loader 같은..), CSS나 HTML파일 안에 URL들을 업데이트 해주기 위한 것인데
        //생략해도 ie가 아닌 환경에서는 알아서 잘적용됨
        config.module.rules[1].use = [MiniCssExtractPlugin.loader, 'css-loader']
        //배포할땐 css파일 따로 만듦
    }
    return config
}
var config = {
    entry: {
        app: [
            'babel-polyfill', './main.js',
        ]
    },
    output: {
        path: __dirname + '/dist', //build후 디렉토리
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },
    target: 'web', //es5로 트랜스파일링
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
            {
                test: /\.(html)$/,  //html파일도 웹팩이 감시하는 최상단 js파일ㅇ에 require해주면 핫리로드가능
                loader: "raw-loader" // loaders: ['raw-loader'] 이렇게 써도 가능
            }
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
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html', //해당 html에 빌드된 스크립트 적용
            //   favicon: 'public/favicon.ico'
        }),
        new MiniCssExtractPlugin({ filename: 'bundle.[hash].css' })
    ],
    devServer: {
        contentBase: './', //base 디렉토리
        host: 'localhost',
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
    }
}