Router.configure({
    layoutTemplate: 'basicLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});


Router.route('/', {name: 'home'});
Router.route('/messages', {name: 'messages'});

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