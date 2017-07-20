var jwt = require('jsonwebtoken');

module.exports = (token, config, req, res, next) => {
    if (token) {
        jwt.verify(token, config.secret.toString(), (err, decoded) => {
            if (!err) {
                req.decoded = decoded;
                next();
            } else {
                res.cookie('xc_token', '', { maxAge: 0 })
                return res.json({
                    code: -500,
                    message: '登陆验证失败，请重新登录',
                    data: ''
                })
            }
        })
    } else {
        return res.json({
            code: -500,
            message: '登录超时，请重新登录',
            data: ''
        })
    }
}