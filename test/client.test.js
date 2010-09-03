
/**
 * Module dependencies.
 */

var soda = require('soda');

module.exports = {
  'test .createClient() defaults': function(assert){
    var client = soda.createClient({
      url: 'http://www.google.com'
    });
    assert.equal('*firefox', client.browser);
    assert.equal('localhost', client.host);
    assert.equal(4444, client.port);
  },
  
  'test .createClient() options': function(assert){
    var client = soda.createClient({
      browser: '*safari',
      url: 'http://www.google.com',
      host: 'foobar',
      port: 1234
    });
    assert.equal('*safari', client.browser);
    assert.equal('foobar', client.host);
    assert.equal(1234, client.port);
  },
  
  'test .createClient() browser option': function(assert){
    var client = soda.createClient({
      browser: 'firefox',
      url: 'http://www.google.com'
    });
    assert.equal('*firefox', client.browser);
  },
  
  'test .commandPath()': function(assert){
    var client = soda.createClient({ url: 'http://www.google.com' });
    client.sid = 123;
    assert.equal('/selenium-server/driver/?1=%2F&cmd=open&sessionId=123', client.commandPath('open', ['/']));
    delete client.sid;
    assert.equal('/selenium-server/driver/?1=%2F&cmd=open', client.commandPath('open', ['/']));
    assert.equal('/selenium-server/driver/?cmd=close', client.commandPath('close', []));
    assert.equal('/selenium-server/driver/?1=foo&2=10%2C20&cmd=clickAt', client.commandPath('clickAt', ['foo', '10,20']));
  }
};