const general = require('./general')
const assertError = require('../utils/asserts')
const db = require('../models')
const moment = require("moment")
const jwt = require("jsonwebtoken")

// 验证secret 是否存在
require('../utils').creatSecret()

// 密钥时间戳
let secret = require('../config/secret.json')['secret_token']


/**
 * 获取管理员列表
 * @methods getList
 */

exports.getList = (req, res) => {
    general.list(req, res, Admin)
}

/**
 * 获取单个用户
 * @methods getItem
 */

exports.getItem = (req, res) => {
    general.item(req, res, Admin)
}

/**
 * 管理员登录
 * @methods loginAdmin
 */

exports.login = (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res.json(assertError('用户名或者密码不能为空'))
    }
    db.admin.findOne({
        where: {
            username
        }
    }).then(result => {
        if (result) {
            if (result.password === password) {
                console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
                db.admin.update({
                    updatedAt: new Date()
                }, {
                    where: {username}
                }).then(() => {
                    const token = jwt.sign({username: encodeURI(username), password}, secret.toString(), {
                        expiresIn: 60 * 60 * 3 //过期时间为3个小时
                    })
                    // res.cookie()
                    res.json({
                        code: 200,
                        message: '登录成功',
                        data: token
                    })
                })
            } else {
                res.json(assertError('密码错误'))
            }
           /*  var id = result._id;
            var remember_me = 2592000000
            username = encodeURI(username)
            var token = jsw.sign({ id, username }, secret, { expiresIn: 60 * 60 * 24 * 30 })
            res.cookie('b_user', token, { maxAge: remember_me })
            res.cookie('b_userid', id, { maxAge: remember_me })
            res.cookie('b_username', username, { maxAge: remember_me }) */
        } else {
            return res.json(assertError('用户名不存在'))
        }
    }).catch(err => {
        res.json(assertError(err.toString()))
    })
}

/**
 * 初始化添加管理员
 * @methods insertAdmin
 */

exports.insert = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    if (fsExistsSync('./admin.lock')) {
        return res.render('admin-add.html', { message: '请先把admin.lock删除' })
    }
    if (!username || !password || !email) {
        return res.render('admin-add.html', { message: '请将表单填写完整' })
    }
    Admin.findOneAsync({ username })
        .then(result => {
            if (result) {
                return '该用户已经存在'
            }
            return Admin.createAsync({
                username,
                email,
                password: md5(md5Pre + password),
                creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                is_delete: 0,
                timestamp: moment().format('X')
            }).then(() => {
                fs.writeFileSync('./admin.lock', username)
                return '添加用户成功：' + username + ',密码:' + password
            })
        }).then(message => {
            res.render('admin-add.html', { message })
        }).catch(err => next(err))
}

/**
 * 管理员编辑
 * @methods modifyAdmin
 */

exports.modify = (req, res) => {
    var data = {};
    if (req.body.password) {
        data['password'] = md5(md5Pre + password)
    }
    general.modify(res, Admin, req.body.id, Object.assign({}, data, {
        email,
        username,
        update_date: moment().format('YYYY-MM-DD HH:mm:ss')
    }))
}

/**
 * 管理员删除
 * @methods deleteOne
 */
exports.deletes = (req, res) => {
    general.deletes(req, res, Admin)
}

/**
 * 管理员恢复
 * @methods recover
 * 
 */

exports.recover = (req, res) => {
    general.recover(req, res, Admin)
}