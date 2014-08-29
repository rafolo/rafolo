#Sample app [![Build Status](https://travis-ci.org/rafolo/rafolo.svg?branch=master)](https://travis-ci.org/rafolo/rafolo)

Sample geo-localisation application

## Prerequisite:

  firefox required

## Bower install

    ~$ npm install
    ~$ npm install -g bower
    ~$ bower install

## Karma install
    ~$ npm install -g karma
    ~$ npm install -g karma-cli

## Protractor install
    ~$ npm install -g protractor

## Tests

    ~$ karma start
    ~$ protractor

Troubleshooting:

Protractor not starting on Windows/Mac:

    ~$ webdriver-manager start --standalone

Protractor Debug helper methods:

    browser.debugger();

    browser.pause();