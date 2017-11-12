/* require('../utils').creatSecret();
const secret = require('./secret.js')

//MD5加密前缀，如用户的密码那是123456，存在数据库将会成为 md5('!@#$%(*&^)' + '123456')

exports.md5Pre = "!@#$%(*&^)"
exports.secretServer = secret.secretServer
exports.secretClient = secret.secretServer */
const isMac = /^darwin/.test(process.platform)
const isWin = /^win/.test(process.platform)
const prod = process.env.NODE_ENV
let password = ''
if (prod) {
  password = 'xcxerxes_0108'
} else {
  password = isMac ? '' : '1234'
}
console.log("process.platform: "+ process.platform)
module.exports = {
  database: 'xcxerxes_blog',
  username: 'root',
  password,
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
}