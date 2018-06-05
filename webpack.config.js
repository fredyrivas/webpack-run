const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        app: './src/assets/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        port: 9000
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.scss$/,

                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader?url=false'
                    },{
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                  return [
                                    require('precss'),
                                    require('autoprefixer')
                                  ];
                                }
                        }
                    }, {
                        loader: 'sass-loader?url=false'
                    }]
                })
            },
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader',
                    query:{
                        pretty: true
                    }
                }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('assets/css/main.css'),
        new FaviconsWebpackPlugin({
            logo: './src/assets/favicon/favicon.jpg',
            prefix: 'assets/favicons/'
        }),
        new HtmlWebpackPlugin({
            // minify: {
            //     collapseWhitespace: true
            // },
            //excludeChunks: [''],
            hash: true,
            template: './src/views/index.pug'
        }),
        new CopyWebpackPlugin([ {
            from: path.resolve(__dirname, 'src/assets/fonts/'),
            to: path.resolve(__dirname, 'dist/assets/fonts/')
        } ], { debug: 'info' }),
        new CopyWebpackPlugin([ {
            from: path.resolve(__dirname, 'src/assets/img/'),
            to: path.resolve(__dirname, 'dist/assets/img/')
        } ], { debug: 'info' })
    ]
}
