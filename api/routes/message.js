var router = require('express').Router();

//api/message

router.post('/message', function(req, res){
	res.json({"msg":"send message"});
});

module.exports = router;