module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            "src/ts/vesta-date-picker.ts",
            { pattern: "src/ts/vesta-date-picker-*.ts" },
            { pattern: "src/test/**/*.ts" }
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"]
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
                ]
            }
        }
    });
};