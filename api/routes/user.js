var router = require('express').Router();
var userCtrl = require('../controllers/userCtrl');

function sendResponse(res, status, json){
	res.status(status);
	res.json(json);
}

router.post('/login', function(req, res){

	if(!req.body.name || !req.body.password ){
		sendResponse(res, 400, {"msg":"name and password is missing!"});
		return;
	}

	userCtrl.login(req, res);	

});

router.post('/register', function(req, res){

	if(!req.body.name || !req.body.password ){
		sendResponse(res, 400, {"msg":"name and password is missing!"});
		return;
	}

	userCtrl.register(req, res);

});

router.get('/users', function(req, res){
	res.json({"msg":"users"});
});

router.post('/addcontact', function(req, res){
	if(!req.body.user || !req.body.targetuser ){
		sendResponse(res, 400, {"msg":"user and targetuser is missing!"});
		return;
	}

	userCtrl.addcontact(req, res);
});

module.exports = router;