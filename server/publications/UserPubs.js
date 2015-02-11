Meteor.publish("usersByIds", function(userIds){	
	check(userIds, [String]);
	return Meteor.users.find(
		{ _id: {$in: userIds} }
	)
});

Meteor.publish("userByUsername", function(username){
	check(username, String);

	return Meteor.users.find({ username: username});
});

Meteor.publish("usersNear", function(){	
	return Meteor.users.find();
});