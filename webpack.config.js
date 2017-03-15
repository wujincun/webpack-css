
var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    autoprefixer = require('autoprefixer'),
    px2rem = require('postcss-px2rem'),
    htmlWebpackPlugin=require("html-webpack-plugin"),
    html = require('html-withimg-loader');

var config = {
    entry: [
        path.join(__dirname, 'src/js', 'main'),
        path.join(__dirname, 'src/css', 'main.less')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader:  "style-loader!css-loader?importLoaders=1!postcss-loader"
            },
            /*生成独立css文件
            {
                test: /\.less$/,
                loader:  ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader!less-loader")
            },
            */
            {
                test: /\.less$/,
                loader:  "style-loader!css-loader!postcss-loader!less-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=../images/[hash:8].[name].[ext]'
            }
        ]
    },
    resolve: {
        /**
         * Vue v2.x 之後 NPM Package 預設只會匯出 runtime-only 版本
         */
        alias: {
            jquery: path.join(__dirname,"js/jquery.min.js")
        }
    },
    postcss() {
        return [
            require('autoprefixer')({ browsers: ['last 2 versions'] }),
            px2rem({remUnit: 64})];
    },
    plugins:  [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('js/common.js'),
        new ExtractTextPlugin("css/main.less"),
        new htmlWebpackPlugin({
            template: 'html-withimg-loader!' + path.resolve("src/index.html"),
            filename: "index.html"
        })
       /* new webpack.ProvidePlugin({ //这是把jquery挂到全局上，不用每个模块都去require
            "$": path.join(__dirname, 'js', 'jquery'),
            "jQuery":  path.join(__dirname, 'js', 'jquery')
        })*/
    ]
};

module.exports = config;