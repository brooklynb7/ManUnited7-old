var db = require('../config').db;
db.bind("post");

exports.getList = function(callback) {
	db.post.find({}, {
		"content": 0
	}).sort({
		create_time: -1,
		_id: -1
	}).toArray(callback);
};

exports.getAll = function(callback){
	db.post.find().sort({
		create_time: -1,
		_id: -1
	}).toArray(callback);
};

exports.getBySlug = function(slug, callback) {
	db.post.findOne({
		slug: slug
	}, callback);
};

exports.insert = function(post, callback) {
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

exports.del = function(id, callback){
	db.post.remove({
		_id: db.ObjectID.createFromHexString(id)
	}, callback);
};