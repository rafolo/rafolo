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
    specs: ['node_modules/protractor/example/example_spec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },
    onPrepare: function(){
        global.dvr = browser.driver;
    },
    suites: {
        homepage: 'test/client/e2e/homepage/**/*spec.js',
        sessions: 'test/client/e2e/sessions/**/*spec.js'
        //search: ['tests/e2e/contact_search/**/*Spec.js']
    }
};
