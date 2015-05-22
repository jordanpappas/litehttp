var server = require('http').createServer(handler);

var path = require('path');
var url = require('url');
var fs = require('fs');

var mimeTypes = require('mimes');

function handler(req, res) {
  var uri = url.parse(req.url).pathname;

  if (uri === '/') {
    res.writeHead(200, mimeTypes.html);
    fs.createReadStream(
      path.join(process.cwd(), 'public/index.html')
    ).pipe(res);
    return;
  }

  var filename = path.join(process.cwd(), 'public', uri);
  
  fs.exists(filename, function(exists) {
    if (!exists) {
      console.log('file does not exist: ' + filename);
      res.writeHead(404, mimeTypes.txt);
      res.end('404: not found.');
      return;
    }

    var mt = mimeTypes[path.extname(filename).split(".")[1]];
    res.writeHead(200, mt);
    fs.createReadStream(filename).pipe(res);
  });
}

module.exports = server;
