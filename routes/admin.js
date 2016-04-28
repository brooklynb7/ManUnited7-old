'use strict';

var adminDao = require('../dao/admin');
var postDao = require('../dao/post');
var util = require('../util');
var moment = require('moment');
var config = require('../config').config;
var fs = require('fs');

var url_admin = '/admin';
var url_admin_login = '/admin/login';
var url_admin_install = '/admin/install';
var url_admin_profile = '/admin/profile';
var url_admin_post_list = '/admin/post';
var view_admin = 'admin/index';
var view_admin_login = 'admin/login';
var view_admin_install = 'admin/install';
var view_admin_profile = 'admin/profile';
var view_admin_post_list = 'admin/postList';
var view_admin_post_new = 'admin/postNew';
var view_admin_post_edit = 'admin/postEdit';
var view_admin_timeline = 'admin/timeline';

exports.auth_admin = function(req, res, next) {
	if (req.session.admin_id) {
		return next();
	} else {
		res.redirect(url_admin_login);
	}
};

exports.login = function(req, res) {
	if (req.session.admin_id) {
		res.redirect(url_admin);
	} else {
		res.render(view_admin_login, {
			errorMsg: req.flash('errorMsg')
		});
	}
};

exports.logout = function(req, res) {
	req.session.admin_id = null;
	req.session.admin_name = null;
	res.redirect(url_admin);
};

exports.doLogin = function(req, res) {
	var user = req.body.user;
	var password = util.md5(req.body.password);
	adminDao.getAdmin(user, password, function(err, result) {
		if (err) {
			util.sendSysError(500, err, res);
		} else {
			if (result) {
				req.session.admin_id = result._id.toString();
				req.session.admin_name = result.name;
				res.redirect(req.headers.referer);
			} else {
				req.flash('errorMsg', res.__('wrongUserPassword'));
				res.redirect(url_admin_login);
			}
		}
	});
};

exports.install = function(req, res) {
	adminDao.getAllAdmin(function(err, admins) {
		if (err) {
			util.sendSysError(500, err, res);
		} else {
			if (admins.length > 0) {
				if (req.query.msg === 'success') {
					res.render(view_admin_install, {
						msg: 'success'
					});
				} else {
					res.render(view_admin_install, {
						installed: true
					});
				}
			} else {
				res.render(view_admin_install, {});
			}
		}
	});
};

exports.doInstall = function(req, res) {
	var user = req.body.user;
	var password = util.md5(req.body.password);
	adminDao.insertAdmin(user, password, function(err, rst) {
		if (err) {
			util.sendSysError(500, err, res);
		} else {
			res.redirect(url_admin_install + '?msg=success');
		}
	});
};

exports.index = function(req, res) {
	res.render(view_admin, {});
};

exports.profile = function(req, res) {
	res.render(view_admin_profile, {
		errorMsgForChangePwd: req.flash('errorMsgForChangePwd'),
		successChangePwd: req.flash('successChangePwd')
	});
};

exports.doChangePwd = function(req, res) {
	var currentPwd = util.md5(req.body.currentPwd);
	var newPwd = util.md5(req.body.newPwd);
	var adminId = req.session.admin_id;
	adminDao.getAdminById(adminId, function(err, admin) {
		if (err) {
			util.sendSysError(500, err, res);
		} else {
			if (admin) {
				if (admin.password === currentPwd) {
					adminDao.changePwd(adminId, newPwd, function(err, rst) {
						if (err) {
							util.sendSysError(500, err, res);
						} else {
							req.flash('successChangePwd', res.__('successChangePwd'));
							res.redirect(url_admin_profile);
						}
					});
				} else {
					req.flash('errorMsgForChangePwd', res.__('wrongCurrentPassword'));
					res.redirect(url_admin_profile);
				}
			}
		}
	});
};

exports.postList = function(req, res) {
	postDao.getList(function(err, rst) {
		if (err) {
			util.sendSysError(500, err, res);
		} else {
			res.render(view_admin_post_list, {
				postList: rst
			});
		}
	});
};

exports.postNew = function(req, res) {
	res.render(view_admin_post_new, {});
};

exports.postEdit = function(req, res) {
	postDao.findById(req.params.id, function(err, rst) {
		if (err) util.sendSysError(500, err, res);
		else {
			res.render(view_admin_post_edit, {
				post: rst
			});
		}
	});
};

exports.timeline = function(req, res) {
	var timeline_data = fs.readFileSync('./data/timeline.js', 'utf-8');
	res.render(view_admin_timeline, {
		timeline_list: timeline_data
	});
};
