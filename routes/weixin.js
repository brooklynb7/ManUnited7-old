var wechat = require('wechat');
var express = require('express');
var config = require('../config').config;

module.exports = function(app) {
	app.use(express.query());
	app.all('/api/weixin', wechat(config.weixin.token, function(req, res) {
		var message = req.weixin;
		if (is_subscribe_event(message)) {
			res.reply('感谢您的关注，我们将竭诚为您提供来自曼联的第一手资讯！');
		} else {
			res.reply('');
		}
	}));
};

var is_subscribe_event = function(message) {
	if (message.MsgType == config.weixin.msg_type.event &&
		message.Event == config.weixin.event.subscribe) {
		return true;
	} else {
		return false;
	}
};