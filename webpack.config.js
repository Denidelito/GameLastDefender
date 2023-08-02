const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './dev/js/main.js', // Путь к главному файлу JavaScript
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? 'bundle.min.js' : 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/images/[name][ext]',
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../', // Добавлено, чтобы пути к CSS-файлам внутри dist/css были верными
                            },
                        },
                        'css-loader',
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './dev/index.html', // Путь к HTML-шаблону
                minify: isProduction
                    ? {
                        collapseWhitespace: true,
                        removeComments: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        useShortDoctype: true,
                    }
                    : false,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'dev/assets',
                        to: 'assets',
                    },
                ],
            }),

            new MiniCssExtractPlugin({
                filename: isProduction ? 'css/style.min.css' : 'css/style.css',
            }),
        ],
        optimization: {
            minimize: isProduction,
            minimizer: [new TerserWebpackPlugin()],
        },
        devtool: isProduction ? false : 'inline-source-map',
        "devServer": {
            "static": {
                "directory": path.resolve(__dirname, ""),
                "watch": true
            },
            "open": true
        },
    };
};
