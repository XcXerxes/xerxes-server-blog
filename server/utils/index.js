const fs = require("fs")

const fsExistsSync = path => {
    try {
        fs.accessSync(path, fs.F_OK)
    } catch (e) {
        return false
    }
    return true
}

exports.strLength = str => {
    var charCode = -1;
    var realLength = 0;
    for (var i = 0; i < str.length; i++) {
        charCode = str.charCoddAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        } else {
            realLength += 2
        }
    }
    return realLength;
}
const path = './server/config/secret.js';
exports.creatSecret = () => {
    if (!fsExistsSync(path)) {
        var secretServer = Math.random() * 1000000;
        var secretClient = Math.random() * 1000000;
        const secret = `
            exports.secretServer = '${secretServer}'
            exports.secretClient = '${secretClient}'
        `
        fs.writeFileSync(path, secret)
    }
}

exports.fsExistsSync = fsExistsSync;