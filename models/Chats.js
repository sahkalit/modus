Chats = new Mongo.Collection('chats');

Chats.helpers({
	users: function() {
		return Meteor.users.find({_id: {$in: this.userIds}});
	},
	creator: function() {
		return Meteor.users.findOne({_id: this.creatorId})
	},
	interlocutor: function() {
		return Meteor.users.findOne({_id: _.without(this.userIds, [Meteor.userId()])[0]});
	}
});

Chats.attachSchema(
	new SimpleSchema({
		userIds: {
		type: [Object]
		},
		"userIds.$": {
		type: String
		},
		creatorId: {
		type: String
		},
		createdAt: {
		type: Date,
		denyUpdate: true
		},
		modifiedAt: {
		type: Date      
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
	insert : function () {
		return false;
	},
	update : function () {
		return false;
	},
	remove : function () {
		return false;
	}
	});
}
