Meteor.publish('messagesNew', function () {	
	return Messages.find({ notRead: {$in: [this.userId]}});
});

Meteor.publish('messagesByChatDiscard', function (chatId, limit) {
	check(chatId, String);
	check(limit, Number);
	
	return Messages.find({
		chatId: chatId,
		userIds: {$in: [this.userId]}
	}, {
		limit: 1,
		sort: {createdAt: -1},
		skip: limit
	});
});


Meteor.publish('messagesByChat', function (chatId, createdAt) {
	check(chatId, String);
	check(createdAt, Number);
	
	return Messages.find({
		chatId: chatId,
		userIds: {$in: [this.userId]},
		createdAt: {$gte: createdAt}
	});
});