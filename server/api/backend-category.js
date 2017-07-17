var moment = require('moment')
var mongoose = require('../mongoose')
var Category = mongoose.model('Category')
const general = require('./general')

/**
 * 管理时，获取分类列表
 * @method
 */

exports.getList = (req, res) => {
    Category.find().sort('-cate_order').exec()
        .then(result => {
            res.json({
                code: 200,
                data: {
                    list: result
                }
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}

/**
 * 获取单个分类
 */

exports.getItem = (req, res) => {
    general.item(req, res, Category)
}

/**
 * 添加分类
 */

exports.insert = (req, res) => {
    var cate_name = req.body.cate_name
    var cate_order = req.body.cate_order
    console.log(cate_name+'cate_name================================')
    console.log(cate_order+'cate_order================================')
    return Category.createAsync({
        cate_name,
        cate_order,
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        timestamp: moment().format('X')
    }).then(result => {
        res.json({
            code: 200,
            message: '添加成功',
            data: result._id
        })
    })
}

/**
 * 删除分类
 */
exports.deletes = (req, res) => {
    general.deletes(req, res, Category)
}

/**
 * 编辑
 * 
 */

exports.recover = (req, res) => {
    general.recover(req, res, Category)
}

/**
 * 修改
 */

exports.modify = (req, res) => {
    var _id = req.body.id;
    var cate_name = req.body.cate_name;
    var cate_order = req.body.cate_order;

    general.modify(res, Category, _id, {
        cate_name,
        cate_order,
        update_date: moment().format('YYYY-MM-DD HH:mm:ss')
    })
}