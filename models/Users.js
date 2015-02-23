Meteor.users.helpers({
	'age': function() {		
		if (! this.profile.birthday)
			return;

		var today = new Date();
		var birthDate = new Date(this.profile.birthday);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	},
	'avatarLargeUrl': function() {
		if (! this.profile.avatars.large)
			return;

		return Images.findOne(this.profile.avatars.large).directUrl();
	}
});



Schema = {};

Schema.UserCountry = new SimpleSchema({
	name: {
		type: String
	},
	code: {
		type: String,
		regEx: /^[A-Z]{2}$/
	}
});

Schema.Avatars = new SimpleSchema({
	large: {
		type: String,
		optional: true
	},
	small: {
		type: String,
		optional: true
	}
});

Schema.UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		regEx: /^[a-zA-Z-]{2,25}$/, 
		optional: true
	},
	lastName: {
		type: String,
		regEx: /^[a-zA-Z]{2,25}$/,
		optional: true
	},
	birthday: {
		type: Number,
		optional: true
	},
	gender: {
		type: String,
		allowedValues: ['Male', 'Female'],
		optional: true
	},
	organization : {
		type: String,
		regEx: /^[a-z0-9A-z .]{3,30}$/,
		optional: true
	},
	website: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true
	},
	bio: {
		type: String,
		optional: true
	},
	about: {
		type: String,
		optional: true
	},
	country: {
		type: Schema.UserCountry,
		optional: true
	},
	location: {
		type: String,
		optional: true
	},
	avatars: {
		type: Schema.Avatars,
		optional: true
	}
});

Schema.User = new SimpleSchema({
	username: {
		type: String,
		regEx: /^[a-z0-9A-Z_]{3,15}$/
	},
	emails: {
		type: [Object],
		// this must be optional if you also use other login services like facebook,
		// but if you use only accounts-password, then it can be required
		optional: true
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: Schema.UserProfile,
		optional: true
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	}
});

Meteor.users.attachSchema(Schema.User);



// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
	Meteor.users.allow({
		insert : function (userId, doc) {
			return false;	
		},
		update : function (userId, doc, fieldNames, modifier) {
			check(userId, Match.Any);
			check(doc, Match.Any);
			check(fieldNames, Match.Any);
			check(modifier, Match.Any);

			return doc._id === userId;
		},
		remove : function () {
			return false;
		}
	});
}