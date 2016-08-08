var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');

function sendResponse(res, status, json){
	res.status(status);
	res.json(json);
}

module.exports.sendMessage = function(req, res){

	//req.body.chatId || !req.body.message

	Chat.findById(req.body.chatId, function(err, chat){
		if(err){
			sendResponse(res, 500, err);
			return;
		}
		if(!chat){
			sendResponse(res, 200, {"msg":"chat not found"});
			return;
		}

		if(!chat.messages){
			chat.messages = [];
		}
		chat.messages.push(req.body.message);

		chat.save(function(err, updated){

			if(err){
				sendResponse(res, 500, err);
				return;
			}
			if(!updated){
				sendResponse(res, 500, {"msg":"chat cant be updated"});
				return;
			}

			sendResponse(res, 200, updated);

		});

	});


};