'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

Chatboot.DEFAULT_HOST = 'api.chatboot.eruditescience.com';
Chatboot.DEFAULT_PORT = '3010';
Chatboot.DEFAULT_BASE_PATH = '/v1/';
Chatboot.DEFAULT_API_VERSION = '1.0';
//Chatboot.DEFAULT_TIMEOUT = require('http').createServer().timeout;
Chatboot.DEFAULT_TIMEOUT = http.timeout;

function Chatboot(key, version) {
  if (!(this instanceof Chatboot)) {
    return new Chatboot(key, version);
  }

  this._api = {
    auth = null,
    host: Chatboot.DEFAULT_HOST,
    port: Chatboot.DEFAULT_PORT,
    basePath: Chatboot.DEFAULT_BASE_PATH,
    version: Chatboot.DEFAULT_API_VERSION,
    timeout: Chatboot.DEFAULT_TIMEOUT,
  };

  this.setApiKey(key);
  this.setApiVersion(version);
}

Chatboot.prototype = {

  setHost: function(host, port, protocol) {
    this._setApiField('host', host);
    if (port) {
      this.setPort(port);
    }
    if (protocol) {
      this.setProtocol(protocol);
    }
  },

  setProtocol: function(protocol) {
    this._setApiField('protocol', protocol.toLowerCase());
  },

  setPort: function(port) {
    this._setApiField('port', port);
  },

  setApiVersion: function(version) {
    if (version) {
      this._setApiField('version', version);
    }
  },

  setApiKey: function(key) {
    if (key) {
      this._setApiField(
        'auth',
        'Basic ' + new Buffer(key + ':').toString('base64')
      );
    }
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? Chatboot.DEFAULT_TIMEOUT : timeout
    );
  },

  setHttpAgent: function(agent) {
    this._setApiField('agent', agent);
  },

  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  getApiField: function(key) {
    return this._api[key];
  },

};

module.exports = Chatboot;
// expose constructor as a named property to enable mocking with Sinon.JS
module.exports.Chatboot = Chatboot;
