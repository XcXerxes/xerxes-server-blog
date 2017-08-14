const moment = require('moment')
const general = require('./general')
const db = require('../models')
const assertError = require('../utils/asserts')
const utils = require('../utils')

// 关联 category表 和 article表
db.article.belongsTo(db.category)

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
 * @method getList
 */

exports.getList = (req, res) => {
    const { limit, page, sort } = req.query
    let params = utils.parsePagination({ limit, page, sort })
    db.article.findAndCountAll(Object.assign(params, {
        include: [db.category],
        attributes: ['id', 'categoryId', 'title', 'caption', 'visit', 'like', 'createdAt', 'comment_count']
    })).then(result => {
        const { count, rows } = result
        const totalPage = Math.ceil(count / params.limit)
        res.json({
            totalPage,
            code: 200,
            data: rows,
            total: count
        })
    }).catch(err => {
        res.json(assertError(err.toString()))
    })
}

/**
 * 后台管理 获取单篇文章
 * @method getItem
 */
exports.getItem = (req, res) => {
    general.item(req, res, db.article)
}

/**
 * 发布文章
 * @method insert
 */

exports.insert = (req, res) => {
    const { categoryId, title, caption, thumb, html } = req.body
    if (!categoryId || !title || !caption || !thumb || !html) {
        return res.json(assertError('参数错误'))
    }
    db.article.create({
        title,
        caption,
        thumb,
        html: marked(html),
        categoryId
    }).then(result => {
        res.json({
            code: 200,
            message: '添加成功'
        })
    }).catch(err => {
        res.json(assertError(err.toString()))
    })
}

/**
 * 管理文章时，删除文章
 * @method deleteById
 */

exports.deleteById = (req, res) => {
    general.deleteItem(req, res, db.article)
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
 * 更新文章
 * @method update
 * 
 */
exports.update = (req, res) => {
    const { id, categoryId, title, caption, thumb, html } = req.body
    if (!id || !categoryId || !title || !caption || !thumb || !html) {
        return res.json(assertError('参数错误'))
    }
    db.article.update({
        categoryId,
        title,
        caption,
        thumb,
        html,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }, {
            where: { id }
        }).then(() => {
            res.json({
                code: 200,
                message: '更新成功'
            })
        }).catch(err => {
            res.json(assertError(err.toString()))
        })
}

/**
 * 管理时 更新文章
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