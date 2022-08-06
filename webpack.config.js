const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: "./src/client/js/main.js",
    plugins:[new MiniCssExtractPlugin({ filename: "css/styles.css" })],
    mode: "development",
    output: {
        filename: "js/main.js",
        path: path.resolve(__dirname, "assets"),
    },
    module: {
        rules : [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
        ]
    }
};
