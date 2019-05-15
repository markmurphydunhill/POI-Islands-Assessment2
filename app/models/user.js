'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Boom = require ('boom');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;

};

module.exports = mongoose.model('User', userSchema);