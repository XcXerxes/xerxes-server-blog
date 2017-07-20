const secret = require('../config/secret.json')['secret_token']
const checkToken = require('./token')
module.exports = (req, res, next) => {
    const token = req.body.xc_token || req.param['xc_token'] || req.headers['xc_token']
    checkToken(token, {
        secret
    }, req, res, next)
}