module.exports = {
    mode: "development",
    entry: {
        "vesta-date-picker": "./src/ts/vesta-date-picker.ts"
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/js/'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};