/**
 * 通用列表
 * @method list 
 * 
 * @param {[type]} req 
 * @param {[type]} res
 * @param {[type]} mongoDB
 * 
 * @return {[type]}
 */

exports.list = (req, res, mongoDB) => {
    var limit = parseInt(req.query.limit) || 12;
    var page = parseInt(req.query.page) || 1;

    var skip = (page - 1) * limit
    Promise.all([
        mongoDB.find().sort('-_id').skip(skip).limit(limit).exec(),
        mongoDB.countAsync()
    ]).then(result => {
        var total = result[1];
        var totalPage = Math.ceil(total / limit)
        var json = {
            code: 200,
            data: {
                list: result[0],
                total,
                hasNext: totalPage > page ? 1 : 0,
                hasPrev: page > 1 ? 1 : 0
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

/**
 * 通用单个
 * @method item
 * @param {[type]} req 
 * @param {[type]} res
 * @param {[type]} mongoDB
 * 
 * @return {[type]}
 */

exports.item = (req, res, mongoDB) => {
    var id = req.query.id
    if (!id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    mongoDB.findOneAsync({ _id: id })
        .then(result => {
            res.json({
                code: 200,
                data: result
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}

/**
 * 通用删除
 * @method flagDelete
 */

exports.deletes = (req, res, mongoDB) => {
    var id = req.query.id
    mongoDB.updateAsync({ _id: id }, { is_delete: 1 })
        .then(() => {
            res.json({
                code: 200,
                message: '更新成功',
                data: 'success'
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}

/**
 * 通用修改
 * @method modify
 * 
 */

exports.modify = (res, mongoDB, id, data) => {
    mongoDB.findOneAndUpdateAsync({ _id: id }, data, { new: true })
        .then(result => {
            res.json({
                code: 200,
                message: '更新成功',
                data: result
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}

/**
 * 通用编辑
 * @method recover
 * 
 * 
 */

exports.recover = (req, res, mongoDB) => {
    var id = query.id
    mongoDB.updateAsync({ _id: id }, { is_delete: 0 })
        .then(() => {
            res.json({
                code: 200,
                message: '更新成功',
                data: 'success'
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}