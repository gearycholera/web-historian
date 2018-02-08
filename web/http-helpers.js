var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if (asset === '/index.html') {
    fs.readFile(__dirname + '/public/index.html', function(error, data) {
      if (error) {
        console.log('ERROR!');
      } else {
        exports.headers['Content-Type'] = 'text/html';
        res.writeHead(200, exports.headers);
        res.end(data);
        return res;
      }
    });
  } else {
    fs.readFile(archive.paths.archivedSites + '/' + asset, 'utf8', function(error, data) {
      console.log(archive.paths.archivedSites + asset);
      if (error) {
        exports.headers['Content-Type'] = 'text/html';
        res.writeHead(404, exports.headers);
        res.end();
      } else {
        exports.headers['Content-Type'] = 'text/html';
        res.writeHead(200, exports.headers);
        res.end(data);
        return res;
      }
    });
  }
};

exports.getData = function(req, cb) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    cb(data);
  });
};



// As you progress, keep thinking about what helper functions you can put here!
