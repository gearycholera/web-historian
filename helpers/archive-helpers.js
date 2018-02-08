var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    data = data.split('\n');
    callback(data);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((data) => {
    callback(_.contains(data, url));
  });
};

exports.addUrlToList = function(url, callback) {
//   if (!exports.isUrlInList(url)) {
// }
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    if (err) {
      console.log('err');
    }
    if (callback) {
      callback(url);
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, data) {
    callback(_.contains(data, url));
  });
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    //request('https://google.com', (err, res, body) => console.log(err ? err : 'download'))
    request('https://' + urls[i]).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + urls[i]));
  }
  
  // http.get(-----, function() {
  //   getData(---, function() {
  //     fs.writeFile()
  //   }
  // })
};



