
/**
 * Module dependencies.
 */

var soda = require('../index');

var browser = soda.createClient({
  host: 'localhost',
  port: 4444,
  url: 'http://www.google.com',
  browser: 'firefox'
});

browser.session(function(err){
  browser.open('/', function(err, res){
    browser.type('q', 'Hello World', function(err, res){
      browser.clickAndWait('btnG', function(err, res){
        browser.assertTitle('Hello World - Google Search', function(err, res){
          if (err) throw err;
          browser.testComplete(function(err, res){
            console.log('done');
          });
        });
      });
    });
  });
});