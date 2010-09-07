
/**
 * Module dependencies.
 */

var soda = require('soda');

module.exports = {
  'test SauceClient.path()': function(assert){
    var path = soda.SauceClient.path('tjholowaychuk', '123', 'video.flv');
    assert.equal('https://saucelabs.com/rest/tjholowaychuk/jobs/123/results/video.flv', path);
  }
};