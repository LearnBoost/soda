/*!
 * Soda - TestingBot
 * Copyright(c) 2011 TestingBot <info@testingbot.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var http = require('http')
  , qs = require('querystring')
  , EventEmitter = require('events').EventEmitter
  , fs = require('fs');
var Client = require('./client');

/**
 * Initialize a TestingBot client with the given `options`. A suite of environment
 * variables are also supported in place of the options described below.
 *
 * Options:
 *
 *   - `client_key`       TestingBot client key
 *   - `client_secret`    TestingBot client secret
 *   - `os`               Operating system ex "Linux"
 *   - `browser`          Browser name, ex "firefox"
 *   - `browser-version`  Browser version, ex "3.0.", "7."
 *   - `max-duration`     Maximum test duration in seconds, ex 300 (5 minutes)
 *
 * @params {Object} options
 * @api public
 */

var TestingBotClient = exports = module.exports = function TestingBotClient(options) {
  options = options || {};
  this.host = 'hub.testingbot.com';
  this.port = 4444;

  options.os = options.os || 'Windows';
  options['browser-version'] = options['browser-version'] == undefined ? '' : options['browser-version'];

  this.options = options;
  this.browser = options.browser || 'firefox';
  this.url = options.url;

  if (fs.existsSync(process.env.HOME + "/.testingbot")) {
	var data = fs.readFileSync(process.env.HOME + "/.testingbot", "utf-8");
	var parts = data.split(':');
	this.client_key = parts[0];
	this.client_secret = parts[1].replace("\n", "");
  } else {
	if (options.client_key && options.client_secret) {
		this.client_key = options.client_key;
		this.client_secret = options.client_secret;
	} else {
		console.log("*** Please specify your TestingBot client_key and client_secret in the options, or add the ~/.testingbot file");
	}
  }
};

/**
 * Construct a `cmd` path with the given `args`.
 *
 * @param {String} name
 * @param {Array} args
 * @return {String}
 * @api private
 */

TestingBotClient.prototype.commandPath = function(cmd, args){
  var obj = { cmd: cmd, client_key: this.client_key, client_secret: this.client_secret };

  // Arguments by nth
  if (args) {
    args.forEach(function(arg, i) {
      obj[i+1] = arg;
    });
  }

  if (cmd === 'getNewBrowserSession') {
	obj[3] = '';
    obj[4] = 'platform=' + this.options.os + ';version=' + this.options['browser-version'];
  }
  // Ignore session id for getNewBrowserSession
  if (this.sid && cmd !== 'getNewBrowserSession') {
    obj.sessionId = this.sid;
  }
  return '/selenium-server/driver/?' + qs.stringify(obj);
};


/**
 * Interit from `Client`.
 */

TestingBotClient.prototype.__proto__ = Client.prototype;

/**
 * Return testingbot test url.
 *
 * @return {String}
 * @api public
 */

TestingBotClient.prototype.__defineGetter__('testUrl', function(){
  return 'https://testingbot.com/members/tests/' + this.sid;
});

/**
 * Shortcut for `new soda.TestingBotClient()`.
 *
 * @param {Object} options
 * @return {Client}
 * @api public
 */

exports.createClient = function(options){
  var obj = new TestingBotClient(options);
  obj.end = function(fn) {
	TestingBotClient.prototype.end.call(this, function(err) {
		// original callback
		fn();
		// send results to TestingBot
		var postData = qs.stringify({
			client_key: obj.client_key,
			client_secret: obj.client_secret,
			session_id: obj.sid,
			success: err === null,
			kind: 10
		});

		// An object of options to indicate where to post to
	  var post_options = {
	      host: 'testingbot.com',
	      port: '80',
	      path: '/hq',
	      method: 'POST',
	      headers: {
	          'Content-Type': 'application/x-www-form-urlencoded',
	          'Content-Length': postData.length
	      }
	  };

	  // Set up the request
	  var post_req = http.request(post_options, function(res) {
	      res.setEncoding('utf8');
	  });

	  // post the data
	  post_req.write(postData);
	  post_req.end();
	});
  };
  return obj;
};
