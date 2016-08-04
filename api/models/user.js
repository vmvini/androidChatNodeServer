var mongoose = require('mongoose');
var crypto = require('crypto');
//var jwt = require('jsonwebtoken');
//var keys = require('../config/secret');

var UserSchema = new mongoose.Schema({

	name: {type: String, required:true},
	color: {type: Number },
	hash: String, 
	salt: String

});

var UserContactsSchema = new mongoose.Schema({

	user: { type: UserSchema },
	contacts: [UserSchema]

});

UserSchema.methods.setPassword = function(password){
	//One-way password encryption
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64 ).toString('hex');
};

UserSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return hash === this.hash;
};

mongoose.model('User', UserSchema);
mongoose.model('UserContacts', UserContactsSchema);

module.exports.UserSchema = UserSchema;

