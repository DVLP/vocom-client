module.exports = {
    context: __dirname,
    entry: "./src/js/main",
    output: {
        path: __dirname,
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel'
            }
        ]
    },
    worker: {
        context: __dirname,
        output: {
            path: __dirname + '',
            publicPath: "",
            filename: "./hash.worker.js",
            chunkFilename: "./[id].hash.worker.js"
        }
    }
};