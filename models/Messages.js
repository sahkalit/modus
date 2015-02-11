Messages = new Mongo.Collection('messages');

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

Messages.attachSchema(
    new SimpleSchema({
      userIds: {
        type: [Object],
        denyUpdate: true
      },
      "userIds.$": {
        type: String
      },
      notRead: {
        type: [Object]
      },
      "notRead.$": {
        type: String
      },
      creatorId: {
        type: String,
        denyUpdate: true
      },
      message: {
        type: String
      },
      createdAt: {
        type: Date,
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
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return false;
    }
  });
}
