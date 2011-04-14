
/**
 * Module dependencies.
 */

var soda = require('../');

var browser = soda.createClient({
  url: 'http://sirrobertborden.ca.app.learnboost.com/'
});

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
