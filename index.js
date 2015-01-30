'use strict';

var fs = require('fs');
var http = require('http');
var mkpath = require('mkpath');
var argv = require('minimist')(process.argv.slice(2));

var counter = 0;
var host = argv.h;
var file = argv.f;
var folder = argv.d || '';

function grabImage() {
    counter++;
    var f = fs.createWriteStream(__dirname + '/data/' + host + '/' + file.replace('.', '_') + '_' + Date.now() + '.jpg');

    var options = {
        host: host,
        port: 80,
        path: '/' + folder + file
    };

    http.get(options,function(res){
        res.on('data', function (chunk) {
            f.write(chunk);
        });

        res.on('end',function() {
            f.end();
            console.log(new Date() + ': saved "' + file +'" from '+ host + ' #' + counter);
        });
    });
};

mkpath('data/' + host, function (err) {
    if (err) throw err;
    
    console.log('Directory structure "data/' + host + '" created');

    setInterval(grabImage, 300000);
    grabImage();
});
