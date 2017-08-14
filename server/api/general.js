const utils = require('../utils')
const assertError = require('../utils/asserts')
const moment = require('moment')

/**
 * 通用所有
 * @method all
 */

 exports.all = (req, res, db) => {
     db.findAll().then(result => {
         res.json({
             code: 200,
             message: 'success',
             data: result
         })
     }).catch(err => {
        res.json(assertError(err.toString()))
     })
 }

/**
 * 通用列表
 * @method list 
 * 
 * @param {[type]} req 
 * @param {[type]} res
 * @param {[type]} db
 * 
 * @return {[type]}
 */

exports.list = (req, res, db) => {
    const { limit, page, sort } = req.query
    let params = utils.parsePagination({ limit, page, sort })
    db.findAndCountAll(params).then(result => {
        const {count, rows } = result
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
 * 通用单个
 * @method item
 * @param {[type]} req 
 * @param {[type]} res
 * @param {[type]} db
 * 
 * @return {[type]}
 */

exports.item = (req, res, db) => {
    var id = req.query.id || req.params.id || req.body.id
    if (!id) {
        return res.json(assertError('参数错误 (id is undefined!!)'))
    }
    db.findById(id).then(result => {
        res.json({
            code: 200,
            data: result || {}
        })
    }).catch(err => {
        res.json(assertError(err.toString()))
    })
}

/**
 * 通用删除
 * @method deleteAll
 */

exports.deleteAll = (req, res, db) => {
    db.destroy().then(() => {
        res.json({
            code: 200,
            message: '删除成功'
        })
    }).catch(err => {
        res.json(assertError(err.toString()))
    })
}

/**
 * 通用修改
 * @method modify
 * 
 */

exports.update = (req, res, db) => {
    const  {id} = req.body
    if (!id) {
        return res.json(assertError('参数错误 (id is undefined!!)'))
    }
    db.update(Object.assign({},req.body, {
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }), {
        where: {id}
    }).then(result => {
        res.json({
            code: 200,
            message: '修改成功'
        })
    }).catch(err => {
        res.json(assertError(err.toString()))
    })
}

/**
 * 通用删除单个
 * @method deleteItem
 * 
 */

exports.deleteItem = (req, res, db) => {
    const id = req.query.id || req.params.id || req.body.id
    if(!id) {
        res.json(assertError('参数错误 (id is undefined!!)'))
    }
    db.destroy({
        where: {
            id
        }
    }).then(() => {
        res.json({
            code: 200,
            message: '删除成功',
            data: 'success'
        })
    }).catch(err => {
        res.json(assertError(err.toString()))
    })
}