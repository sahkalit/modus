Conversations = new Mongo.Collection('conversations');

Conversations.attachSchema(
    new SimpleSchema({
      title: {
        type: String
      },
      members: {
          type: [Object]
      },
      "members.$.userId": {
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

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Conversations.allow({
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
