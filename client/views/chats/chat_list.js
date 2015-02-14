Template.chatsList.helpers({
	isCurrent: function() {
		return Template.parentData().chat() && (Template.parentData().chat()._id === this._id);
	}
});