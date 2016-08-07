var router = require('express').Router();
var chatCtrl = require('../controllers/chatCtrl');


//api/chat
function sendResponse(res, status, json){
	res.status(status);
	res.json(json);
}

router.get('/chat/lastmessage/:user1/:user2', function(req, res){

	if(!req.params.user1 || !req.params.user2){
		sendResponse(res, 400, {"msg":"missing parameters"});
		return;
	}

	chatCtrl.getChatLastMessage(req, res);

});

router.get('/chat/:user1/:user2', function(req, res){

	if(!req.params.user1 || !req.params.user2){
		sendResponse(res, 400, {"msg":"missing parameters"});
		return;
	}
	chatCtrl.getChat(req, res);

});

router.post('/chat', function(req, res){

	if(!req.body.chat){
		sendResponse(res, 400, {"msg":"missing parameters"});
		return;
	}

	chatCtrl.newChat(req, res);


});

module.exports = router;