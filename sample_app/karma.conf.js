/*global module: true */
module.exports = function (config) {
    "use strict";
    config.set({
        basePath: '.',
        autoWatch: true,

        frameworks: ['jasmine'],

        plugins: [
            'karma-jasmine',
            'jasmine-jquery',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            //'karma-ie-launcher', TODO! uncomment one day and test IE
            'karma-junit-reporter',
            'karma-coverage'
        ],

        files: [
            'vendor/assets/components/jquery/dist/jquery.js',
            'vendor/assets/components/jasmine-jquery/lib/jasmine-jquery.js',
            'vendor/assets/components/angular/angular.js',
            'vendor/assets/components/angular-route/angular-route.js',
            'vendor/assets/components/angular-mocks/angular-mocks.js',
            'vendor/assets/components/modernizr/modernizr.js',
            {pattern: 'test/client/fixture/*.json', watched: true, included: false, served: true},
            'app/assets/javascripts/app.main.js',
            'app/assets/javascripts/modules/**/*.js',
            {pattern: 'test/client/unit/**/*.js'}
        ],

        //browsers: ['Chrome'],
        //browsers: ['Firefox', 'Chrome', 'PhantomJS', 'PhantomJS_custom'], //@Travis no CHrome, force with karma start --browsers -Firefox
        browsers: ['PhantomJS'], //@Travis no Chrome, force with karma start --browsers -Firefox

        // you can define custom flags
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    }
                },
                flags: ['--remote-debugger-port=9000']
            }
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './**/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'junit'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // coverage optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : './coverage/client'
        },

        // junit reporter the default configuration
        junitReporter: {
            outputFile: 'test-results.xml',
            suite: ''
        }
    });
};