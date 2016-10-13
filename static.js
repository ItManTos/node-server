var express = require('express');

var port = process.argv[2] || 80;   // web服务端口号
var root = process.argv[3] || './web';  // web路径
  
var app = express();
app.use(express.static(root));


var server = app.listen(port, function () {
  var host = server.address().address;
  console.log('Usage: node static [port] [web path]  \n' +
'Sample[default]: ./cmd/node static 80 ./web \n' +
'Service started.\n' +
'' + process.argv.join(" ") + '\n' +
'*************************************************************************\n' +
'Server listening on port http://localhost:' + port + '\n' +
'*************************************************************************');
});