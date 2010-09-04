
/**
 * Module dependencies.
 */

var soda = require('../index');

var browser = soda.createClient({
  host: 'localhost',
  port: 4444,
  url: 'http://sirrobertborden.ca.app.learnboost.com/',
  browser: 'firefox'
});

browser.session(function(){
  browser
    .chain
    .open('/')
    .clickAndWait('css=input[value=Submit]')
    .click('Add Class')
    .type('classroom[name]', 'Me Iz In Your Webzite')
    .type('classroom[description]', 'Controlling urz Browzer')
    .click('classroom[startdate]')
    .click('//tr[3]/td[4]/div')
    .click('classroom[enddate]')
    .click('//tr[4]/td[4]/div')
    .click('//input[@value="Save"]')
    .clickAndWait('link=Log out')
    .testComplete()
    .done(function(err, res){
      if (err) throw err;
      console.log('done');
    });  
});
  
