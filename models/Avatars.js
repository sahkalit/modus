var S3Stores = [
	new FS.Store.S3("avatarsLarge", {
		accessKeyId: Meteor.isServer ? process.env.ACCESS_KEY_ID : '',//required if environment variables are not set
		secretAccessKey: Meteor.isServer ? process.env.SECRET_ACCESS_KEY : '', //required if environment variables are not set
		bucket: "modus-avatars", //required 
		ACL: "public-read",
		region: "us-west-2",
		folder: "avatars/large",
		transformWrite: function(fileObj, readStream, writeStream) {
			gm(readStream, fileObj.name()).autoOrient().resize('170', '170', "^").gravity('Center').extent('170', '170').stream().pipe(writeStream);
		}	
	}),
	new FS.Store.S3("avatarsSmall", {
		accessKeyId: Meteor.isServer ? process.env.ACCESS_KEY_ID : '',//required if environment variables are not set
		secretAccessKey: Meteor.isServer ? process.env.SECRET_ACCESS_KEY : '', //required if environment variables are not set
		bucket: "modus-avatars", //required 
		ACL: "public-read",
		region: "us-west-2",
		folder: "avatars/small",
		transformWrite: function(fileObj, readStream, writeStream) {
			gm(readStream, fileObj.name()).autoOrient().resize('35', '35', "^").gravity('Center').extent('35', '35').stream().pipe(writeStream);
		}	
	})
];

Avatars = new FS.Collection("images", {
	stores: S3Stores
});

FS.File.prototype.directUrl = function(storeName) {
	storeName = storeName || 'avatarsLarge';
	var copy = this.getCopyInfo(storeName);
	if (! copy)
	 	return null;
	var urlHost = 'https://s3-' + Avatars.storesLookup[storeName].region + '.amazonaws.com';
	return urlHost + '/' + [Avatars.storesLookup[storeName].bucket, Avatars.storesLookup[storeName].folder, copy.key].join('/');
};

if (Meteor.isServer) {
	Avatars.allow({
		insert : function (userId, doc) {
			return true;
		},
		update : function () {
			return true;
		},
		remove : function () {
			return false;
		}
	});
}