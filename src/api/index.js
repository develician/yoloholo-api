const Router = require('koa-router');

const api = new Router();

const auth = require('./auth');
const plan = require('./plan');

api.use('/auth', auth.routes());
api.use('/plan', plan.routes());

module.exports = api;