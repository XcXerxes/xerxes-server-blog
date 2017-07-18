"use strict"

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// 定义 models 目录下所有的数据模型，同时映射到数据表中
let db = {}
const dirNames = fs.readdirSync(__dirname)
dirNames.filter(file => (file.includes('.') && (file !== 'index.js')))
  .forEach(file => {
    console.log("file====="+file)
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize

  module.exports = db