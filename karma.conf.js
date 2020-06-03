module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            "src/ts/vesta-date-picker.ts",
            { pattern: "src/ts/vesta-date-picker-*.ts" },
            { pattern: "src/test/**/*.ts" },
            "src/scss/VestaDatePicker.scss"
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript"],
            'src/**/*.scss': ['scss']
        },
        client: {
            clearContext: false
        },
        autoWatch: true,
        reporters: ["kjhtml", "dots"],
        browsers: ["Chrome"],
        singleRun: false,
        karmaTypescriptConfig: {
            bundlerOptions: {
                transforms: [
                    require("karma-typescript-es6-transform")()
                ],
                sourceMap: true
            },
            compilerOptions: {
                module: "commonjs",
                sourceMap: true,
                target: "ES5"
            },
            coverageOptions: {
                instrumentation: true,
                instrumenterOptions: {
                    preserveComments: true,
                    debug: true,
                    produceSourceMap: true
                }
            },
            exclude: ["node_modules"]
        }
    });
};