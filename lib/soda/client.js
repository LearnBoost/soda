
/*!
 * Soda - Client
 * Copyright(c) 2010 LearnBoost <tj@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var http = require('http')
  , qs = require('querystring');

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
  this.browser = options.browser || 'firefox';
  this.url = options.url;
  if (this.browser[0] !== '*') this.browser = '*' + this.browser;
};

/**
 * Initialize a new session, then callback `fn(err, sid)`
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

Client.prototype.session = function(fn){
  var self = this;
  if (!this.browser) throw new Error('browser required');
  if (!this.url) throw new Error('browser url required');
  this.command('getNewBrowserSession', [this.browser, this.url], function(err, res){
    if (err) return fn(err);
    fn(null, self.sid = res.body);
  });
};

/**
 * Execute the given `cmd` / `args`, then callback `fn(err, res)`.
 *
 * @param {String} cmd
 * @param {Array} args
 * @param {Function} fn
 * @return {Client} for chaining
 * @api private
 */

Client.prototype.command = function(cmd, args, fn){
  // HTTP client
  var client = http.createClient(this.port, this.host);

  // Path construction
  var path = this.commandPath(cmd, args);

  // Request
  var req = client.request('GET'
    , path
    , { Host: this.host + (this.port ? ':' + this.port : '') });
    
  req.on('response', function(res){
    res.body = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){ res.body += chunk; });
    res.on('end', function(){
      if (res.body.indexOf('ERROR') === 0) {
        var err = res.body.replace(/^ERROR: */, '');
        err = cmd + '(' + args.join(', ') + '): ' + err; 
        fn(new Error(err), res);
      } else {
        if (res.body.indexOf('OK') === 0) {
          res.body = res.body.replace('OK,', '');
        }
        fn(null, res);
      }
    });
  });
  req.end();
  return this;
};

/**
 * Construct a `cmd` path with the given `args`.
 *
 * @param {String} name
 * @param {Array} args
 * @return {String}
 * @api private
 */

Client.prototype.commandPath = function(cmd, args){
  var obj = { cmd: cmd };

  // Arguments by nth
  if (args) {
    args.forEach(function(arg, i){
      obj[i+1] = arg;
    });
  }
  // Ignore session id for getNewBrowserSession
  if (this.sid && cmd !== 'getNewBrowserSession') {
    obj.sessionId = this.sid;
  }

  return '/selenium-server/driver/?' + qs.stringify(obj);
};

Client.prototype.__defineGetter__('chain', function(){
  this.queue = [];
  return this;
});

Client.prototype.done = function(fn){
  this.done = fn;
  this.queue.shift()();
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

/**
 * Command names.
 * 
 * @type Array
 */

exports.commands = [
    'addSelection'
  , 'answerOnNextPrompt'
  , 'check'
  , 'chooseCancelOnNextConfirmation'
  , 'click'
  , 'clickAt'
  , 'clickAndWait'
  , 'close'
  , 'deleteCookie'
  , 'dragAndDrop'
  , 'fireEvent'
  , 'goBack'
  , 'keyDown'
  , 'keyPress'
  , 'keyUp'
  , 'mouseDown'
  , 'mouseDownAt'
  , 'mouseMove'
  , 'mouseMoveAt'
  , 'mouseOut'
  , 'mouseOver'
  , 'mouseUp'
  , 'mouseUpAt'
  , 'open'
  , 'refresh'
  , 'removeSelection'
  , 'select'
  , 'selectFrame'
  , 'selectWindow'
  , 'setContext'
  , 'setCursorPosition'
  , 'setTimeout'
  , 'submit'
  , 'type'
  , 'testComplete'
  , 'uncheck'
  , 'waitForCondition'
  , 'waitForPageToLoad'
  , 'waitForPopUp'
  , 'windowFocus'
  , 'windowMaximize'
];

/**
 * Accessor names.
 * 
 * @type Array
 */

exports.accessors = [
    'Alert'
  , 'AllButtons'
  , 'AllFields'
  , 'AllLinks'
  , 'AllWindowIds'
  , 'AllWindowNames'
  , 'AllWindowTitles'
  , 'Attribute'
  , 'AttributeFromAllWindows'
  , 'BodyText'
  , 'Confirmation'
  , 'Cookie'
  , 'CursorPosition'
  , 'ElementHeight'
  , 'ElementIndex'
  , 'ElementPositionLeft'
  , 'ElementPositionTop'
  , 'ElementWidth'
  , 'Eval'
  , 'Expression'
  , 'HtmlSource'
  , 'Location'
  , 'LogMessages'
  , 'Prompt'
  , 'SelectedId'
  , 'SelectedIds'
  , 'SelectedIndex'
  , 'SelectedIndexes'
  , 'SelectedLabel'
  , 'SelectedLabels'
  , 'SelectedValue'
  , 'SelectedValues'
  , 'SelectedOptions'
  , 'Table'
  , 'Text'
  , 'Title'
  , 'Value'
  , 'WhetherThisFrameMatchFrameExpression'
  , 'AlertPresent'
  , 'Checked'
  , 'ConfirmationPresent'
  , 'Editable'
  , 'ElementPresent'
  , 'Ordered'
  , 'PromptPresent'
  , 'SomethingSelected'
  , 'TextPresent'
  , 'Visible'
];

/**
 * Generate commands via accessors.
 */

exports.accessors.map(function(cmd){
  exports.commands.push(
      'assert' + cmd
    , 'assertNot' + cmd
    , 'verify' + cmd
    , 'verifyNot' + cmd
    , 'waitFor' + cmd
    , 'waitForNot' + cmd);
});

/**
 * Generate command methods.
 */

exports.commands.map(function(cmd){
  Client.prototype[cmd] = function(){
    if (this.queue) {
      var self = this
        , args = Array.prototype.slice.call(arguments);
      this.queue.push(function(){
        self.command(cmd, args, function(err, res){
          if (err) {
            self.done(err, res);
          } else if (self.queue.length) {
            self.queue.shift()();
          } else {
            self.done(null, res);
          }
        });
      });
      return this;
    } else {
      var len = arguments.length
        , fn = arguments[len - 1]
        , args = Array.prototype.slice.call(arguments, 0, len - 1);
      return this.command(cmd, args, fn);
    }
  };
});
