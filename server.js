var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser")
var bodyParser = require("body-parser")
var multer  = require('multer')
var upload = multer({ dest: 'static/uploads/' })
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
var fs = require('fs')

//require mogngoose mode
require('./server/models/admin')
require('./server/models/article')
require('./server/models/category')
require('./server/models/user')



//require api routes
var routes = require('./server/routes')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'src')))

app.post('/elupload', multipartMiddleware,function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.files)
   // 获得文件的临时路径
     var tmp_path = req.files.thumbnail.path;
    // 指定文件上传后的目录 - 示例为"images"目录。 
    var target_path = './public/images/' + req.files.thumbnail.name;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
      if (err) throw err;
      // 删除临时文件夹文件, 
      fs.unlink(tmp_path, function() {
         if (err) throw err;
         res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
      });
    });
})

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, sweet-token')
  next()
})

app.use('/xcxerxes', routes)

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err)
})

app.use(function(err, req, res) {
    res.status(err.status || 500)
    res.send(err.message)
})

var port = 8888
app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})