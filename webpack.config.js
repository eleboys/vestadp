const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "production",
  entry: {
    "vesta-date-picker": "./src/ts/vesta-date-picker.ts",
    "vesta-date-picker.persian": "./src/ts/vesta-date-picker-persian-calendar.ts",
    "vesta-date-picker.gregorian": "./src/ts/vesta-date-picker-gregorian-calendar.ts",
    "vesta-date-picker.hijri": "./src/ts/vesta-date-picker-hijri-calendar.ts",
    "vesta-date-picker-style.normal": "./src/scss/VestaDatePicker.scss",
    "vesta-date-picker-style.jqui": "./src/scss/VestaDatePicker.jqui.scss",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist/js/",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.scss$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: "../css/[name].css",
                }
            },
            {
                loader: 'extract-loader'
            },
            {
                loader: 'css-loader?-url'
            },
            {
                loader: 'sass-loader'
            }
        ]
      },
    ],
  }
};
