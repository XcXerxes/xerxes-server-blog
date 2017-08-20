const secret = require('../config/secret.json')['secret_token']
const checkToken = require('./token')
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const token = req.cookies.user
    const userid = req.cookies.userid
    const username = req.cookies.username
    if (token) {
        jwt.verify(token, secret.toString(), (err, decoded) => {
            if (!err && decoded && decoded.id === userid && decoded.username === username) {
                req.decoded = decoded
                next()
            } else {
                res.cookie('user', '', {maxAge: 0})
                res.cookie('userid', '', {maxAge: 0 })
                res.cookie('username', '', {maxAge: 0})
                res.json({
                    code: -500,
                    message: '登录验证失败',
                    data: ''
                })
            }
        })
    } else {
        res.json({
            code: -500,
            message: '请先登录',
            data: ''
        })
    }
}