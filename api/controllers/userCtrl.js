var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserContacts = mongoose.model('UserContacts');

function sendResponse(res, status, json){
	res.status(status);
	res.json(json);
}

module.exports.addcontact = function(req, res){

	//user targetuser
	UserContacts.findOne({
		"user._id":req.body.user
	}, function(err, record){
			if(err){
				sendResponse(res, 500, err);
				return;
			}
			if(!record){
				sendResponse(res, 404, {"msg":"user not found!"});
				return;
			}

			//finding target user
			UserContacts.findOne({"user._id":req.body.targetuser}, function(err, targetuser){
				
				if(err){
					sendResponse(res, 500, err);
					return;
				}
				if(!targetuser){
					sendResponse(res, 404, {"msg":"targetuser not found!"});
					return;
				}
				
				record.contacts.push(targetuser.user);
				console.log("adicionou aos contatos");
				
					record.save(function(err, updated){
						if(err){
							sendResponse(res, 500, err);
							return;
						}
						if(!updated){
							sendResponse(res, 404, {"msg":"error on updating your contacts"});
							return;
						}

						sendResponse(res, 200, updated);
						return updated;
					});
				
			});
	});

};

module.exports.login = function(req, res){

	UserContacts.findOne({
		"user.name":req.body.name
	}, function(err, record){
			if(err){
				sendResponse(res, 500, err);
				return;
			}
			if(!record){
				sendResponse(res, 404, {"msg":"user not found!"});
				return;
			}

			var user = new User(record.user);
			if( !user.validPassword(req.body.password) ){
				sendResponse(res, 404, {"msg":"invalid password"});
				return;
			}


			sendResponse(res, 200, record);
	});

};

module.exports.register = function(req, res){

	var user = new User({

		name: req.body.name

	});
	user.setPassword(req.body.password);

	var userContacts = new UserContacts({

		user: user,
		contacts: []

	});


	userContacts.save(function(err, result){

		if(err){
			sendResponse(res, 500, err);
			return;
		}
		if(!result){
			sendResponse(res, 500, {"msg":"It wasn't possible save this user"});
			return;
		}
		
		sendResponse(res, 200, result );
		

	});


};