var moment = require('moment')
var mongoose = require('../mongoose')
var Article = mongoose.model('Article')
var Category = mongoose.model('Category')
const general = require('./general')

var marked = require('marked')
var hljs = require('highlight.js')
    // code  高亮
marked.setOptions({
    highlight(code) {
        return hljs.highlightAuto(code).value
    },
    breaks: true
})

/**
 * 管理时，获取文章列表
 * @method 
 */

exports.getList = (req, res) => {
    general.list(req, res, Article)
}

/**
 * 后台管理 获取单篇文章
 */
exports.getItem = (req, res) => {
    general.item(req, res, Article)
}

/**
 * 发布文章
 * 
 */

exports.insert = (req, res) => {
    var categorys = req.body.category
    var content = req.body.content
    var imgName = req.body.imgName
    var html = marked(content)
    var title = req.body.title
    var imgUrl = req.body.imgUrl

    var arr_category = categorys.split('|')
    var category = arr_category[0]
    var category_name = arr_category[1]
    
    var data = {
        title,
        content,
        category,
        imgUrl,
        category_name,
        html,
        visit: 0,
        like: 0,
        comment_count: 0,
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        timestamp: moment().format('X')
    }
    Article.createAsync(data)
        .then(result => {
            return Category.updateAsync({ _id: category }, { '$inc': { 'cate_num': 1 } })
                .then(() => {
                    return res.json({
                        code: 200,
                        message: '发布成功',
                        data: result
                    })
                })
        }).catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}

/**
 * 管理文章时，删除文章
 * 
 */

exports.deletes = (req, res) => {
    var id = req.query.id
    Article.updateAsync({ _id: id }, { is_delete: 1 })
        .then(() => {
            return Category.updateAsync({ _id: id }, { '$inc': { 'cate_num': -1 } })
                .then(reslut => {
                    res.json({
                        code: 200,
                        message: '更新成功',
                        data: result
                    })
                })
        }).catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}

/**
 * 管理时, 恢复文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.recover = (req, res) => {
    var id = req.query.id
    Article.updateAsync({ _id: id }, { is_delete: 0 }).then(() => {
        return Category.updateAsync({ _id: id }, { '$inc': { 'cate_num': 1 } }).then(() => {
            res.json({
                code: 200,
                message: '更新成功',
                data: 'success'
            })
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 管理时 编辑文章
 */

exports.modify = (req, res) => {
    var category = res.body.category;
    var category_old = req.body.category_old;
    var content = req.body.content;
    var html = marked(content)
    var id = req.body.id

    var data = {
        title: req.body.title,
        category: req.body.category,
        category_name: req.body.category_name,
        content,
        html,
        update_date: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    Article.findOneAndUpdateAsync({ _id: id }, data, { new: true }).then(result => {
        if (category !== category_old) {
            Promise.all([
                Category.updateAsync({ _id: category }, { '$inc': { 'cate_num': 1 } }),
                Category.updateAsync({ _id: category_old }, { '$inc': { 'cate_num': -1 } })
            ]).then(() => {
                res.json({
                    code: 200,
                    message: '更新成功',
                    data: result
                })
            })
        } else {
            res.json({
                code: 200,
                message: '更新成功',
                data: result
            })
        }
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}