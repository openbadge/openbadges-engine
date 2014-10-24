var fs = require('fs');

/**
 * Returns secret key
 * @param {String} pathToKey
 * @returns {String}
 */
function getSecretKey(pathToKey) {
    return fs.readFileSync(pathToKey, 'utf-8')
            .replace('-----BEGIN RSA PRIVATE KEY-----', '')
            .replace('-----END RSA PRIVATE KEY-----', '')
            .trim();
}

/**
 * Returns config for badges' storage
 * @param {Object} [rawConfig]
 * @param {String} [rawConfig.token]
 * @param {String} [rawConfig.repo]
 * @returns {Object}
 */
function getBadgesStorageConfig(rawConfig) {
    var _repo = rawConfig.repo.replace('https://github.com/', '').replace('.git', ''),
        user = _repo.slice(0, _repo.indexOf('/')),
        repo = _repo.slice(_repo.lastIndexOf('/') + 1);

    return {
        token: rawConfig.token,
        user: user,
        repo: repo,
        storage: 'http://' + user + '.github.io/' + repo
    };
}

module.exports = {
    getSecretKey: getSecretKey,
    getBadgesStorageConfig: getBadgesStorageConfig
};
