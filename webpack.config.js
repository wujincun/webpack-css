
var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    autoprefixer = require('autoprefixer'),
    px2rem = require('postcss-px2rem'),
    htmlWebpackPlugin=require("html-webpack-plugin"),
    html = require('html-withimg-loader');

var config = {
    entry: [
        'webpack/hot/dev-server',
        path.join(__dirname, 'js', 'luckyBag'),
        path.join(__dirname, 'css', 'luckyBagGame.less')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/luckyBagGame.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader:  ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader!less-loader")
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
        return [autoprefixer({ browsers: ['last 2 versions'] }),px2rem({remUnit: 64})];
    },
    plugins:  [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('js/common.js'),
        new ExtractTextPlugin("css/luckyBagGame.css"),
        new htmlWebpackPlugin({
            template: 'html-withimg-loader!' + path.resolve("luckyBagGame.html"),
            filename: "luckyBagGame.html"
        }),
       /* new webpack.ProvidePlugin({ //这是把jquery挂到全局上，不用每个模块都去require
            "$": path.join(__dirname, 'js', 'jquery'),
            "jQuery":  path.join(__dirname, 'js', 'jquery')
        })*/
    ]
};

module.exports = config;