const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    // For .env.test
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' })
}

module.exports = (env) => {
    const isProduction = env.production; 

    console.log('env', env)
    return {
        mode: env.production ? "production" : "development",
        entry: './src/app.js',  // Relative path
        output: {
            // __dirname: returns absolute path to project folder
            // path.join(): joining absolute path with local path
            path: path.join(__dirname, 'public', 'dist'),   // Absolute path
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
            new MiniCssExtractPlugin(),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
                'process.env.FIREBASE_MESAUREMENT_ID': JSON.stringify(process.env.FIREBASE_MESAUREMENT_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        },
    };
};