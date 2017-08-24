const moment = require('moment')
const general = require('./general')
const db = require('../models')
const assertError = require('../utils/asserts')

/**
 * 管理时，获取分类列表
 * @method
 */

exports.getList = (req, res) => {
    general.list(req, res, db.category)
}

/**
 * 分类所有
 * @method getAll
 */

 exports.getAll = (req, res) => {
     general.all(req, res, db.category)
 }

/**
 * 获取单个分类
 */

exports.getItem = (req, res) => {
    general.item(req, res, db.category)
}

/**
 * 添加分类
 * @method insert
 */

exports.insert = (req, res) => {
    const {cate_name, cate_sort} = req.body
    if (!cate_name || !cate_sort) {
        return res.json(assertError('参数错误'))
    }

    console.log(cate_name+'cate_name================================')
    console.log(cate_sort+'cate_sort================================')
    return db.category.create({
        cate_name,
        cate_sort
    }).then(result => {
        res.json({
            code: 200,
            message: '添加成功',
            data: result.id
        })
    }).catch(err => {
        res.json(assertError(err.toString()))
    })
}

/**
 * 删除分类
 * @method deleteById
 */
exports.deleteById = (req, res) => {
    general.deleteItem(req, res, db.category)
}

/**
 * 更新分类
 * @method update
 * 
 */

exports.update = (req, res) => {
    const {id, cate_name, cate_sort} = req.body
    if (!id || !cate_name || !cate_sort) {
        return res.json(assertError('参数错误'))
    }
    db.category.update({
        cate_name,
        cate_sort,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }, {
        where: {id}
    }).then(() => {
        res.json({
            code: 200,
            message: '修改成功'
        })
    }).catch(err => {
        res.json(assertError(err.toString()))
    })
}
