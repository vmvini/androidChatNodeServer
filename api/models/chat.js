var mongoose = require('mongoose');
var MessageSchema = require('./message').MessageSchema;
var UserSchema = require('./user').UserSchema;

var ChatSchema = new mongoose.Schema({

	user1: {type: UserSchema},
	user2: {type: UserSchema},
	messages:[ MessageSchema ]

});

mongoose.model('Chat', ChatSchema );