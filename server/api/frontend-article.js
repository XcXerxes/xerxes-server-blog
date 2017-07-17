var mongoose = require('../mongoose')
var Article = mongoose.model('Article')
//var Like = mongoose.model('Like')

/**
 * 前台浏览时，获取文章列表
 * @getList
 */

exports.getList = (req,res) =>{
  let {by,id,key,limit,page} = req.query

  page = parseInt(page, 12)
  limit = parseInt(limit, 12)
  if(!page) page =1
  if(!limit) limit = 12
  
  var skip = (page-1) * limit
  var data={
    is_delete:0,
    category: id
  }
  var sort = '-update_date'
  var filds = 'title content category category_name visit like comment_count creat_date update_date is_delete timestamp'

  Promise.all([
    Article.find(data).sort(sort).skip(skip).limit(limit).exec(),
    Article.countAsync(data)
  ]).then(([data,total]) => {
    console.log(data)
      var totalPage = Math.ceil(total/limit)
      data = data.map( item=> {
        item.content = item.content.replace(/\W/g,"").substr(0, 200)
        return item
      })
      var json = {
        code: 200,
        data: {
          list :data,
          total,
          hasNext: totalPage > page ? 1 : 0,
          hasPrev: page > 1
        }
      }
      res.json(json)
  }).catch(err => {
    res.json({
      code: -200,
      message:err.toString()
    })
  })
}

/**
 * 获取单篇文章
 */

exports.getItem = (req,res) => {
  var _id = req.query.id;
  if(!_id){
    res.json({
      code: -200,
      message: '参数错误'
    })
  }
  Promise.all([
     Article.findOneAsync({ _id, is_delete: 0 }),
        //Like.findOneAsync({ article_id: _id, user_id }),
     Article.updateAsync({ _id }, { '$inc':{ 'visit': 1 } })
  ]).then(value => {
    let json
    if(!value[0]){
      json = {
        code: -200,
        message: '没有找到该文章'
      }
    } else {
      json = {
        code: 200,
        data: value[0]
      }
    }
    res.json(json)
  }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}