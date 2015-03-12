Meteor.publish('mapMessages', function () {
	var currDate = new Date();
	currDate.setDate(currDate.getDate() - 1);
	return MapMessages.find();
});
