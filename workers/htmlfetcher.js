// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');

var CronJob = require('cron').CronJob;

new CronJob('50 * * * * *', function() {
  console.log('Every second job');
  // let unArchivedUrls = [];
  archive.readListOfUrls(function(data) {
    data.forEach(function(url) {
      archive.isUrlArchived(url, function(isArchived) {
        if (!isArchived) {
          // unArchivedUrls.push(url);
          archive.downloadUrls([url]);
        }
      });
    });
  });
  // console.log(unArchivedUrls);
  // console.log(typeof(unArchivedUrls[0]));
  // archive.downloadUrls(['www.cnn.com', 'www.google.com']);
  // console.log('JobDone');
  
}, null, true, 'America/Los_Angeles');
