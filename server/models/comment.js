var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CommentSchema = new Schema({
    article_id: String,
    userid: String,
    username: Number,
    email: String,
    cate_date: String,
    is_delete: Number,
    timestamp: Number
})

var Comment = mongoose.model('Category', CommentSchema)
Promise.promisifyAll(Comment)
Promise.promisifyAll(Comment.prototype)

module.exports = Comment;