var postDao = require('../dao/post');
var util = require('../util');
var moment = require('moment');
var config = require('../config').config;

exports.index = function(req, res) {
	res.render('page/index', {});
};

exports.posts = function(req, res) {
	var currentPage = req.params.page ? req.params.page : 1;

	postDao.countAll(function(err, count) {
		if (err) util.sendSysError(500, err, res);
		else {
			getPostList(0, count);
		}
	});

	var getPostList = function(start, count) {
		var start = (currentPage - 1) * config.pageSize;
		postDao.getAll(start, config.pageSize, function(err, rst) {
			if (err) util.sendSysError(500, err, res);
			else {
				var pages = Math.ceil(count / config.pageSize);
				for (var i = 0; i < rst.length; i++) {
					rst[i].content = shortenContent(rst[i].content, rst[i].slug);
				}
				res.render('page/posts', {
					posts: rst,
					pages: pages,
					currentPage: currentPage
				});
			}
		});
	};

	var shortenContent = function (content, slug) {
		if (content.indexOf('<!--more-->') > 0) {
			content = content.substring(0, content.indexOf('<!--more-->')) +
				'<p><a href="/post/' + slug + '" class="more">' + res.__('more') + '></a></p>';
		}

		return content;
	};
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