
/**
 * Module dependencies.
 */

var soda = require('soda');

module.exports = {
  'test SauceClient.url()': function(assert){
    var path = soda.SauceClient.url('tjholowaychuk', '123', 'video.flv');
    assert.equal('https://saucelabs.com/rest/tjholowaychuk/jobs/123/results/video.flv', path);
  }
};