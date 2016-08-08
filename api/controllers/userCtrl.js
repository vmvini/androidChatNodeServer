var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserContacts = mongoose.model('UserContacts');

//var mongoosething = require('../../mongoosething/mongoosething');

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
				sendResponse(res, 200, {"msg":"user not found!"});
				return;
			}

			//finding target user
			UserContacts.findOne({"user._id":req.body.targetuser}, function(err, targetuser){
				
				if(err){
					sendResponse(res, 500, err);
					return;
				}
				if(!targetuser){
					sendResponse(res, 200, {"msg":"targetuser not found!"});
					return;
				}
				
				innerAddContact(record, targetuser, function(updated){
					innerAddContact(targetuser, updated, function(targetupdated){
						sendResponse(res, 200, updated);
					});
				});

				/*record.contacts.push(targetuser.user);
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
					});*/
				
			});

			function innerAddContact(user, targetUser, success){
				user.contacts.push(targetUser.user);	
				user.save(function(err, updated){

					if(err){
							sendResponse(res, 500, err);
							return;
						}
						if(!updated){
							sendResponse(res, 200, {"msg":"error on updating user contacts"});
							return;
						}

						success(updated);

				});
			}

	});

};

module.exports.login = function(req, res){

	UserContacts.findOne({
		"user.name":req.body.name
	}, function(err, record){
			if(err){
				sendResponse(res, 500, {"err":err, "success":"false"});
				return;
			}
			if(!record){
				sendResponse(res, 200, {"msg":"user not found!", "success":"false"});
				return;
			}

			var user = new User(record.user);
			if( !user.validPassword(req.body.password) ){
				sendResponse(res, 200, {"msg":"invalid password", "success":"false"});
				return;
			}


			sendResponse(res, 200, {"success":"true", "usercontacts":record});
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