var fs = require('fs');

/**
 * Returns secret key
 * @param {String} pathToKey
 * @returns {String}
 */
function getSecretKey(pathToKey) {
    var content = fs.readFileSync(pathToKey, 'utf-8'),
        begin = '-----BEGIN RSA PRIVATE KEY-----',
        end = '-----END RSA PRIVATE KEY-----';

    return content.slice(content.indexOf(begin) + begin.length + 1, content.indexOf(end));
}

/**
 * Returns the copy of the given object
 * @param {Object} obj
 * @returns {Object}
 */
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

function parseConfig(config) {
    var _repo = config.repo.slice(19),
        user = _repo.slice(0, _repo.indexOf('/')),
        repo = _repo.slice(_repo.lastIndexOf('/') + 1, _repo.length - 4);

    return {
        token: config.token,
        user: user,
        repo: repo,
        host: 'http://' + user + '.github.io/' + repo
    };
}

module.exports = {
    getSecretKey: getSecretKey,
    deepCopy: deepCopy,
    parseConfig: parseConfig
};
