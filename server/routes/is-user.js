var jwt = require("jsonwebtoken")
var config = require('../config')
var secret = config.secretClient
var checkToken = require('./token')

module.exports = (req, res, next) => {
    checkToken({
        user: req.cookies.user,
        userid: req.cookies.userid,
        username: req.cookies.username
    }, {
        secret
    }, req, res)
}