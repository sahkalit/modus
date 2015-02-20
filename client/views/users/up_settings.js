Template.upSettings.helpers({
	'email': function() {
		return this.emails.length && this.emails[0].address;
	}
});

Template.upSettings.events({
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