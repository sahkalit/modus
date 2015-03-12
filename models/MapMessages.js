MapMessages = new Mongo.Collection('mapMessages');

MapMessages.attachSchema(
	new SimpleSchema({		
		creatorId: {
			type: String      
		},
		createdAt: {
			type: Number      
		},
		message: {
			type: String
		},
		lat: {
			type: String
		},
		lng: {
			type: String
		}
	})
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
	MapMessages.allow({
		insert : function () {
			return true;
		},
		update : function () {
			return false;
		},
		remove : function () {
			return false;
		}
	});
}
