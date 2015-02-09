Meteor.publish("UsersByIds", function(userIds){
	check([String], userIds);
	return Meteor.users.find(
		{_id: {$in: userIds}}, 
		{fields: publishedFieldsUsers}
	)});