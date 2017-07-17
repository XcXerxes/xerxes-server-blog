var jwt = require("jsonwebtoken")
var config = require('../config')
var secret = config.secretServer
var checkToken = require('./token')
module.exports = (req, res, next) => {
    checkToken({
        user: req.cookies.b_user,
        userid: req.cookies.b_userid,
        username: req.cookies.b_username
    }, {
        secret
    }, req, res)
}