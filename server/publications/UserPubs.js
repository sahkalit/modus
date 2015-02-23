Meteor.publish("usersByIds", function(userIds){	
	check(userIds, [String]);
	
	return Meteor.users.find(
		{ _id: {$in: userIds} }
	)
});


Meteor.publish("usersNear", function(){	
	return Meteor.users.find();
});


Meteor.publish("images", function(){
	return Images.find();
});