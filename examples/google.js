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
  .click('btnG')
  .waitForTextPresent('Hello World')
  .getTitle(function(title){
    assert.ok(~title.indexOf('hello world'), 'Title did not include the query: ' + title);
  })
  .click('link=Advanced search')
  .waitForPageToLoad(2000)
  .assertAttribute('as_q@value', 'Hello World')
  .end(function(err){
    browser.testComplete(function(){
      console.log('done');
      if (err) throw err;
    });
  });
