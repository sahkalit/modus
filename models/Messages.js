Messages = new Mongo.Collection('messages');

Messages.helpers({
  members: function() {
    return Meteor.users.find(
      {members: {$in: this.members}},
      {fields: publishedFieldsUsers}
    );
  },
  creator: function() {
    return Meteor.users.findOne(
      {_id: this.creatorId},
      {fields: publishedFieldsUsers}
    );
  }
});

Messages.attachSchema(
    new SimpleSchema({
      members: {
        type: [Object],
        denyUpdate: true
      },
      "members.$.userId": {
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
      conversationId: {
        type: String,
        denyUpdate: true
      }
  })
);

publishedFieldsMessages = {
    members: true,
    creatorId: true,
    message: true,
    createdAt: true,
    conversationId: true
};

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
