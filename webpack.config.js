const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: "./client/src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.[contenthash].js",
        clean: true,
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./client/src/index.html",
        }),
    ],
};
