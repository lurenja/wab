var express = require('express');
var parser = require('body-parser');
var excelHandler = require('./excel-handler');
// var excelReader = require('./excel-reader');
var dao = require('./dao');

let uploadFile = (req, res, next) => {
  var file = req.file;
  console.log(file);
  if (!file) {
    res.send('Something wrong while uploading');
  } else {
    var data = excelHandler.read(file.filename);
    res.render('trade_upload_confirm', { pageId: '2', data: data, file: file.filename });
  }
}

let toPage = (res, id, name) => {
  res.render(name, { pageId: id });
}

var router = express.Router();

router.use(function (req, res, next) {
  console.log('Request from: ' + req.originalUrl);
  next();
});

router.use(express.static('node_modules'));
router.use(express.static('src'));
router.use(parser.json()); // for parsing application/json
router.use(parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/revnue', function (req, res) {
  res.render('revnue');
});

router.get('/webcam', function (req, res) {
  res.render('web_cam');
});

router.get('/trade_index', function (req, res) {
  toPage(res, '1', 'trade_index');
  // res.render('trade_index', { pageId: '1' });
});

router.get('/get_history', function (req, res) {
  var data = dao.loadHist(req.query.from, req.query.to, req.query.stock, req.query.category);
  res.send(data);
});

router.get('/trade_upload', function (req, res) {
  toPage(res, '2', 'trade_upload');
  // res.render('trade_upload', {pageId: '2'});
});

router.post('/upload', excelHandler.upload.single('attach'), uploadFile);

router.post('/save_to_db', function (req, res) {
  let data = excelHandler.read(req.body.fileName);
  dao.saveHist(data);
  res.send('ok');
});

module.exports = router;