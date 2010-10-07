
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
  },
  
  'test command generation': function(assert){
    var client = soda.createClient({ url: 'http://www.google.com' });
    assert.ok(client.testComplete, 'testComplete');
    assert.ok(client.getTitle, 'getTitle');
    assert.ok(client.assertText, 'assertText');
    assert.ok(client.assertNotText, 'assertNotText');
    assert.ok(client.verifyText, 'verifyText');
    assert.ok(client.verifyNotText, 'verifyNotText');
    assert.ok(client.waitForText, 'waitForText');
    assert.ok(client.waitForNotText, 'waitForNotText');
  },
  
  'test .session()': function(assert){
    var client = soda.createClient({ url: 'http://www.google.com' });
    client.session(function(err, sid){
      assert.ok(!err);
      assert.equal(32, sid.length, 'Invalid sid in response');
      assert.equal(client.sid, sid);
      client.testComplete(function(err){
        assert.ok(!err);
      });
    });
  },
  
  'test assertions': function(assert){
    var client = soda.createClient({ url: 'http://www.google.com' });
    client.session(function(err, sid){
      assert.ok(!err);
      assert.equal(32, sid.length, 'Invalid sid in response');
      assert.equal(client.sid, sid);
      client.open('/', function(){
        client.assertTitle('Google', function(err, body){
          assert.ok(!err);
          client.assertTitle('Goobar', function(err){
            assert.includes(err.message, 'assertTitle(Goobar)');
            client.testComplete(function(err){
              assert.ok(!err);
            });
          });
        })
      });
    });
  },
  
  'test .chain': function(assert, beforeExit){
    var called = 0;
    var client = soda.createClient({ url: 'http://www.google.com' });
    client
      .chain
      .session()
      .open('/')
      .and(function(browser){
        ++called;
        assert.equal(browser, client, 'and() first arg is not the client');
        assert.equal(this, client, 'and() "this" is not the client');
        this.assertTitle('Google');
      })
      .testComplete()
      .end(function(err){
        assert.ok(!err);
        ++called;
      });
    beforeExit(function(){
      assert.equal(2, called);
    });
  },
  
  'test .chain exceptions': function(assert, beforeExit){
    var called = 0;
    var client = soda.createClient({ url: 'http://www.google.com' });
    client
      .chain
      .session()
      .open('/')
      .assertTitle('Goobar')
      .testComplete()
      .end(function(err){
        assert.includes(err.message, 'assertTitle(Goobar)');
        ++called;
      });
    beforeExit(function(){
      assert.equal(1, called);
    });
  },
  
  'test .chain callbacks': function(assert, beforeExit){
    var called = 0
      , title = '';
    var client = soda.createClient({ url: 'http://www.google.com' });
    client
      .chain
      .session()
      .open('/')
      .getTitle(function(realTitle){
        ++called;
        title = realTitle;
      })
      .testComplete()
      .end(function(err){
        ++called;
        assert.equal('Google', title);
      });
    beforeExit(function(){
      assert.equal(2, called);
    });
  }
};