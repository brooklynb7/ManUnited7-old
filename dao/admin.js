var db = require('../config').db;
db.bind("admin");

exports.getAdmin = function(user, pwd, callback) {
	db.admin.findOne({
		name: user,
		password: pwd
	}, callback);
};

exports.getAllAdmin = function(callback) {
	db.admin.find({}).toArray(callback);
};

exports.insertAdmin = function(user, pwd, callback) {
	this.checkAdminName(user, function(err, admin) {
		if (err) {
			callback(err, admin);
		} else {
			if (!admin) {
				db.admin.save({
					name: user,
					password: pwd,
					create_time: new Date().getTime()
				}, callback);
			} else {
				admin.exsited = true;
				callback(err, admin);
			}
		}
	});
};

exports.checkAdminName = function(name, callback) {
	db.admin.findOne({
		name: name
	}, callback);
};

exports.getAdminById = function(adminId, callback) {
	db.admin.findOne({
		_id: db.ObjectID.createFromHexString(adminId)
	}, callback);
};

exports.changePwd = function(adminId, pwd, callback) {
	db.admin.update({
		_id: db.ObjectID.createFromHexString(adminId)
	}, {
		$set: {
			password: pwd
		}
	}, callback);
};