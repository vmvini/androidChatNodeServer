var router = require('express').Router();


router.post('/login', function(req, res){
	res.json({"msg":"login"});
});

router.post('/register', function(req, res){

	res.json({"msg":"register"});

});

router.get('/users', function(req, res){
	res.json({"msg":"users"});
});

router.post('/addcontact', function(req, res){
	res.json({"msg":"addcontact"});
});

module.exports = router;