var fs = require('fs');

function getSecretKey(pathToKey) {
    var content = fs.readFileSync(pathToKey, 'utf-8'),
        begin = '-----BEGIN RSA PRIVATE KEY-----',
        end = '-----END RSA PRIVATE KEY-----';

    return content.slice(content.indexOf(begin) + begin.length + 1, content.indexOf(end));
}

function deepCopy(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }

    var copy = obj.constructor();
    for (var key in obj) {
        if (typeof obj[key] === 'object') {
            copy[key] = deepCopy(obj[key]);
        } else {
            copy[key] = obj[key];
        }
    }
    return copy;
}

module.exports = {
    getSecretKey: getSecretKey,
    deepCopy: deepCopy
};
