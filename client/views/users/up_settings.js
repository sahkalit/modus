Template.upSettings.helpers({
	'email': function() {
		return this.emails.length && this.emails[0].address;
	}
});

Template.upSettings.events({
	'change .upload-photo': function(event, template) {
		FS.Utility.eachFile(event, function(file) {
			Images.insert(file, function (err, fileObj) {
				//If !err, we have inserted new doc with ID fileObj._id, and
				//kicked off the data upload using HTTP
			});
		});
	},
	'click input.btn-primary': function(e) {
		e.preventDefault();

		Meteor.users.update({_id: Meteor.userId()}, {$set: {
			'profile.firstName': $('input.firstName').val(),
			'profile.lastName': $('input.lastName').val(),
			'profile.organization': $('input.organization').val(),
			'profile.location': $('input.location').val(),
		}});
	}
});