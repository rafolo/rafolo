#Sample app [![Build Status](https://travis-ci.org/rafolo/rafolo.svg?branch=master)](https://github.com/rafolo/rafolo/tree/master/sample_app)

Sample geo-localisation application

## Bower install
Run
    ~$ npm install
    ~$ npm install -g bower
    ~$ bower install

## Karma install
    ~$ npm install -g karma
    ~$ npm install -g karma-cli

## Protractor install
    ~$ npm install -g protractor

## Tests
Run
    ~$ karma start
    ~$ protractor

Troubleshooting:

Protractor not starting on Windows/Mac:

    ~$ webdriver-manager start --standalone

Protractor Debug helper methods:

    browser.debugger();

    browser.pause();