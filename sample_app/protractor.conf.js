var ScreenShotReporter = require('protractor-screenshot-reporter');
var path = require('path');

// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    //specs: ['node_modules/protractor/example/example_spec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    onPrepare: function(){
        global.dvr = browser.driver;
        global.isAngularSite = function(flag){
            browser.ignoreSynchronization = !flag;
        };
        jasmine.getEnv().addReporter(new ScreenShotReporter({
            baseDirectory: 'tmp/protractor',
            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                // Return '<browser>/<specname>' as path for screenshots:
                // Example: 'chrome/list-should work'.
                return path.join(capabilities.caps_.browserName, descriptions.join('-'));
            },
            takeScreenShotsOnlyForFailedSpecs: true
        }));
    },
    suites: {
        homepage: 'test/client/e2e/homepage/**/*spec.js',
        sessions: 'test/client/e2e/sessions/**/*spec.js'
        //search: ['tests/e2e/contact_search/**/*Spec.js']
    },

    baseUrl: 'http://127.0.0.1:3000',
    allScriptsTimeout: 50000
};
