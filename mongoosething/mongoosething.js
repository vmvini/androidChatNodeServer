/*module.exports.addcontact = function(req, res){
	
	var mongooseTemplate = mongoosething.template({
		model:'UserContacts',
		method:'findOne',
	});


	mongooseTemplate( {arg1:arg1}, searchUser );

	function searchUser(record){
		mongooseTemplate({arg2:arg2}, updateContact);
	}

	function updateContact(record){
		mongooseTemplate({arg3:arg3}, save);
	}

	function save(record){
		res.status(200);
		res.json({success:"success"});

	}



}
*/

module.exports = mongoosething;

module.exports.Template = mongooseTemplate;


function mongooseTemplate(props){

	return function(p_props, next){
		p_props.model = props.model;
		p_props.method = props.method;

		mongoosething(p_props, next);
	};

}



function mongoosething(props, next){

	var mongoose = require('mongoose');

	var model = mongoose.model(props.model);

	model[props.method](props.args, function(err, record){
		if(err){
			sendResponse(res, 500, err);
			return;
		}
		if(!record){
			sendResponse(res, 404, {"msg": props.method + " operation on " + props.model + " failed" });
			return;
		}

		next(record);

	});

}
