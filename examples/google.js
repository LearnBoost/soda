
/**
 * Module dependencies.
 */

var soda = require('../')
  , assert = require('assert');

var browser = soda.createClient({
    host: 'localhost'
  , port: 4444
  , url: 'http://www.google.com'
  , browser: 'firefox'
});

browser.on('command', function(cmd, args){
  console.log(' \x1b[33m%s\x1b[0m: %s', cmd, args.join(', '));
});

browser
  .chain
  .session()
  .open('/')
  .type('q', 'Hello World')
  .clickAndWait('btnG')
  .getTitle(function(title){
    assert.ok(~title.indexOf('Hello World'), 'Title did not include the query');
  })
  .clickAndWait('link=Advanced search')
  .waitForPageToLoad(2000)
  .assertText('css=#gen-query', 'Hello World')
  .assertAttribute('as_q@value', 'Hello World')
  .testComplete()
  .end(function(err){
    if (err) throw err;
    console.log('done');
  });
