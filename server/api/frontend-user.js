const db = require('../models')
const assertError = require('../utils/asserts')
const general = require('./general')

/**
 * 注册账号接口
 * @method register 
 */

exports.register = (req, res) => {
  const { username, password, xc_email } = req.body
  if (!username || !password || !xc_email) {
    return assertError('用户名或者密码或者邮箱不能为空！')
  }
  db.frontUser.create({
    username,
    password,
    xc_email
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
  const { name, password } = req.body
  if (!name || password) {
    res.json(assertError('用户名或者密码错误'))
  }
  db.frontUser.find({
    where: {
      $or: [
        { username },
        { xc_email: username }
      ]
    }
  }).then(result => {
    if (result) {
      if (result.password === password) {

      } else {
        return res.json(assertError('密码错误'))
      }
    } else {
       return res.json(assertError('用户名不存在'))
    }
  })
}