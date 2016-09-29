var express = require('express');
var log4js = require('log4js');
var fs = require('fs');
var url = require('url');
var path = require('path');


// 配置当前web应用 开始 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
var port = process.argv[2] || 3000;   // web服务端口号
var root = process.argv[3] || './web';  // web路径
var fakejs = process.argv[4] || root + "/fake/_urls.js";  // fake js 文件，格式参考: sample/_urls.js

var log = true; // 是否输出控制台信息到logs目录下的文件里
// 配置当前web应用 结束 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  
var app = express();
app.use(express.static(root));

var toFake = function (url, method){return url};
try { toFake = require(fakejs).get; } catch(e){};
function redirect(req, res) {
	var url = toFake(req.url, req.method);
	console.log(req.method + ": " + req.url  + ' => ' + url);
	if (url == req.url) {
		return get(req, res);
	}
	res.redirect(url);
}
app.get('*', redirect);
app.post('*', redirect);


var types = {
    "css": "text/css",
    "gif": "image/gif",
    "htm": "text/html",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

function get(req, res) {
    var pathname = url.parse(req.url).pathname;
    var realPath = root + pathname;

	fs.readFile(realPath, "binary", function (err, file) {
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.write("This request URL " + pathname + " was not found on this server.");
			res.end();
			console.error(req.method + " " + req.url + " " + res.statusCode + " " + " " + res.statusCode);
		} else {
			var ext = path.extname(realPath);
			ext = ext ? ext.slice(1) : 'unknown';
			res.writeHead(200, "OK", {'Content-Type': (types[ext] || "text/plain")});
			res.write(file, "binary");
			res.end();
			console.info(req.method + " " + req.url + " " + res.statusCode);
		}
	});
}
var appenders = [{ type: 'console' }];
if (log) {
	var logpath = "./logs";
	if (!fs.existsSync(logpath)) {
		fs.mkdirSync(logpath);
	}
	logpath += "/" + port;
	if (!fs.existsSync(logpath)) {
		fs.mkdirSync(logpath);
	}
	appenders.push({  
		type: 'dateFile',  
		filename: logpath + "/z.log", 
		pattern: "_yyyyMMdd",  
		maxLogSize: 20480,
		alwaysIncludePattern: false,  
		backups: 10,  
		category: 'Z'  
	});
}
	
log4js.configure({appenders:appenders, replaceConsole: true });
app.use(log4js.connectLogger(log4js.getLogger('Z'), {level:'debug', format:':method :url'}));  


var server = app.listen(port, function () {
  var host = server.address().address;
  console.log('Service started.\n' +
'*************************************************************************\n' +
'Usage: node index [port] [web path] [fake js file path] \n' +
'Sample[default]: ./cmd/node index 3000 ./web \n' +
'Sample: ./cmd/node index 3001 ./web  ./web/fake/_urls.js \n' +
'\n' +
'Server listening on port http://localhost:' + port + '\n' +
'*************************************************************************');
});