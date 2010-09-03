
/**
 * Module dependencies.
 */

var selenium = require('../index');

var browser = selenium.createClient({
  host: 'localhost',
  port: 4444,
  url: 'http://www.google.com',
  browser: '*firefox'
});

browser.session(function(err){
  browser.command('open', ['/'], function(err, res){
    console.dir(res.body)
  });
});