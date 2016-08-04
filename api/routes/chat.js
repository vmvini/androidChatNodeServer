var router = require('express').Router();

//api/chat

router.get('/chat/lastmessage/:user1/:user2', function(req, res){

	res.json({"msg":"last message"});

});

router.get('/chat/:user1/:user2', function(req, res){
	res.json({"msg":"get chat"});
});

router.post('/chat', function(req, res){

	res.json({"msg":"post chat"});

});

module.exports = router;