Template.upSettings.helpers({
	'email': function() {
		return this.emails.length && this.emails[0].address;
	},
	'avatar': function() {
		return this.avatarLargeUrl();
	}
});

Template.upSettings.events({
	'change .upload-photo': function(event, template) {
		FS.Utility.eachFile(event, function(file) {
			var fileObj = Images.insert(file, function(err, res) {
				console.log(res);
				Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.avatars.large": res._id}});
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