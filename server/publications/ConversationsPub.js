Meteor.publish('Conversations', function () {
  return Conversations.find({
  	"members.userId": {$in: Meteor.userId()}
  });
});
