
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

browser
  .chain
  .session()
  .open('/')
  .type('q', 'Hello World')
  .clickAndWait('btnG')
  .assertTitle('Hello World - Google Search')
  .testComplete()
  .done(function(err, body, res){
    if (err) throw err;
    console.log('done');
  });
