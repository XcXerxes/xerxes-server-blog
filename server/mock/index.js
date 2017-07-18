const db = require('../models')
db.user.sync()
db.article.sync()
db.category.sync()
db.comment.sync()
db.admin.sync().then(()=> {
  db.admin.create({
    username: 'admin',
    password: '7a57a5a743894a0e',
    role: 'admin'
  })
})