
/*!
 * Soda - Sauce
 * Copyright(c) 2010 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Client = require('./client');

/**
 * Initialize a `Client` with the given `options`.
 * 
 * Options:
 *   
 *   - `username`         Saucelabs username
 *   - `access-key`       Account access key
 *   - `os`               Operating system ex "Linux"
 *   - `browser`          Browser name, ex "firefox"
 *   - `browser-version`  Browser version, ex "3.0.", "7."
 *   - `max-duration`     Maximum test duration in seconds, ex 300 (5 minutes)
 * 
 * @params {Object} options
 * @api public
 */

var SauceClient = exports = module.exports = function SauceClient(options) {
  this.host = 'saucelabs.com';
  this.port = 4444;
  this.url = options.url;
  this.options = options;
  this.browser = JSON.stringify(options);
};

/**
 * Interit from `Client`.
 */

SauceClient.prototype.__proto__ = Client.prototype;

/**
 * Shortcut for `new soda.SauceClient()`.
 *
 * @param {Object} options
 * @return {Client}
 * @api public
 */

exports.createClient = function(options){
  return new SauceClient(options);
};

/**
 * Return the saucelabs url to `jobId`'s `filename`.
 *
 * @param {String} username
 * @param {String} jobId
 * @param {String} filename
 * @return {String}
 * @api public
 */

exports.path = function(username, jobId, filename){
  return 'https://saucelabs.com/rest/'
    + username + '/jobs/'
    + jobId + '/results/'
    + filename;
};