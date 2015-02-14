Template.chatTalk.events({
	'click button.ms-message-send': function(e) {
		e.preventDefault();
		
		var message = {
			message: $(e.target).closest('.input-group').find('input.ms-message-text').val(),
			userIds: [Template.currentData().interlocutor()._id, Meteor.userId()],
			chatId: Template.currentData().chat()._id
		};
		Messages.insert(message);
	}, 
	'click .load-more': function (event, instance) {
		event.preventDefault();
		
		var limit = Template.instance().messages.count();
		limit += Template.instance().countOnLoad;
		instance.limit.set(limit);
  }
});

Template.chatTalk.created = function() {
	var instance = this;
	this.countOnLoad = 5;
	this.limit = new ReactiveVar(this.countOnLoad);
	this.ready =  new ReactiveVar(false);

	this.autorun(function() {
		console.log('hello');

		var subscription = Meteor.subscribe('messagesByChat', instance.data.chat()._id, instance.limit.get());

		if (subscription.ready()) {
			instance.ready.set(true);
		} else {
			instance.ready.set(false);
		}
	});
	
	this.messages = Messages.find({chatId: Template.currentData().chat()._id}, {sort: {createdAt: 1}});
}

Template.chatTalk.helpers({
	messages: function() {
		return Template.instance().messages;
	},	
	hasMoreMessages: function() {
		return Template.instance().messages.count() >= Template.instance().limit.get();
	},
	isReady: function() {
		return Template.instance().ready.get();
	}
});