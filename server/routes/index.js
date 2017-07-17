var express = require('express');
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();

var backendArticle = require('../api/backend-article')
var backendCategory = require('../api/backend-category')
var backendUser = require('../api/backend-user')
var frontendArticle = require('../api/frontend-article')
var isAdmin = require('./is-admin')
var isUser = require('./is-user')

//添加管理员

router.get('/backend', (req, res) => {
    res.render('add-add.html', { title: '添加管理员', message: '' })
})

router.post('/backend', (req, res) => {
    backendUser.insert(req, res)
})

/**
 * API 
 * =======================后台======================
 *  ------文章------------
 */

// 获取文章列表
router.get('/backend/article/list', /*isAdmin,*/ backendArticle.getList)

//获取单篇文章
router.get('/backend/article/item', isAdmin, backendArticle.getItem)

//发布文章
router.post('/backend/article/insert',multipartMiddleware, backendArticle.insert)

//删除文章
router.get('/backend/article/delete', isAdmin, backendArticle.deletes)

//恢复文章
router.get('/backend/article/recover', isAdmin, backendArticle.recover)

//编辑文章
router.post('/backend/article/modify', isAdmin, multipartMiddleware, backendArticle.modify)

//-------------分类--------------
//获取分类列表
router.get('/backend/category/list', backendCategory.getList)

//获取单个分类
router.get('/backend/category/item', backendCategory.getItem)

//添加分类
router.post('/backend/category/insert', multipartMiddleware, backendCategory.insert)

//删除分类
router.get('/backend/category/delete', isAdmin, backendCategory.deletes)

//恢复分类
router.get('/backend/category/recover', isAdmin, backendCategory.recover)

//编辑分类
router.post('/backend/category/modify', isAdmin, multipartMiddleware, backendCategory.modify)

//--------------管理-----------------

// 后台登录
router.post('/backend/admin/login', multipartMiddleware, backendUser.login)
    // 管理列表
router.get('/backend/admin/list', isAdmin, backendUser.getList)
    // 获取单个管理员
router.get('/backend/admin/item', isAdmin, backendUser.getItem)
    // 编辑管理员
router.post('/backend/admin/modify', isAdmin, multipartMiddleware, backendUser.modify)
    // 删除管理员
router.get('/backend/admin/delete', isAdmin, backendUser.deletes)
    // 恢复管理员
router.get('/backend/admin/recover', isAdmin, backendUser.recover)

/*// 用户列表
router.get('/backend/user/list', isAdmin, frontendUser.getList)
    // 获取单个用户
router.get('/backend/user/item', isAdmin, frontendUser.getItem)
    // 编辑用户
router.post('/backend/user/modify', isAdmin, multipartMiddleware, frontendUser.modify)
    // 删除用户
router.get('/backend/user/delete', isAdmin, frontendUser.deletes)
    // 恢复用户
router.get('/backend/user/recover', isAdmin, frontendUser.recover)*/

// ================= 前台 =================
// ------ 文章 ------
// 前台浏览时, 获取文章列表
router.get('/frontend/article/list', frontendArticle.getList)
// 前台浏览时, 获取单篇文章
router.get('/frontend/article/item', frontendArticle.getItem)

//获取分类列表
router.get('/frontend/category/list', backendCategory.getList)



router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到页面'
    })
})

module.exports = router