Meteor.publish('chats', function () {
	return Chats.find({
		"userIds": {$in: this.userId()}
	});
});

Meteor.publish('chatByUsers', function (userIds) {
	return Chats.queries.chatByUsers(userIds);
});