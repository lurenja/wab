var xlsx = require('node-xlsx');

exports.readExcel = function (filePath) {
  var uploadDir = 'src/upload/';
    var file = xlsx.parse(uploadDir+filePath);
    var sheet = file[0].data;
    var html = '';
    html = JSON.stringify(sheet);
    return html;
}