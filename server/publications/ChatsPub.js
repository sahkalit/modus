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

	var chats = Chats.queries.chatByUsers(this.userId, userIds);
	if (0 === chats.count()) {
		if (Meteor.users.find({_id: {$in: _.uniq(userIds)}}).count() !== _.uniq(userIds).length)
			this.error(404, 'Users [' + userIds.join() + '] not found');

		Chats.insert({
			createdAt: Date.now(),
			modifiedAt: Date.now(),
			userIds: _.uniq(userIds),
			creatorId: this.userId,
			countMessages: 0
		});
	}
	
	return [
		Chats.queries.chatByUsers(this.userId, userIds),
		Meteor.users.find({_id: {$in: userIds}})
	];
});