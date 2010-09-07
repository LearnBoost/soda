
# Soda

 Selenium Node Adapter.

## Features

  - Saucelabs integration
  - Optional chaining API to prevent callback nesting

## Selenium RC Example

    var soda = require('../index')
      , assert = require('assert');

    var browser = soda.createClient({
        host: 'localhost'
      , port: 4444
      , url: 'http://www.google.com'
      , browser: 'firefox'
    });

    browser
      .chain
      .session()
      .open('/')
      .type('q', 'Hello World')
      .clickAndWait('btnG')
      .getTitle(function(title){
        assert.ok(~title.indexOf('Hello World'))
      })
      .testComplete()
      .end(function(err){
        if (err) throw err;
        console.log('done');
      });


## Saucelabs Example

    var soda = require('./index')
      , assert = require('assert');

    var browser = soda.createSauceClient({
        'url': 'http://sirrobertborden.ca.app.learnboost.com/'
      , 'username': '<your username>'
      , 'access-key': '<your api key>'
      , 'os': 'Linux'
      , 'browser': 'firefox'
      , 'browser-version': '3.'
      , 'max-duration': 300 // 5 minutes
    });

    // Log commands as they are fired
    browser.on('command', function(cmd, args){
      console.log(' \x1b[33m%s\x1b[0m: %s', cmd, args.join(', '));
    });

    browser
      .chain
      .session()
      .setTimeout(8000)
      .open('/')
      .waitForPageToLoad(5000)
      .clickAndWait('//input[@value="Submit"]')
      .clickAndWait('link=Settings')
      .type('user[name][first]', 'TJ')
      .clickAndWait('//input[@value="Save"]')
      .assertTextPresent('Account info updated')
      .clickAndWait('link=Log out')
      .testComplete()
      .end(function(err){
        if (err) throw err;
        console.log('done');
      });  


## More Information

  - [Saucelabs Browsers](http://saucelabs.com/products/docs/sauce-ondemand/browsers)
  - [Selenese Introduction](http://seleniumhq.org/docs/02_selenium_basics.html)
  - [Command Reference](http://release.seleniumhq.org/selenium-core/0.8.0/reference.html).