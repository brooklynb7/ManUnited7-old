/*
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var config = require('./config').config;
var i18n = require('./config').i18n;
var flash = require('connect-flash');

var app = express();
var view_path = __dirname + '/views';
var favicon_path = __dirname + '/public/images/ico/united_32X32.ico';
var static_path = __dirname + '/public';

// all environments
app.set('port', config.port);
app.engine('.html', require('ejs').__express);
app.set('views', view_path);
app.set('view engine', 'html');

app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	secret: config.session_secret,
	maxAge  : new Date(Date.now() + 7200000), //1 Hour
    expires : new Date(Date.now() + 7200000), //1 Hour
}));

app.use(flash());
app.use(i18n.init);
app.locals.title = config.title;
app.locals.brand = config.title;
app.locals.timeFormat1 = config.timeFormat1;
app.locals.weibo = config.weibo;
app.use(function(req, res, next) {
	res.locals.i18nlocale = req.cookies.i18nlocale;
	res.locals.session = req.session;
	res.locals.moment= require('moment');
	res.locals.moment.lang(res.locals.i18nlocale);
	next();
});

app.use(express.favicon(favicon_path));
app.use('/resources', express.static(static_path));

//app.set("env","production");

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
	app.use(express.logger("dev"));
}

//production only
if ('production' == app.get('env')) {
	app.use(express.logger());
}

app.use(app.router);

routes(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});