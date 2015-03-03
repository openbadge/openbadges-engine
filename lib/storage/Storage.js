var fs = require('fs'),
    Db = require('tingodb')().Db;

function Storage(options) {
    var db = new Db('./', {});
    fs.writeFileSync('./data', '');
    this._collection = db.collection('data');
}

Storage.prototype.write = function (key, value, cb) {
    this._collection.insert({ key: key, val: value }, cb);
};

Storage.prototype.read = function (key, cb) {
    this._collection.findOne({ key: key }, function (err, res) {
        cb(err, res.val);
    });
};

Storage.prototype.update = function (key, value, cb) {
    this._collection.update({ key: key }, { $set: { val: value } }, cb);
};

module.exports = Storage;
