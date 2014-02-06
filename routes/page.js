var postDao = require('../dao/post');
var util = require('../util');
var moment = require('moment');
var config = require('../config').config;

exports.index = function(req, res) {
	res.render('page/index', {});
};

exports.posts = function(req, res) {
	postDao.getAll(function(err, rst) {
		if (err) util.sendSysError(500, err, res);
		else {
			res.render('page/posts', {
				posts: rst
			});
		}
	});
};

exports.getPostBySlug = function(req, res) {
	postDao.getBySlug(req.params.slug, function(err, rst) {
		if (err) util.sendSysError(500, err, res);
		else {
			res.render('page/post', {
				post: rst
			});
		}
	});
};


// URL: /404
exports.notFound = function(req, res) {
	res.render('page/404', {
		title: res.__('pageNotFount')
	});
};