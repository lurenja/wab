var xlsx = require('node-xlsx');
var multer = require('multer');

var uploadPath = 'upload/';

// read excel file content
export let read = (filename): string => {
    var file = xlsx.parse(uploadPath + filename);
    var sheet = file[0].data;
    var html = '';
    html = JSON.stringify(sheet);
    return html;
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
// upload file to specific folder
export let upload = multer({ storage: storage });