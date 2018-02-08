var path = require('path');
var urlParser = require('url');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var parts = urlParser.parse(req.url);
    if (parts.pathname === '/') {
      parts.pathname = '/index.html';
      helpers.serveAssets(res, parts.pathname);
    } else {
      parts.pathname = req.url;
      helpers.serveAssets(res, parts.pathname);
    }
    


    // } else {
    //   parts.pathname = req.url;
    //   if (archive.isUrlInList(req.url)) {
    //     if (archive.isUrlArchived(req.url)) {
    //       helpers.serveAssets(res, parts.pathname);
    //     } else {
    //       archive.downloadUrls([req.url]);
    //     }
    //   } else {
    //     archive.addUrlToList(req.url);
    //   }
    // }




  } else if (req.method === 'POST') {
    var body = '';

    req.on('data', function(data) {
      body += data;
    });

    req.on('end', function() {
      var url = body.slice(4) + '\n';
      fs.appendFile(archive.paths.list, url, function(err) {
        if (err) {
          console.log('error adding item to list');
        } else {
          console.log('saved to list');
        }
      });
    });
  }
//res.end(archive.paths.list);
};
