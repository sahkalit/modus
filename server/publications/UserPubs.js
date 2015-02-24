Meteor.smartPublish("usersByIds", function(userIds){	
	check(userIds, [String]);
	this.addDependency('users', ['profile.avatars.large', 'profile.avatars.small'], function(user) {
		return Avatars.find({_id: {$in: [safeRead(user,"profile","avatars","large"), safeRead(user,"profile","avatars","small")]}});
	});
	
	return Meteor.users.find({ _id: {$in: userIds} }, { services: 0 });
});

Meteor.smartPublish("currentUser", function(){	
	this.addDependency('users', ['profile.avatars.large', 'profile.avatars.small'], function(user) {
		return Avatars.find({_id: {$in: [safeRead(user,"profile","avatars","large"), safeRead(user,"profile","avatars","small")]}});
	});
	
	return Meteor.users.find(this.userId, { services: 0 });
});


Meteor.smartPublish('usersNear', function() {
	this.addDependency('users', ['profile.avatars.large', 'profile.avatars.small'], function(user) {
		return Avatars.find({_id: {$in: [safeRead(user,"profile","avatars","large"), safeRead(user,"profile","avatars","small")]}});
	});

	return Meteor.users.find({}, { services: 0 });
});