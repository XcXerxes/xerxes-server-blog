var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var AdminSchema = new Schema({
    usernmae: String,
    email: String,
    password: String,
    create_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number
})

var Admin = mongoose.model('Admin', AdminSchema)
Promise.promisifyAll(Admin)
Promise.promisifyAll(Admin.prototype)

module.exports = Admin