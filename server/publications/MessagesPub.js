Meteor.publish('MessagesNew', function () {
  return Messages.find({
  	"members.userId": {$in: Meteor.userId()},
  	"notRead": {$in: Meteor.userId()}
  },  {
  	fields: publishedFieldsMessages,
  	sort: {createdAt: -1}
  });
});

Meteor.publish('MessagesByConversation', function (conversationId) {
  return Messages.find({
  	"members.userId": {$in: Meteor.userId()},
  	"conversationId": {$in: Meteor.userId()}
  }, {fields: publishedFieldsMessages});
});