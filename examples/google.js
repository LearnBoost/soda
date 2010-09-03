
/**
 * Module dependencies.
 */

var selenium = require('../index');

var client = selenium.createClient({
  host: 'localhost',
  port: 4444,
  url: 'http://www.google.com'
});

client.command('getNewBrowserSessions', ['*firefox', 'http://google.com'], function(){
  console.dir(arguments[0])
  console.dir(arguments[1].body)
});