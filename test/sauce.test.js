
/**
 * Module dependencies.
 */

var soda = require('soda');

module.exports = {
  'test SauceClient.url()': function(assert){
    var path = soda.SauceClient.url('tjholowaychuk', '123', 'video.flv');
    assert.equal('https://saucelabs.com/rest/tjholowaychuk/jobs/123/results/video.flv', path);
  },
  
  'test SauceClient.video()': function(assert){
    var str = soda.SauceClient.video('tjholowaychuk', 'my-api-key', '123');
    assert.equal(
        '<script src="http://saucelabs.com/video-embed/123.js?username=tjholowaychuk&access_key=my-api-key"/>'
      , str);
  }
};