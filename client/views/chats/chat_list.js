Template.chatsList.helpers({
	isCurrent: function() {
		return Template.parentData(2).chat() && (Template.parentData(2).chat().interlocutorId() === this._id);
	}
});