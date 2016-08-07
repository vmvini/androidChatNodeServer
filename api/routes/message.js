var router = require('express').Router();
var messageCtrl = require('../controllers/messageCtrl');

//api/message

function sendResponse(res, status, json){
	res.status(status);
	res.json(json);
}


router.post('/message', function(req, res){

	if(!req.body.chatId || !req.body.message){
		sendResponse(res, 400, {"msg":"missing parameters"});
		return;
	}

	messageCtrl.sendMessage(req, res);


});

module.exports = router;