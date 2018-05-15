require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');


const path = require('path');
const serve = require('koa-static');
const mount = require('koa-mount');

const api = require('./api');
const { jwtMiddleware } = require('lib/token');

const mongoose = require('mongoose');

const {
    PORT: port = 4000,
    MONGO_URI: mongoURI
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
    console.log('mongodb connected');
}).catch((e) => {
    console.error(e);
});

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(koaBody({multipart: true}));
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

app.use(mount('/uploads', serve(path.join(__dirname, './uploads'))));

app.listen(port, () => {
    console.log("app is listening port", port);
});