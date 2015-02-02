'use strict';

var fs = require('fs');
var http = require('http');
var mkpath = require('mkpath');
var argv = require('minimist')(process.argv.slice(2));

function splitInput (input) {
    input = input.split('/');

    if (input[0] === 'http:') input.splice(0, 1);
    if (input[0] === '') input.splice(0, 1);

    var output = {};
    output.host = input.splice(0,1)[0];
    output.file = input.splice(input.length - 1, 1)[0];
    output.path = input.join('/');

    return output;
};

var conf = splitInput(argv.f);

function grabImage() {
    var f = fs.createWriteStream(__dirname + '/data/' + conf.host + '/' + conf.file.replace('.', '_') + '_' + Date.now() + '.jpg');

    var options = {
        host: conf.host,
        port: 80,
        path: '/' + conf.folder + conf.file
    };

    http.get(options,function(res){
        res.on('data', function (chunk) {
            f.write(chunk);
        });

        res.on('end',function() {
            f.end();
            console.log(new Date() + ': saved "' + conf.file +'" from '+ conf.host);
        });
    });
};

function startService () {
    mkpath('data/' + conf.host, function (err) {
        if (err) throw err;

        console.log('Directory structure "data/' + conf.host + '" created');

        setInterval(grabImage, 300000);
        grabImage();
    });
};

module.exports = startService();
