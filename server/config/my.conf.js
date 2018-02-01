module.exports = {
  dev: {
    database: 'xcxerxes_blog',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+08:00',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  },
  prod: {
    database: 'xcxerxes',
    username: 'leo',
    password: 'leo_1991!@#$XIA',
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+08:00',
    pool: {
      max: 2,
      min: 0,
      idle: 30000
    }
  }
}