Chats = new Mongo.Collection('chats');

Chats.helpers({
	users: function() {		
		return Meteor.users.find({_id: {$in: this.userIds}});
	},
	creator: function() {
		return Meteor.users.findOne({_id: this.creatorId})
	},
	interlocutor: function() {		
		return Meteor.users.findOne({_id: _.without(this.userIds, [Meteor.userId()])[0]}) || Meteor.user();
	}
});

Chats.attachSchema(
	new SimpleSchema({
		userIds: {
			type: [String],
			denyUpdate: true
		},		
		creatorId: {
			type: String,
			denyUpdate: true
		},
		createdAt: {
			type: Number,
			denyUpdate: true
		},
		modifiedAt: {
			type: Number      
		}, 
		countMessages: {
			type: Number
		}
	})
);
	
Chats.queries = {
	chatByUsers: function (userIds) {
		check(userIds, [String]);
		return Chats.find({
			$and: [
				{userIds: {$all: userIds}},
				{userIds: {$size: userIds.length}}
			]
		});
	}
};

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
	Chats.allow({
	insert : function (userId, doc) {
		check(arguments, [Match.Any]);

		return -1 !== doc.userIds.indexOf(userId);
	},
	update : function (userId, doc) {
		check(arguments, [Match.Any]);
		
		return -1 !== doc.userIds.indexOf(userId);
	},
	remove : function () {
		return false;
	}
	});
}
