var wechat = require('wechat');
var express = require('express');
var config = require('../config').config;
var postDao = require('../dao/post');

module.exports = function(app) {
	app.use(express.query());
	app.all('/api/weixin', wechat(config.weixin.token, function(req, res) {
		var message = req.weixin;
		console.log(message);
		if (is_subscribe_event(message)) {
			res.reply('感谢您的关注，我们将竭诚为您提供来自曼联的第一手资讯！\n\n' +
				'回复 today , 获取当天最新发布的讯息！\n\n' +
				'更多内容请访问<a href="http://www.manunited7.com/">www.manunited7.com</a>！');
		} else if (is_location_event(message)) {
			res.reply(message.Label);
		} else if (is_normal_text(message)) {
			var msg = message.Content;
			if (msg.toLowerCase() == 'today') {
				postDao.getTodayList(function(err, posts) {
					if (err) res.reply('');
					else {
						var msgList = [];
						for (var i = 0; i < posts.length; i++) {
							msgList.push({
								title: posts[i].title,
								description: '',
								picurl: posts[i].cover_img,
								url: config.host + '/post/' + posts[i].slug
							});
						}
						res.reply(msgList);
					}
				});
			} else {
				res.reply('');
			}
		};
	}))
};

var is_subscribe_event = function(message) {
	if (message.MsgType == config.weixin.msg_type.event &&
		message.Event == config.weixin.event.subscribe) {
		return true;
	} else {
		return false;
	}
};

var is_location_event = function(message) {
	if (message.MsgType == config.weixin.msg_type.location) {
		return true;
	} else {
		return false;
	}
};

var is_normal_text = function(message) {
	if (message.MsgType == config.weixin.msg_type.text) {
		return true;
	} else {
		return false;
	}
};