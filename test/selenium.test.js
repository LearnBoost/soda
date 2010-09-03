
/**
 * Module dependencies.
 */

var selenium = require('selenium');

module.exports = {
  'test .version': function(assert){
    assert.match(selenium.version, /^\d+\.\d+\.\d+$/);
  }
};