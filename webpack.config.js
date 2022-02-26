const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isProduction = env.production; 

    console.log('env', env)
    return {
        mode: env.production ? "production" : "development",
        entry: './src/app.js',  // Relative path
        output: {
            // __dirname: returns absolute path to project folder
            // path.join(): joining absolute path with local path
            path: path.join(__dirname, 'public'),   // Absolute path
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                // what files do we want to run loader on (only js)
                test: /\.js$/,
                // lets us exclude given set of files
                exclude: /node_modules/
            }, {
                // test: /\.scss$/,
                test: /\.(s?)css$/,
                include: [
                    path.resolve(__dirname, "./src"),
                    path.resolve(__dirname, "./node_modules")
                ],
                // use provides us with array of loaders
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    // Source map 
                    options: {
                        sourceMap: true,
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                    }
                }],

            }]
        },
        plugins: [
            new MiniCssExtractPlugin()
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        },
        mode: 'development'
    };
};