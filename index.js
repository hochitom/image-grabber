'use strict';

var fs = require('fs');
var http = require('http');
var mkpath = require('mkpath');
var CronJob = require('cron').CronJob

function splitInput (input) {
    input = input.split('/');

    if (input[0] === 'http:') input.splice(0, 1);
    if (input[0] === '') input.splice(0, 1);

    var output = {};
    output.host = input.splice(0,1)[0];
    output.file = input.splice(input.length - 1, 1)[0];
    output.path = input.join('/');

    if (output.path !== '') {
        output.path = '/' + output.path + '/';
    } else {
        output.path = '/';
    }

    return output;
};

function grabImage (conf, folder) {
    var f = fs.createWriteStream(__dirname + '/data/' + folder + '/' + conf.file.replace('.', '_') + '_' + Date.now() + '.jpg');

    var options = {
        host: conf.host,
        port: 80,
        path: conf.path + conf.file
    };

    http.get(options, function (res) {
        res.on('data', function (chunk) {
            f.write(chunk);
        });

        res.on('end', function () {
            f.end();
            console.log(new Date() + ': saved "' + conf.file +'" from '+ conf.host);
        });
    });
};

function startService (opts) {
    var conf = splitInput(opts.file);
    var folder = opts.folder || conf.host;

    mkpath('data/' + folder, '0777', function (err) {
        if (err) throw err;

        console.log('Directory structure "data/' + folder + '" created');

        var time = opts.time ? opts.time.split(":") : ["12","0","0"];
        var days = opts.days || "0-6";
        var day = opts.day || '*';
        var month = opts.month || '*';

        var cronTimeVars = [time[2], time[1], time[0], day, month, days];
        var cronTime = cronTimeVars.join(' ');
        console.log(cronTime);

        var job = new CronJob({
            cronTime: cronTime,
            onTick: function() {
                grabImage(conf, folder);
            },
            start: false,
            timeZone: "Europe/Vienna"
        });

        job.start();
    });
};

module.exports = function (opts) {
    startService(opts);
};
