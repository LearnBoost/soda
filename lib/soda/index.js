
/*!
 * Soda
 * Copyright(c) 2010 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Export all of ./client.
 */

exports = module.exports = require('./client');

/**
 * Export sauce client.
 */

exports.TestingBotClient = require('./testingbot');
exports.createTestingBotClient = require('./testingbot').createClient;

/**
 * Library version.
 * 
 * @type String
 */

exports.version = '0.2.5';
