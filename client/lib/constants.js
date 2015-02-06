// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'ModusMap',
  DESCRIPTION: 'Social networking map',
  AUTHORS: 'Alexander Yushchenko <sahkaa@gmail.com>'
};