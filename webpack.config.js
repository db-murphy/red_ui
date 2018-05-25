var webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devtool: 'source-map',
    target: 'web',
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    output: {
        path: __dirname + '/build',
        filename: 'red_ui.js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src'),
            'cp': resolve('src/components')
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [ {
                  loader: 'html-loader',
                  options: {
                    minimize: false
                  }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                  {
                      loader: "css-loader",
                      options: {
                          minimize: false,
                          sourceMap: true
                      }
                  },
                  { loader: 'postcss-loader', options: { sourceMap: true } },
                  {
                      loader: "sass-loader",
                      options: {
                          sourceMap: true
                      }
                  }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8000,
                      name: 'img/[name].[hash:17].[ext]'
                    }
                  }
                ]
              },
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader'
              }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('created by chhuangxiaolong@jd.com'),
        new MiniCssExtractPlugin({
            filename: "red_ui.css"
        })
    ]
};


// webpack --progress --colors --watch
// webpack --progress --colors
