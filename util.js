var crypto = require('crypto');
var moment = require('moment');
var config = require('./config').config;

exports.md5 = function(text) {
	return crypto.createHash('md5').update(text).digest('hex');
};

exports.random = function(upper, floor) {
	upper = typeof upper === 'number' ? upper : 100;
	floor = typeof floor === 'number' ? floor : 0;
	return parseInt(Math.random() * (upper - floor + 1) + floor);
};

exports.sendSysError = function(statueCode, error, response) {
	response.statusCode = statueCode;
	response.send(error);
};
