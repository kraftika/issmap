const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});

const cssConfig = isProduction ? cssProd : cssDev;

module.exports = {
    entry: [
        './app/index.js'
    ],
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /.scss$/,
                use: cssConfig
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        compress: true,
        port: 9000,
        open: true,
        openPage: '',
        hot: true,
        inline: true
    },
    plugins: [
        HTMLWebpackPluginConfig, 
        new ExtractTextPlugin('style.css'),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: !isProduction,
            allChunks: true
        }),
    ]
}