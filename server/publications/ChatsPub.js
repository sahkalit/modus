Meteor.publish('chats', function () {
	var userIds = [];
	Chats.find({
		userIds: {$in: [this.userId]}
		// countMessages: {$gt: 0}
	}).forEach(function(chat) {
		userIds = _.union(chat.userIds, userIds);
	});

	return [
		Chats.find({
			userIds: {$in: [this.userId]}
			// countMessages: {$gt: 0}
		}),
		Meteor.users.find({_id: {$in: userIds}})
	];
});

Meteor.publish('chatByUsers', function (userIds) {
	check(userIds, [String]);
	
	if (-1 === userIds.indexOf(this.userId))
		throw new Meteor.Error(403, 'Cannot create chat for other users');

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

	return [
		Chats.queries.chatByUsers(userIds),
		Meteor.users.find({_id: {$in: userIds}})
	];
});