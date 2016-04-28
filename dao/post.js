'use strict';

var db = require('../config').db;
var config = require('../config').config;
var moment = require('moment');
db.bind('post');

exports.getList = function(callback) {
	db.post.find({}, {
		'content': 0,
		'short_desc': 0
	}).sort({
		'create_at': -1
	}).toArray(callback);
};

exports.getAll = function(skip, limit, callback) {
	db.post.find({
		'visible': 1
	}).sort({
		'create_at': -1
	}).skip(skip).limit(limit).toArray(callback);
};

exports.getTodayList = function(callback) {
	db.post.find({
		'create_at': {
			$gte: new Date(moment().format(config.timeFormat2)).getTime(),
			$lt: new Date(moment().add('days', 1).format(config.timeFormat2)).getTime()
		},
		'visible': 1
	}, {
		'_id': 0,
		'content': 0,
		'short_desc': 0,
		'originalUrl': 0,
		'source': 0,
		'tag': 0,
		'visible': 0
	}).sort({
		'create_at': -1
	}).limit(5).toArray(callback);
};

exports.countAll = function(callback) {
	db.post.count(callback);
};

exports.getBySlug = function(slug, callback) {
	db.post.findOne({
		slug: slug
	}, callback);
};

exports.insert = function(post, callback) {
	post.view = 0;
	post.comments = 0;
	db.post.insert(post, callback);
};

exports.findById = function(id, callback) {
	db.post.findOne({
		_id: db.ObjectID.createFromHexString(id)
	}, callback);
};

exports.update = function(id, post, callback) {
	db.post.update({
		_id: db.ObjectID.createFromHexString(id)
	}, {
		$set: post
	}, callback);
};

exports.del = function(id, callback) {
	db.post.remove({
		_id: db.ObjectID.createFromHexString(id)
	}, callback);
};
