Meteor.publish('MessagesNew', function () {
	return Messages.find({
		notRead: {$in: this.userId}
	},  {
		sort: {createdAt: -1}
	});
});

Meteor.publish('messagesByChat', function (chatId, limit) {
	check(chatId, String);
	check(limit, Number);

	return Messages.find({
			chatId: chatId,
			userIds: {$in: [this.userId]}
		}, 
		{
			limit: limit,
			sort: {createdAt: -1}
		}
	);
});