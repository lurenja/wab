var express = require('express');
var app = express();
var router = require('./router');

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(express.static('src'));
app.use(express.static('node_modules'));

app.use('/', router);

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});