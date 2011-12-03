
/**
 * Module dependencies.
 */

var soda = require('../');

var browser = soda.createClient({
    host: 'localhost'
  , port: 4444
  , url: 'http://www.google.com'
  , browser: 'firefox'
});

browser.session(function(err){
  browser.open('/', function(err, body){
    browser.type('q', 'Hello World', function(err, body){
      browser.click('btnG', function(err, body){
        browser.waitForTextPresent('Hello World', function(err, body){
          browser.assertTitle('hello world - Google Search', function(err, body){
            if (err) throw err;
            browser.testComplete(function(err, body){
              console.log('done');
            });
          });
        });
      });
    });
  });
});
