const Router = require('koa-router');

const auth = new Router();

const authCtrl = require('./auth.ctrl');

auth.post('/signup', authCtrl.signup);
auth.post('/login', authCtrl.login);
auth.post('/logout', authCtrl.logout);
auth.post('/check', authCtrl.check);

module.exports = auth;