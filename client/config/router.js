Router.configure({
	layoutTemplate: 'basicLayout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
	name: 'home',
	waitOn: function() {
		return Meteor.subscribe('usersNear');
	},
	data: function() {
		return Meteor.users.find();
	}
});

Router.route('/users', {
	name: 'users',
  	template: 'users_list',
	waitOn: function() {
		return Meteor.subscribe('usersNear');
	},
	data: function() {
		return Meteor.users.find();
	}
});


Router.route('/chats', {
	name: 'chats',	
	waitOn: function() {
		return Meteor.subscribe('chats');
	},
	data: function() {
		return Chats.find({}, {sort: {modifiedAt: -1}});
	}
});

Router.route('/chats/:username', {
	name: 'chatTalk',
	template: 'chats',
	waitOn: function() {
		return [Meteor.subscribe('chatByUsers', [this.params.username, Meteor.userId()]), Meteor.subscribe('userByUsername', this.params.username)];
	},
	data: function() {
		return {
			chat: return Chats.queries.chatByUsers([this.params.username, Meteor.userId()]),
			interlocutor: return Meteor.users().find({ username: this.params.username});
		};
	}
});


Router.route("/:username", {
	name: "userProfile",
	waitOn: function() {
	 	return Meteor.subscribe('userByUsername', this.params.username); 
	},
	data: function() {
		return Meteor.users.findOne({username: this.params.username});
	}	
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

Router.onBeforeAction('dataNotFound', {only: 'userProfile'});
Router.onBeforeAction(requireLogin, {only: 'chats'});