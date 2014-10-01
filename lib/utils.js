var fs = require('fs');

function getSecretKey(pathToKey) {
    var content = fs.readFileSync(pathToKey, 'utf-8'),
        begin = '-----BEGIN RSA PRIVATE KEY-----',
        end = '-----END RSA PRIVATE KEY-----';

    return content.slice(content.indexOf(begin) + begin.length + 1, content.indexOf(end));
}

module.exports = {
    getSecretKey: getSecretKey
};
