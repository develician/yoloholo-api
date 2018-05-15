const Router = require('koa-router');

const upload = new Router();

const uploadCtrl = require('./upload.ctrl');

upload.post('/', uploadCtrl.upload);
upload.get('/', uploadCtrl.test);
// plan.post('/', planCtrl.save);
// plan.get('/', planCtrl.getPlanLists);
// plan.patch('/', planCtrl.updateDetailPlan);
// plan.get('/:id', planCtrl.getDetailPlanList);
module.exports = upload;