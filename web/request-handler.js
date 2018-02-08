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
    helpers.getData(req, function (data) {
      data = data.slice(4);
      archive.isUrlInList(data, function(isInList) {
        if (!isInList) {
          archive.addUrlToList(data);
          fs.readFile(__dirname + '/public/loading.html', function(error, data) {
            res.writeHead(302, helpers.headers);
            res.end(data);
            
          });
          
        } else {
          archive.isUrlArchived(data, function(isArchived) {
            if (!isArchived) {
              fs.readFile(__dirname + '/public/loading.html', function(error, data) {
                console.log(__dirname);
                res.writeHead(302, helpers.headers);
                res.end(data);
              });
            } else {
              helpers.serveAssets(res, data);
            }
          });
        } 
      });
    });
  }
//res.end(archive.paths.list);
};
