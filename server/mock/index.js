const db = require('../models')
db.user.sync()
db.article.sync()
db.category.sync().then(() => {
  /* db.category.create({
    cate_name: 'Nodejs',
    cate_sort: 4
  }) */
})
db.comment.sync()
db.admin.sync().then(()=> {
  /* db.admin.create({
    username: 'admin',
    password: '123456',
    confirm_password: '123456',
    client_ip: '10.10.10.2',
    avatar: 'avatar-pink',
    role: 'admin'
  }) */
})
db.frontUser.sync()
