
/**
 * Module dependencies.
 */

var soda = require('../index');

var browser = soda.createClient({
  url: 'http://sirrobertborden.ca.app.learnboost.com/'
});

browser
  .chain
  .session()
  .setTimeout(5000)
  .open('/')
  .waitForText('Submit')
  .clickAndWait('//input[@value="Submit"]')
  .clickAndWait('link=Settings')
  .type('user[name][first]', 'TJ')
  .clickAndWait('//input[@value="Save"]')
  .assertTextPresent('Account info updated')
  .clickAndWait('link=Log out')
  .testComplete()
  .done(function(err, res){
    if (err) throw err;
    console.log('done');
  });  
