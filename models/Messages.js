Messages = new Mongo.Collection('messages');

/**
dburles:collection-helpers
*/
Messages.helpers({
	users: function() {
		return Meteor.users.find(
			{_id: {$in: this.userIds}}
		);
	},
	creator: function() {
		return Meteor.users.findOne(
			{_id: this.creatorId}
		);
	}
});


/**
simple-schema
*/
Messages.attachSchema(
	new SimpleSchema({
		userIds: {
			type: [String],
			denyUpdate: true
		},		
		notRead: {
			type: [String]
		},
		creatorId: {
			type: String,
			denyUpdate: true
		},
		message: {
			type: String
		},
		createdAt: {
			type: Number,
			denyUpdate: true
		},
		chatId: {
			type: String,			
			denyUpdate: true
		}
	})
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
	Messages.allow({
		insert : function (userId, doc) {
			check(userId, String);
			chatUserIds = Chats.findOne(doc.chatId).userIds;
			return (0 === _.difference(chatUserIds, doc.userIds).length) && (doc.userIds.indexOf(userId) !== -1);
		},
		update : function () {
			return false;
		},
		remove : function () {
			return false;
		}
	});
}

Meteor.methods({
	'sendMessage': function(message) {
		check(message, Match.Any);
		
		message.createdAt = Date.now();
		message.creatorId = this.userId;
		message.notRead = _.without(message.userIds,  this.userId);

		Chats.update({_id: message.chatId}, {
			$set: {modifiedAt: Date.now()}, $inc: {countMessages: 1}
		});

		return Messages.insert(message);
	}
});