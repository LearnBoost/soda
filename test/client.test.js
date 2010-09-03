
/**
 * Module dependencies.
 */

var soda = require('soda');

module.exports = {
  'test .createClient() defaults': function(assert){
    var client = soda.createClient({
      browser: '*firefox',
      url: 'http://www.google.com'
    });
    assert.equal('localhost', client.host);
    assert.equal(4444, client.port);
  }
};