Meteor.publish('chats', function () {
	return Chats.find({
		userIds: {$in: [this.userId]}
		// countMessages: {$gt: 0}
	});
});

Meteor.publish('chatByUsers', function (userIds) {

	var chats = Chats.queries.chatByUsers(userIds);
	if (0 === chats.count()) {
		Chats.insert({
			createdAt: Date.now(),
			modifiedAt: Date.now(),
			userIds: userIds,
			creatorId: this.userId,
			countMessages: 0
		});
	}
	return Chats.queries.chatByUsers(userIds);
});