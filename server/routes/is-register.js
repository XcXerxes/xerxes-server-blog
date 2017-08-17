const db = require('../models')
const assertError = require('../utils/asserts')
module.exports = (req, res, next) => {
  const {username} = req.body
  if (username) {
    db.frontUser.findOne({
      where: {
        username
      }
    }).then(result => {
      if (result) {
        return res.json(assertError('用户名已存在'))
      } 
      next()
    }).catch(err => {
      return res.json(assertError(err.toString()))
    })
  }
}