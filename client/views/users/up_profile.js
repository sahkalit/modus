Template.userProfile.helpers({
	isCurrentUserProfile: function() {
		if (Meteor.userId() === this._id)
			return true;
		return false;
	}
});