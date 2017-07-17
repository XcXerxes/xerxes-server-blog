var jwt = require('jsonwebtoken');

module.exports = (params, config, req, res) => {
    var token = params.user;
    var userid = params.userid;
    var username = params.username;
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (!err && decoded && decoded.id === userid && decoded.username === username) {
                req.decoded = decoded;
                next();
            } else {
                res.cookie(token, '', { maxAge: 0 })
                res.cookie(userid, '', { maxAge: 0 })
                res.cookie(username, '', { maxAge: 0 })
                return res.json({
                    code: -500,
                    message: '登陆验证失败',
                    data: ''
                })
            }
        })
    } else {
        return res.json({
            code: -500,
            message: '请先登陆',
            data: ''
        })
    }
}