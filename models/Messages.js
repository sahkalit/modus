Messages = new Mongo.Collection('messages');

/**
	matb33:collection-hooks 
*/
Messages.before.insert(function(userId, doc) {
	check(arguments, [Match.Any]);
	doc.createdAt = Date.now();
	doc.creatorId = userId;
	doc.notRead = _.without(doc.userIds, userId);	
	// Chats.update(doc.chatId, {
	// 		$inc: {countMessages: 1},
	// 		modifiedAt: Date.now()
	// 	}
	// );
});



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
			check(arguments, [Match.Any]);

			return true;

			check(userId, String);
			chatUserIds = Chats.findOne(doc.chatId).userIds;
			return (0 === _.difference(_.union(chatUserIds, doc.userIds), doc.userIds).length) && (doc.userIds.indexOf(userId) !== -1);
		},
		update : function () {
			check(arguments, [Match.Any]);

			return false;
		},
		remove : function () {
			check(arguments, [Match.Any]);

			return false;
		}
	});
}
