var express = require('express');
var router = express.Router();


// 后端api
var backendArticle = require('../api/backend-article')
var backendCategory = require('../api/backend-category')
var backendAdmin = require('../api/backend-admin')
var backendUpload = require('../api/bankend-upload')

// 前端api
const frontendUser = require('../api/frontend-user')
const frontendCategory = require('../api/frontend-category')
const frontendArticle = require('../api/frontend-article')

// 中间件 
var isAdmin = require('./is-admin')
var isUser = require('./is-user')

// 上传图片 middle
var middleUpload = require('./upload-middle')

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
 */

// =========================  前台用户 ===============================

// 获取用户列表

// 冻结用户 



// ========================== 文章 =====================

// 获取文章列表
router.get('/backend/article/list', isAdmin, backendArticle.getList)

//获取单篇文章
router.get('/backend/article/:id', isAdmin, backendArticle.getItem)

//发布文章
router.post('/backend/article',isAdmin, backendArticle.insert)

//删除文章
router.delete('/backend/article/:id', isAdmin, backendArticle.deleteById)

//编辑文章
router.post('/backend/article/update', isAdmin, backendArticle.update)

//-------------分类--------------
//获取分类列表
router.get('/backend/cate/list', isAdmin, backendCategory.getList)

// 获取所有分类
router.get('/backend/cate/all', isAdmin, backendCategory.getAll)

//获取单个分类
router.get('/backend/cate/:id', isAdmin, backendCategory.getItem)

//添加分类
router.post('/backend/cate', isAdmin, backendCategory.insert)

//删除分类
router.delete('/backend/cate/:id', isAdmin, backendCategory.deleteById)

//编辑分类
router.post('/backend/cate/update', isAdmin, backendCategory.update)


//-------------- 上传图片 ---------------
router.post('/backend/upload', isAdmin, middleUpload, backendUpload)

//--------------管理-----------------

// 后台登录
router.post('/backend/admin/login', backendAdmin.login)

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
/**
 *  用户
 */
// ------------ 注册登录用户 ------------
router.post('/frontend/user/regist', frontendUser.register)
router.post('/frontend/user/check', frontendUser.checkUserName)
router.post('/frontend/user/login', frontendUser.login)
// 
// ------ 文章 ------
// 前台浏览时, 获取文章列表
router.get('/frontend/article/list', frontendArticle.getList)

// 前台浏览时, 获取单篇文章
router.get('/frontend/article/:id', frontendArticle.getItem)


// ------- 分类 --------
//获取分类列表
router.get('/frontend/cate/list', frontendCategory.list)





router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到页面'
    })
})

module.exports = router