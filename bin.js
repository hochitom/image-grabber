'use strict';

var argv = require('minimist')(process.argv.slice(2));
var grabImage = require('./index.js')({
    file: argv.f,
    folder: argv.p,
    time: argv.t,
    days: argv.w,
    day: argv.d,
    month: argv.m,
    timezone: argv.z
});
