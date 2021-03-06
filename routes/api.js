var postDao = require('../dao/post');
var util = require('../util');

/*REST API for ajax*/
var returnNormalServiceResult = function(res, result, err) {
	if (err) {
		util.sendSysError(500, err, res);
	} else {
		res.setHeader("Content-Type", "application/json");
		res.send({
			result: result
		});
	}
};

exports.doPostNew = function(req, res) {
	var post = getPostObject(req);
	post.create_at = new Date().getTime();

	postDao.getBySlug(post.slug, function(err, rst) {
		if (err) util.sendSysError(500, err, res);
		else {
			if (rst) {
				util.sendSysError(500, res.__('slugExsit'), res);
			} else {
				post.slug = post.slug.toLowerCase();
				postDao.insert(post, function(error, rst) {
					returnNormalServiceResult(res, rst, null);
				});
			}
		}
	});
};

exports.doPostEdit = function(req, res) {
	var id = req.body.postId;
	var post = getPostObject(req);

	postDao.update(id, post, function(error, rst) {
		returnNormalServiceResult(res, rst, error);
	});
};

exports.doPostDel = function(req, res) {
	var id = req.body.postId;
	postDao.del(id, function(error, rst) {
		returnNormalServiceResult(res, rst, error);
	});
};

var getPostObject = function(req) {
	return {
		title: req.body.title,
		slug: req.body.slug,
		short_desc: req.body.short_desc,
		content: req.body.content,
		tag: req.body.tag.split('|'),
		source: req.body.source,
		originalUrl: req.body.originalUrl,
		cover_img: req.body.coverImg,
		visible: parseInt(req.body.visible)
	};
};