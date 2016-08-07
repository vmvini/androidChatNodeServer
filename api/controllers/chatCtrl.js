var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserContacts = mongoose.model('UserContacts');
var Chat = mongoose.model('Chat');

function sendResponse(res, status, json){
	res.status(status);
	res.json(json);
}

module.exports.getChat = function(req, res){

	//req.params.user1 || req.params.user2

	Chat.findOne({

		"user1._id": req.params.user1,
		"user2._id": req.params.user2

	}, function(err, record){

		if(err){
			sendResponse(res, 500, {"err":err, "success":"false"});
			return;
		}
		if(!record){
			sendResponse(res, 404, {"msg":"chat not found", "success":"false"});
			return;
		}

		sendResponse(res, 200, {"chat":record, "success":"true"});

	});


};


module.exports.getChatLastMessage = function(req, res){

	Chat.findOne({

		"user1._id": req.params.user1,
		"user2._id": req.params.user2

	}, function(err, record){

		if(err){
			sendResponse(res, 500, err);
			return;
		}
		if(!record){
			//sendResponse(res, 404, {"msg":"chat not found"});
			//return;
		}

		var len = 0;
		if(record && record.messages){
			len = record.messages.length;
			sendResponse(res, 200, record.messages[len-1]);

		}
		else{
			sendResponse(res, 200, {"message":"Inicie uma conversa", "from":null});
		}



	});

};

module.exports.newChat = function(req, res){

	var chat = new Chat(req.body.chat);
	chat.save(function(err, result){

		if(err){
			sendResponse(res, 500, {err:err, "success":"false"});
			return;
		}
		if(!result){
			sendResponse(res, 500, {"msg":"It wasn't possible save this chat", "success":"false"});
			return;
		}
		
		sendResponse(res, 200, {"success":"true", "chat": result});

	});

};