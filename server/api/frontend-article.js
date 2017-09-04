const db = require('../models')
const general = require('./general')
const assertError = require('../utils/asserts')

// 关联分类表
db.article.belongsTo(db.category)

/**
 *  前台浏览时， 根据分类id获取 文章列表
 * @method getListByCateId
 */
exports.getList = (req, res) => {
  let {page, limit, categoryId} = req.query
  limit = parseInt(limit, 10) || 12
  page = parseInt(page, 10) || 1
  const offset = (page-1) * limit
  console.log('offset==='+ offset)
  const params = (categoryId && categoryId !== 'all_001') ? {
    where: {
      categoryId
    },
    attributes: ['id', 'title', 'caption', 'visit', 'like', 'thumb'],
    limit,
    offset
  } : {
    attributes: ['id', 'title', 'caption', 'visit', 'like', 'thumb'],
    limit,
    offset
  }
  db.article.findAndCountAll(params).then(result => {
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
   const id = req.query.id || req.params.id
   if (!id) {
     return res.json(assertError('参数错误'))
   }
   db.article.findOne({
     include: [db.category],
     where: {
       id
     },
     attributes: ['id', 'title', 'categoryId', 'html', 'createdAt', 'updatedAt']
   }).then(result => {
     res.json({
       code: 200,
       message: 'SUCCESS',
       data: result || {}
     })
   }).catch(err => {
     res.json(assertError(err.toString()))
   })
 }