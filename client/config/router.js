Router.configure({
    layoutTemplate: 'basicLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});


Router.route('/', {name: 'home'});
Router.route('/home', function(){this.render('home');}, {name: 'home2'});

Router.route("/(.*)", {
    name: "notFound"
});
