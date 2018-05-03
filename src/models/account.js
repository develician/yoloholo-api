const mongoose = require('mongoose');

const { Schema } = mongoose;

const crypto = require('crypto');
const { generateToken } = require('lib/token');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

Account.statics.findByUsername = function(username) {
    return this.findOne({'username': username}).exec();
}

Account.statics.signup = function({username, email, password}) {
    const account = new this({
        username,
        email,
        password: hash(password)
    });
    return account.save();
}


Account.methods.validatePassword = function(password) {
    const hashed = hash(password);
    return this.password === hashed;
}

Account.methods.generateToken = function() {
    const payload = {
        _id: this._id,
        username: this.username
    };

    return generateToken(payload, 'account');
}

module.exports = mongoose.model('Account', Account);