var express = require('express');
var router = express.Router();
var fileUpload = require('./upload');
var excelReader = require('./excel-reader');
var dao = require('./dao');

router.use(function(req, res, next){
    console.log('Request from: '+req.originalUrl);
    next();
});

router.use(express.static('node_modules'));
router.use(express.static('src'));

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/revnue', function(req, res){
  res.render('revnue');
});

router.get('/webcam', function(req, res){
  res.render('web_cam');
});

router.get('/trade_index', function(req, res){
  // var data = dao.loadHist();
  // console.log(JSON.stringify(data));
  res.render('trade_index');
});

router.get('/get_history', function(req, res){
  var data = dao.loadHist(req.query.from, req.query.to, req.query.stock, req.query.category);
  res.send(data);
});

router.get('/trade_upload', function(req, res){
  res.render('trade_upload', {data: 'undefined'});
});

// router.get('/result', function (req, res) {
//     var data = excelReader.readExcel(req.query.file);
//     console.log(req.query.file);
//     res.render('result', { data: data});
// });

router.post('/upload', fileUpload.array('attach', 40), function(req, res, next) {
    var files = req.files
    console.log(files)
    if (!files[0]) {
        console.log('error shows after reading file');
        res.send('error');
    } else {
        var data = excelReader.readExcel(files[0].filename);
        dao.saveHist(data);
        res.render('trade_upload', {data: data});
    }
});

router.get('/savehistory', function(req, res){
  dao.saveHist();
  res.status(200).send('save finish');
});

module.exports = router;