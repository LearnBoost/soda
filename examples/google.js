
/**
 * Module dependencies.
 */

var soda = require('../index')
  , assert = require('assert');

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
  .getTitle(function(title){
    assert.ok(~title.indexOf('Hello World'))
  })
  .testComplete()
  .end(function(err){
    if (err) throw err;
    console.log('done');
  });
