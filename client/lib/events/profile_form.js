Template.profileForm.events({
	"submit form": function(e, template){
		e.preventDefault();
		var inputs = template.findAll("input");
		Meteor.call('profileUpdate', inputs[0].value,inputs[1].value);
		Session.set("editProfile",false);
	}

});