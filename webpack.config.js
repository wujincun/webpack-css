
var path = require('path'),
    webpack = require('webpack'),

    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    autoprefixer = require('autoprefixer'),
    px2rem = require('postcss-px2rem');

var config = {
    entry: [
        'webpack/hot/dev-server',
        //path.join(__dirname, 'src', 'main'),
        path.join(__dirname, 'css', 'lucyBagH5.less')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
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
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ]
    },
    postcss() {
        return [autoprefixer({ browsers: ['last 2 versions'] }),px2rem({remUnit: 64})];  //貌似有了vue这个没用
    },

    plugins:  [
       // new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin("luckyBagH5.css")
    ]
};

module.exports = config;