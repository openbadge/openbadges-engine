var __assert = require('assert'),
    EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits;

var Client = require('cocaine').Client;

function Storage(options) {
    options = options || {};
    this._namespace = options.namespace || 'defaultnamespace';
    this._locator = options.locator || 'apefront.tst.ape.yandex.net:10053';

    this._client = new Client(this._locator);

    this._storage = this._client.Service('storage');

    this._connecting = false;
    this._connected = false;
}

inherits(Storage, EventEmitter);

Storage.prototype.connect = function () {
    var self = this;
    this._connecting = true;
    this._storage.connect();
    this._storage.once('connect', function () {
        __assert(self._connecting);
        self._connecting = false;
        self._connected = true;
        self.emit('connect');
    });
}

Storage.prototype.write = function (key, value, cb) {
    __assert(this._connected, 'this._connected');

    this._storage.write(this._namespace, key, value, cb);
}

Storage.prototype.read = function (key, cb) {
    __assert(this._connected, 'this._connected');
    this._storage.read_latest(this._namespace, key, cb);
}

module.exports = Storage;
