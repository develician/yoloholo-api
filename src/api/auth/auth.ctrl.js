const Account = require('models/account');
const Joi = require('joi');

exports.login = async (ctx) => {
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required(),
        password: Joi.string().required().min(6)
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        // console.log(result.error.details[0].message);
        ctx.body = {
            error: result.error.details[0].message
        }
        return;
    }

    const { username, password } = ctx.request.body;

    let account = null;

    try {
        account = await Account.findByUsername(username);
    } catch(e){
        ctx.throw(500, e);
    }

    if(!account || !account.validatePassword(password)) {
        ctx.status = 403;
        ctx.body = {
            key: "Please Check Your ID or password"
        };
        return;
    }

    let token = null;
    try {
        token = await account.generateToken();
    } catch(e){
        ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});

    ctx.body = {
        account
    };
}

exports.signup = async (ctx) => {
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        // console.log(result.error.details[0].message);
        ctx.body = {
            error: result.error.details[0].message
        }
        return;
    }

    const { username, email, password } = ctx.request.body;


    let existing = null;
    try {
        existing = await Account.findByUsername(username);
    } catch(e){
        ctx.throw(500, e);
    }

    if(existing) {
        ctx.status = 409;
        ctx.body = {
            key: "username"
        };
        return;
    }

    let account = null;

    try {
        account = await Account.signup({username, email, password});
    } catch(e) {
        ctx.throw(500, e);
    }

    ctx.body = account;
}

exports.logout = (ctx) => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0,
        httpOnly: true
    });

   
    ctx.status = 204;
    ctx.body = {
        success: "true"
    };
    return;
    
}

exports.check = (ctx) => {
    const { user } = ctx.request;
    if(!user) {
        ctx.status = 403; // Forbidden
        ctx.body = {
            error: "token does not exist"
        }
        return;
    }

    ctx.body = user.username;
}