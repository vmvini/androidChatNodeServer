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
			
			//sendResponse(res, 200, {"msg":"chat not found", "success":"false"});
			//return;
			reverseSearch(req.params.user1, req.params.user2);
		}

		else{
			sendResponse(res, 200, {"chat":record, "success":"true"});
		}

		

	});

	function reverseSearch(user1, user2){

		Chat.findOne({

				"user1._id": user2,
				"user2._id": user1

			}, function(err, record){

				if(err){
					sendResponse(res, 500, err);
					return;
				}
				if(!record){
					sendResponse(res, 200, {"msg":"chat not found", "success":"false"});
					return;
				}
				
				sendResponse(res, 200, {"chat":record, "success":"true"});

						
				
				
		});


	}


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
					reverseSearch(req.params.user1, req.params.user2);

					
				}
				else{
					var len = 0;
					if(record && record.messages){
						len = record.messages.length;
						if(len === 0){
							sendResponse(res, 200, {"message":"Inicie uma conversa", "from":null});
						}
						else{
						sendResponse(res, 200, record.messages[len-1]);
						}

					}
					else{
						sendResponse(res, 200, {"message":"Inicie uma conversa", "from":null});
						
					}
				}
		});
	

	function reverseSearch(user1, user2){

		Chat.findOne({

				"user1._id": user2,
				"user2._id": user1

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


	}


	

};

module.exports.newChat = function(req, res){

	console.log("new chat request");

	console.log(req.body.chat);

	var chatObj = JSON.parse(req.body.chat);


	try{
		var chat = new Chat(chatObj);
		chat.save(function(err, result){
			console.log("callback");
			if(err){
				console.log("err", err);
				sendResponse(res, 500, {err:err, "success":"false"});
				return;
			}
			if(!result){
				console.log("result null");
				sendResponse(res, 500, {"msg":"It wasn't possible save this chat", "success":"false"});
				return;
			}
			
			console.log("success");
			sendResponse(res, 200, {"success":"true", "chat": result});

		});
	}
	catch(e){
		console.log("exception" , e);
	}

};