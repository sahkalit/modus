// Define App Constants

if (Meteor.App) {
	throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
	URL: 'http://192.168.56.10:3000/',
	NAME: 'ModusMap',
	DESCRIPTION: 'Social networking map',
	AUTHORS: 'Alexander Yushchenko <sahkaa@gmail.com>'
};