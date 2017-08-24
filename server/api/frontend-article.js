const db = require('../models')
const general = require('./general')
const assertError = require('../utils/asserts')
//var Like = mongoose.model('Like')

/**
 * 前台浏览时，获取文章列表
 * @getList
 */

exports.getList = (req,res) =>{
  general.list(req, res, db.article) 
}

/**
 *  前台浏览时， 根据分类id获取 文章列表
 * @method getListByCateId
 */
exports.getListByCateId = (req, res) => {
  const {page, limit, categoryId} = req.query
  limit = parseInt(limit, 10) || 12
  page = parseInt(limit, 10) || 1
  const offset = (page-1) * limit
  db.article.findAndCountAll({
    where: {
      categoryId
    },
    attributes: ['id', 'title', 'caption', 'visit', 'like', 'thumb'],
    limit,
    offset
  }).then(result => {
    const {count, rows} = result
    res.json({
      code: 200,
      data: rows,
      total: count
    })
  }).catch(err => {
    res.json(assertError(err.toString()))
  })
}

/**
 * 前台浏览时， 获取单个文章
 * @method getItem
 */

 exports.getItem = (req, res) => {
   general.item(req, res, db.article)
 }