const path = require('path');

module.exports = {
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
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
    mode: 'development'
};