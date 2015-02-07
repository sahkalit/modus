Meteor.publish('Conversations', function () {
  return Conversations.find();
});
