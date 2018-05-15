const Router = require('koa-router');

const api = new Router();

const auth = require('./auth');
const plan = require('./plan');
const upload = require('./upload');

api.use('/auth', auth.routes());
api.use('/plan', plan.routes());
api.use('/upload', upload.routes());

module.exports = api;