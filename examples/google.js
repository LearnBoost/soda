
/**
 * Module dependencies.
 */

var selenium = require('../index');

var browser = selenium.createClient({
  host: 'localhost',
  port: 4444,
  url: 'http://www.google.com',
  browser: 'firefox'
});

browser.session(function(err){
  browser.command('open', ['/'], function(err, res){
    browser.command('type', ['q', 'Hello World'], function(err, res){
      browser.command('click', ['btnG'], function(err, res){
        browser.command('assertTitle', ['Google'], function(err, res){
          if (err) throw err;
          browser.command('assertTextPresent', ['Hello'], function(err, res){
            if (err) throw err;
            browser.command('testComplete', [], function(err, res){
              console.dir(res.body)
            });
          });
        });
      });
    });
  });
});