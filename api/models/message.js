var mongoose = require('mongoose');
var UserSchema = require('./user').UserSchema;

var MessageSchema = new mongoose.Schema({

	message: String,
	from: { type: UserSchema }

});

mongoose.model('Message', MessageSchema);

module.exports.MessageSchema = MessageSchema;