Router.configure({
    layoutTemplate: 'basicLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});


Router.route('/', {name: 'home'});
Router.route('/messages', {
	name: 'messages',
	template: 'messages',
	waitOn: function() {
    	return Meteor.subscribe('Conversation');
  	},
  	data: function() {
  		return Conversation.find({}, {sort: {modifiedAt: -1}});
  	}
});

Router.route('/messages/:_id', {
	name: 'chat',
	template: 'messages',
	waitOn: function() {
    	return Meteor.subscribe('MessagesByConversation', this._id);
  	},
  	data: function() {
  		return Messages.find({conversationId: this._id}, {sort: {modifiedAt: -1}});
  	}
});

Router.route("/(.*)", {
    name: "notFound"
});

var requireLogin = function() {
 	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction(requireLogin, {only: 'messages'});