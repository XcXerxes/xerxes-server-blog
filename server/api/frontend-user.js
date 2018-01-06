const db = require('../models')
const assertError = require('../utils/asserts')
const general = require('./general')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const utils = require('../utils')

// 验证secret 是否存在
require('../utils').creatSecret()

// 密钥时间戳
let secret = require('../config/secret.json')['secret_token']

/**
 * 异步验证用户名
 * @method checkUserName
 */
exports.checkUserName = (req, res) => {
  const username = req.query.username || req.body.username || req.params.username
  db.frontUser.findOne({
    where: {
      username
    }
  }).then(data => {
    if (data) {
      return res.json({
        code: 200,
        message: '已存在',
        data: {
          id: data.id
        }
      })
    } else {
      return res.json({
        code: -404,
        message: '不存在',
        data: ''
      })
    }
  }).catch(err => {
    return res.json(assertError(err.toString()))
  })
}

/**
 * 注册账号接口
 * @method register 
 */

exports.register = (req, res) => {
  const { username, password, xc_email} = req.body
   if (!username || !password || !xc_email ) {
    return res.json(assertError('用户名或者密码或者邮箱不能为空！'))
  }
  const client_ip = req.ip.split(':')[req.ip.split(':').length - 1]
  db.frontUser.create({
    username,
    password,
    xc_email,
    client_ip,
    avatar: utils.randomColor()
  }).then(result => {
    res.json({
      code: 200,
      message: '恭喜你! 注册成功',
      data: {
        id: result.id
      }
    })
  }).catch(err => {
    res.json(assertError(err.toString()))
  })
}

/**
 * 登录接口
 * @method login
 */
exports.login = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.json(assertError('用户名或者密码不能为空 '))
  }
  db.frontUser.findOne({
    where: {
      $or: [
        { username },
        { xc_email: username }
      ]
    }
  }).then(result => {
    if (result) {
      if (result.password === password) {
        db.frontUser.update({
          updatedAt: Date.now()
        }, {
          where: {
            username: result.username
          }
        }).then(() => {
          const remember_me =  3600000  // 过期时间 1个小时
          const token = jwt.sign({
            id: result.id,
            username: encodeURI(result.username)
          }, secret.toString(), {
            expiresIn: 60 * 60 * 3 //过期时间为3个小时
          })
          res.cookie('token', token, {maxAge: remember_me})
          res.cookie('login_userid', result.id, {maxAge: remember_me})
          res.cookie('login_username', result.username, {maxAge: remember_me})
          res.json({
            code: 200,
            message: '登录成功',
            data: {
              id: result.id
            }
          })
        })
      } else {
        return res.json(assertError('密码错误'))
      }
    } else {
       return res.json(assertError('用户名不存在'))
    }
  })
}

/**
 * 生成二维码
 * @method getRandomCode
 */
exports.getRandomCode = (req, res) => {
  
}