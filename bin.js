'use strict';

var argv = require('minimist')(process.argv.slice(2));
var grabImage = require('./index.js')({
    file: argv.f,
    folder: argv.d
});
