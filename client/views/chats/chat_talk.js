Template.chatTalk.events({
	'click button.ms-message-send': function(e) {
		e.preventDefault();
		var message = {
			message: $(e.target).closest('.input-group').find('input.ms-message-text').val(),
			userIds: [Template.currentData().interlocutor()._id, Meteor.userId()],
			chatId: Template.currentData().chat()._id
		};

		if (! message.message)
			return;

		Meteor.call('sendMessage', message);

		$(e.target).closest('.input-group').find('input.ms-message-text').val('');
		$('body').scrollTop(parseInt($('div.media-list').height()));	
	},
	'keyup input.ms-message-text': function(event, instance) {
		if(event.keyCode == '13'){			
			$('button.ms-message-send').click();
		}
	},
	'click .load-more': function (event, instance) {
		event.preventDefault();
		
		var limit = Template.instance().messages.count();
		limit += Template.instance().limitStep;		

		var subscription = Meteor.subscribe('messagesByChatDiscard', instance.data.chat()._id, limit);
		Template.autorun(function(c) {
			if (subscription.ready()) {
				var message = Messages.findOne({chatId: instance.data.chat()._id}, {sort: {createdAt: 1}});
				instance.discardCreatedAt.set(message.createdAt);

				c.stop();
			}
		});
  }
});

Template.chatTalk.rendered = function() {
	if (! this.data)
		return;

	Meteor.call('messagesNotifyRead', this.data.chat()._id);
};

Template.chatTalk.created = function() {
	var instance = this;
	this.limitStep = 5;
	this.limit = new ReactiveVar(this.limitStep);	
	this.ready =  new ReactiveVar(false);
	this.discardCreatedAt = new ReactiveVar(false);

	if (! instance.data)
		return;

	var subscription = Meteor.subscribe('messagesByChatDiscard', instance.data.chat()._id, instance.limit.get());
	this.autorun(function(c) {			
		if (subscription.ready()) {
			var message = Messages.findOne({chatId: instance.data.chat()._id}, {sort: {createdAt: 1}});	
			if (message)
				instance.discardCreatedAt.set(message.createdAt);
			else {
				var d = new Date();
				d.setDate(d.getDate() - 1);

				instance.discardCreatedAt.set(d.getTime());
			}
			
			c.stop();
		}
	});

	this.autorun(function() {
		if (! instance.discardCreatedAt.get())
			return;

		var subscriptionAll = Meteor.subscribe('messagesByChat', instance.data.chat()._id, instance.discardCreatedAt.get());
		if (subscriptionAll.ready()) {
			instance.ready.set(true);
		} else {			
			instance.ready.set(false);
		}
	});
	
	this.messages = Messages.find({chatId: this.data.chat()._id}, {sort: {createdAt: 1}});
}

Template.chatTalk.helpers({
	messages: function() {
		return Template.instance().messages;
	},	
	hasMoreMessages: function() {
		if (! Template.instance().data)
			return false;

		return Template.instance().messages.count() >= Template.instance().limit.get();
	},
	isReady: function() {
		if (! Template.instance().data)
			return true;

		return Template.instance().ready.get();
	}
});

