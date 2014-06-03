/*global module: true */
module.exports = function (config) {
    "use strict";
    config.set({
        basePath: '.',

        files: [
            'vendor/assets/components/angular/angular.js',
            'vendor/assets/components/angular-route/angular-route.js',
            'vendor/assets/components/angular-mocks/angular-mocks.js',
            'vendor/assets/components/modernizr/modernizr.js',
            {pattern: 'fixture/*.json', watched: true, included: false, served: true},
            'app/assets/javascripts/app.main.js',
            'app/assets/javascripts/modules/**/*.js',
            {pattern: 'test/unit/**/*.js'}
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],
        //browsers: ['Firefox'],

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false

    });
};