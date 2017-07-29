/**
 * 通用上传功能
 */

 module.exports = (req, res) => {
   if (req.files && req.files[0]) {
    res.json({
      code: 200,
      message: 'success',
      files: req.files[0]
    })
   } else {
     res.json({
       code: -200,
       files: '上传失败'
     })
   }
 }