var Storage = function () {
    this._data = {};
}

Storage.prototype.write = function (key, value, cb) {
    this._data[key] = value;
    cb();
}

Storage.prototype.read = function (key, cb) {
    if (this._data.hasOwnProperty(key)) {
        cb(null, this._data[key]);
    } else {
        cb('No such key', undefined);
    }
}

module.exports = Storage;
