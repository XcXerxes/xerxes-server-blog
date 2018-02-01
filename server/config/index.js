/* require('../utils').creatSecret();
const secret = require('./secret.js')

//MD5加密前缀，如用户的密码那是123456，存在数据库将会成为 md5('!@#$%(*&^)' + '123456')

exports.md5Pre = "!@#$%(*&^)"
exports.secretServer = secret.secretServer
exports.secretClient = secret.secretServer */
const mysqlConfig = require('./mysql.conf')
const env = process.env.NODE_ENV
let password = ''
console.log("process.platform: "+ process.platform)
if (env === 'production') {
  module.exports = require('./mysql.conf').prod
} else {
  module.exports = require('./mysql.conf').dev
}

// module.exports = {
//   database: 'xcxerxes_blog',
//   username: 'root',
//   password,
//   host: 'localhost',
//   dialect: 'mysql',
//   timezone: '+08:00',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 30000
//   }
// }