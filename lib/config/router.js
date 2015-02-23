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

Router.route('/settings', {
	name: 'upSettings',	
	waitOn: function() {
		return Meteor.subscribe('images');
	},
	data: function() {
		return Meteor.user();
	}
});

Router.route('/chats', {
	name: 'chats',	
	waitOn: function() {
		return Meteor.subscribe('chats');
	},
	fastRender: true,
	data: function() {
		if (! Chats.findOne())
			return {};

		return {
			chatsList: function() { return Chats.find({}, {sort: {modifiedAt: -1}}) },
			chat: function() { return Chats.findOne() },
			interlocutor: function() { return Chats.findOne().interlocutor(); }
		}
	}
});

Router.route('/chats/:_id', {
	name: 'chatTalk',
	template: 'chats',
	fastRender: true,
	waitOn: function() {
		return [			
			Meteor.subscribe('chatByUsers', [this.params._id, Meteor.userId()]),
			Meteor.subscribe('chats'),
			Meteor.subscribe('usersByIds', [this.params._id])
		];
	},
	data: function() {
		return {
			chat: function() { return Chats.queries.chatByUsers(Meteor.userId(), [Router.current().params._id, Meteor.userId()]).fetch()[0] },
			interlocutor: function() { return Meteor.users.findOne({ _id: Router.current().params._id}); },
			chatsList: function() { return Chats.find({}, {sort: {modifiedAt: -1}})}
		};
	}
});


Router.route("/:_id", {
	name: "userProfile",
	waitOn: function() {
	 	return Meteor.subscribe('usersByIds', [this.params._id]); 
	},
	data: function() {
		return Meteor.users.findOne({_id: this.params._id});
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
Router.onBeforeAction(requireLogin, {only: ['chats', 'settings']});