const FileStream = require('fs');
const WebRequest = require('request');

exports.DownloadFile = function (uri, filename, callback) {
    WebRequest.head(uri, function (err, res, body) {
        console.log('[Download] content-type:', res.headers['content-type']);
        console.log('[Download] content-length:', res.headers['content-length']);

        WebRequest(uri).pipe(FileStream.createWriteStream(filename)).on('close', callback);
    });
};