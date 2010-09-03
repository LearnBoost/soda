
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
  browser.command('open', ['/'], function(err, res){
    browser.command('type', ['q', 'Hello World'], function(err, res){
      browser.command('clickAndWait', ['btnG'], function(err, res){
        browser.command('assertTitle', ['Hello World - Google Search'], function(err, res){
          if (err) throw err;
          browser.command('testComplete', [], function(err, res){
            console.dir(res.body)
          });
        });
      });
    });
  });
});