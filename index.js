var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var mimes = require('mimes');

var server = module.exports = http.createServer(handler);

function handler(req, res) {
  var uri = url.parse(req.url).pathname;
  
  if (uri === '/') uri = 'index.html';
  
  var file = path.join(process.cwd(), 'public', uri);

  fs.stat(file, function(err, stats) {
    if (err) {
      console.log('file does not exist: ' + file);
      res.writeHead(404, mimes.txt);
      res.end('404: not found.');
      return;
    }

    var ext = path.extname(file).split('.')[1];
    res.writeHead(200, mimes[ext]);
    fs.createReadStream(file).pipe(res);
  });
}