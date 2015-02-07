Messages = new Mongo.Collection('messages');

Messages.attachSchema(
    new SimpleSchema({
      members: {
        type: [Object]
      },
      "members.$.userId": {
        type: String
      },
      creatorId: {
        type: String
      },
      message: {
        type: String
      },
      createdAt: {
        type: Date,
        denyUpdate: true
      }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Messages.allow({
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
