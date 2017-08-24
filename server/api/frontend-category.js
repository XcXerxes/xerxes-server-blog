const general = require('./general')
const db = require('../models')
/**
 * 前台 获取所有分类
 * @methods list
 */

 exports.list = (req, res) => {
   general.all(req, res, db.category)
 }