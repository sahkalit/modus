Template.header.helpers({
	'hasNewMessages': function() {
		return Messages.find({notRead: {$in: [Meteor.userId()]}}).count() > 0;
	}
});