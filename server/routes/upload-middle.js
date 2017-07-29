const multer = require('multer')
const path = require('path')
/**
 * multer 上传图片 中间件
 */


 /**
  * 存储路径
  */
 class StorageDir{
  constructor(options) {
    this.options = options
    this.dirPath = this.options.dirPath
  }
  diskStorage () {
    const self = this
    return multer.diskStorage({
      destination: function(req, file, callback) {
        callback(null, self.dirPath)
      },
      filename:  function(req, file, callback) {
        callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
      }
    })
  }
 }

 const middleUpload = multer({
   storage: new StorageDir({
     dirPath: path.join(__dirname, '../../', 'static/images')
   }).diskStorage()
 }).array('bankend', 3)

 module.exports = middleUpload
