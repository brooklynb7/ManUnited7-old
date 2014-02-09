//mongodb settings for appfog mongodb service START
//如果使用 Appfog 自带的 MongoDB服务，请使用以下配置
/*if (process.env.VCAP_SERVICES) {
	var env = JSON.parse(process.env.VCAP_SERVICES);
	var mongo = env['mongodb-1.8'][0]['credentials'];
} else {
	var mongo = {
		"hostname": "localhost",
		"port": 27017,
		"username": "",
		"password": "",
		"name": "",
		"db": ""
	}
}
*/
//mongodb settings for appfog mongodb service END

var mongo = {
	"hostname": "",
	"port": ,
	"username": "",
	"password": "",
	"name": "",
	"db": ""
};

var generate_mongo_url = function(obj) {
	obj.hostname = (obj.hostname || 'localhost');
	obj.port = (obj.port || 27017);
	obj.db = (obj.db || 'test');
	if (obj.username && obj.password) {
		return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
	} else {
		return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
	}
};

var mongoskin = require('mongoskin');
exports.db = mongoskin.db(generate_mongo_url(mongo));

var i18n = require("i18n");
i18n.configure({
	locales: ['zh-cn', 'en'],
	defaultLocale: 'zh-cn',
	directory: './public/locales',
	cookie: "i18nlocale",
	updateFiles: false,
	indent: "\t",
	extension: '.js'
});
exports.i18n = i18n;

exports.config = {
	title: "ManUnited 7",
	port: process.env.PORT || 3000,
	session_secret: process.env.SESSION_SECRET || '',
	timeFormat1: "YYYY/MM/DD HH:mm:ss",
	weibo: {
		xmlns_wb: 'xmlns:wb="http://open.weibo.com/wb"',
		app_key: ''
	},
	weixin: {
		token: '',
		msg_type:{
			event:'event',
			text: 'text'
		},
		event:{
			subscribe:'subscribe'
		}
	}
};