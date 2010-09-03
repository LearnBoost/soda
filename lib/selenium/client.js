
/*!
 * Selenium
 * Copyright(c) 2010 LearnBoost (TJ Holowaychuk) <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Initialize a `Client` with the given `options`.
 * 
 * Options:
 *   
 *   - `host`     Hostname defaulting to localhost
 *   - `port`     Port number defaulting to 4444
 *   - `browser`  Browser name
 *   - `url`      URL string
 * 
 * @params {Object} options
 * @api public
 */

var Client = exports = module.exports = function Client(options) {
  this.host = options.host || 'localhost';
  this.port = options.port || 4444;
  this.browser = options.browser;
  this.url = options.url;
};

/**
 * Shortcut for `new selenium.Client()`.
 *
 * @param {Object} options
 * @return {Client}
 * @api public
 */

exports.createClient = function(options){
  return new Client(options);
};