
/**
 * Module dependencies.
 */

var selenium = require('../index');

var client = selenium.createClient({
  host: 'localhost',
  port: 4444,
  url: 'http://www.google.com'
});

client.command('getNewBrowserSession', ['*firefox', 'http://google.com'], function(err, res){
  console.dir(res.body)
});