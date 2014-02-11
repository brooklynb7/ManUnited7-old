var page = require('./routes/page');
var user = require('./routes/user');
var api = require('./routes/api');
var admin = require('./routes/admin');
var user = require('./routes/user');
var weixin = require('./routes/weixin');

module.exports = function(app) {
	app.get('/', page.index);
	app.get('/posts/:page?', page.posts);
	app.get('/post/:slug', page.getPostBySlug);
	//app.get('/profile', user.auth_user, page.profile);

	/*admin*/
	app.get('/admin', admin.auth_admin, admin.index);
	app.get('/admin/login', admin.login);
	app.get('/admin/logout', admin.logout);
	app.post('/admin/login', admin.doLogin);
	app.get('/admin/install', admin.install);
	app.post('/admin/install', admin.doInstall);
	app.get('/admin/profile', admin.auth_admin, admin.profile);
	app.post('/admin/changePwd', admin.auth_admin, admin.doChangePwd);
	app.get('/admin/post', admin.auth_admin, admin.postList);
	app.get('/admin/post/new', admin.auth_admin, admin.postNew);
	app.get('/admin/post/edit/:id', admin.auth_admin, admin.postEdit);

	/*api*/
	app.post('/api/post/new', admin.auth_admin, api.doPostNew);
	app.post('/api/post/edit', admin.auth_admin, api.doPostEdit);
	app.post('/api/post/del', admin.auth_admin, api.doPostDel);
	weixin(app);

	app.get('*', page.notFound);	
};