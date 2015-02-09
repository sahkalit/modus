Conversations = new Mongo.Collection('conversations');

Conversations.helpers({
  members: function() {
    return Meteor.users.find({members: {$in: this.members}});
  },
  creator: function() {
    return Meteor.users.findOne({_id: this.creatorId})
  }
});

Conversations.attachSchema(
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
