var fs = require('fs');
var excelReader = require('./excel-reader.js');
var multer = require('multer');
var storage = multer.diskStorage({
       destination: function(req, file, cb) {
           cb(null, 'src/upload');
       },
       filename: function(req, file, cb) {
           cb(null, Date.now()+'-'+file.originalname);
       }
});
var mUpload = multer({storage: storage});
module.exports = mUpload;