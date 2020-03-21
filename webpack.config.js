const path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const Autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;  // package.json scripts와 맞추기 위함
// input to output
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static")

const config = {
    entry: ENTRY_FILE,
    mode: MODE,
    module: {
        rules: [
            {
                test: /\.(scss)$/,  // to find and understand scss files, we want to change scss to css, extract the text and save it into css file
                use: ExtractCSS.extract([
                    {
                        loader: 'css-loader'  // make webpack understand css
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugin() {
                                return [Autoprefixer({ browsers: "cover 99.5%" })]; // ref: autoprefixer github 
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                ])
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [
        new ExtractCSS('style.css')
    ]
};

module.exports = config;