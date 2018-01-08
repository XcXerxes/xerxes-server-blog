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
  db.admin.create({
    username: 'admin',
    password: '21232F297A57A5A743894A0E4A801FC3',
    role: 'admin'
  })
})
db.frontUser.sync()
