var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/xcxerxes_blog')
mongoose.Promise = global.Promise
module.exports = mongoose