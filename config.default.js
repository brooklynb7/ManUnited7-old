//mongo troup.mongohq.com:10010/myunited_brooklynb7 -u <user> -p<password>
//mongo troup.mongohq.com:10046/myUnited -u <user> -p<password>
var mongo = {
	"hostname": "",
	"port": "",
	"username": "",
	"password": "",
	"name": "",
	"db": "myUnited"
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
//mongodb settings for appfog mongodb service END

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
	host: "http://www.manunited7.com",
	port: process.env.PORT || 3000,
	session_secret: process.env.SESSION_SECRET || 'q3889a5',
	pageSize: 5,
	timeFormat1: "YYYY/MM/DD HH:mm:ss",
	timeFormat2: "YYYY-MM-DD 00:00:00",
	needProxy: true,
	proxyUrl: '',
	weibo: {
		xmlns_wb: 'xmlns:wb="http://open.weibo.com/wb"',
		app_key: ''
	},
	weixin: {
		token: '',
		msg_type: {
			event: 'event',
			location: 'location',
			text: 'text'
		},
		event: {
			subscribe: 'subscribe'
		}
	},
	twitter: {
		api_host: "",
		consumer_key: "",
		consumer_secret: "",
		access_token: "",
		access_token_secret: ""
	}
};
