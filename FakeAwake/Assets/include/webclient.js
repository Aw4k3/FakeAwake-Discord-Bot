const FileSystem = require('fs');
const WebRequest = require('request');
const Utils = require('./utils.js');

exports.DownloadFile = function (uri, filename, callback) {
    WebRequest.head(uri, function (err, res, body) {
        console.log(Utils.getTimeStamp() + '[Download] content-type:', res.headers['content-type']);
        console.log(Utils.getTimeStamp() + '[Download] content-length:', res.headers['content-length']);

        WebRequest(uri).pipe(FileSystem.createWriteStream(filename)).on('close', callback);
        //WebRequest.on('error', console.log(err));
    });
};