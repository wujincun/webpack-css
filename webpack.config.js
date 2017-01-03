
var path = require('path'),
    webpack = require('webpack'),

    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    autoprefixer = require('autoprefixer'),
    px2rem = require('postcss-px2rem');

var config = {
    entry: [
        'webpack/hot/dev-server',
        path.join(__dirname, 'src', 'main'),
        path.join(__dirname, 'css', 'lucyBagH5.css')
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
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract("style-loader","css-loader!postcss-loader")
            },
            {
                test: /\.less$/,
                loader:  ExtractTextPlugin.extract("style-loader","css-loader!less-loader","postcss-loader")
            },
            { 
                test: /\.scss$/, 
                loader: 'style-loader!css-loader!sass-loader!postcss-loader'
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

    // 服务器配置相关，自动刷新!
    devServer: {
        hot: true,
        inline: true
    },
    plugins:  [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin("lucyBagH51.css")
    ]
};

module.exports = config;