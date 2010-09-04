
/**
 * Module dependencies.
 */

var soda = require('soda');

module.exports = {
  'test .version': function(assert){
    assert.match(soda.version, /^\d+\.\d+\.\d+$/);
  }
};