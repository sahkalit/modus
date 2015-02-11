Meteor.publish('MessagesNew', function () {
	return Messages.find({
		notRead: {$in: this.userId()}
	},  {
		sort: {createdAt: -1}
	});
});

Meteor.publish('messagesByUsers', function (userIds) {
	return Messages.find({
		userIds: {$in: this.userId()},
		chatId: chatId
	});
});