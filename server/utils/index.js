const fs = require("fs")
const path = require('path')

// 验证 secret 文件是否存在
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
exports.creatSecret = () => {
    let filePath = path.join(__dirname, '..', 'config/secret.json')
    if (!fsExistsSync(filePath)) {
        const secret = {
            secret_token: Math.random() * 1000000
        }
        fs.writeFileSync(filePath, JSON.stringify(secret), 'utf8')
    }
}

/**
 * @method parsePagination  // 解析 limit page sort 
 */
exports.parsePagination = ({ limit, page, sort }) => {
    const sortName = (sort && sort.split('-')[0]) || 'id'
    const sortType = (sort && sort.split('-')[1]) || 'desc'
    console.log('`${sortName} ${sortType}`==' + `${sortName} ${sortType}`)
    limit = parseInt(limit, 10) || 12
    page = parseInt(page, 10) || 1
    const offset = (page - 1) * limit
    return {
        limit,
        offset,
        order: [
            [sortName, sortType]
        ]
    }
}

exports.fsExistsSync = fsExistsSync;