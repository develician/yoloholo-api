const Router = require('koa-router');

const plan = new Router();

const planCtrl = require('./plan.ctrl');

plan.post('/', planCtrl.save);
plan.get('/', planCtrl.getPlanLists);
plan.patch('/', planCtrl.updateDetailPlan);
plan.get('/:id', planCtrl.getDetailPlanList);
module.exports = plan;