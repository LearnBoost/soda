
/**
 * Module dependencies.
 */

var selenium = require('selenium'),
    Client = selenium.Client;

module.exports = {
  'test .createClient() defaults': function(assert){
    var client = selenium.createClient({
      browser: '*firefox',
      url: 'http://www.google.com'
    });
    assert.equal('localhost', client.host);
    assert.equal(4444, client.port);
  }
};