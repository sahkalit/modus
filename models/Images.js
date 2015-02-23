console.log(Meteor.isServer ? process.env.SECRET_ACCESS_KEY : '');
console.log(Meteor.isServer ? process.env.ACCESS_KEY_ID : '');

var imageStore = new FS.Store.S3("images", {


	accessKeyId: Meteor.isServer ? process.env.ACCESS_KEY_ID : '',//required if environment variables are not set
	secretAccessKey:  Meteor.isServer ? process.env.SECRET_ACCESS_KEY : '', //required if environment variables are not set
	bucket: "modus-avatars", //required 
	ACL: "public-read",
	region: "us-west-2",
	// The rest are generic store options supported by all storage adapters
	// transformWrite: myTransformWriteFunction, //optional
	// transformRead: myTransformReadFunction, //optional
	// maxTries: 1 //optional, default 5
});

if (Meteor.isServer) {
	// imageStore.accessKeyId = process.env.ACCESS_KEY_ID, //"AKIAJ644ESIAQVY7QPRQ", //required if environment variables are not set
	// secretAccessKey: process.env.SECRET_ACCESS_KEY, //"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", //required if environment variables are not set
}


Images = new FS.Collection("images", {
	stores: [imageStore]
	// stores: [new FS.Store.FileSystem("imagesFs")]

	// filter: {
	//   allow: {
	// 	contentTypes: ['image/*'] //allow only images in this FS.Collection
	//   }
	// }
});

FS.File.prototype.directUrl = function() {	
	 var copy = this.getCopyInfo('images');
	 if (! copy)
	 	return null;
	 var urlHost = 'https://s3-' + imageStore.region + '.amazonaws.com';
	 return urlHost + '/' + [imageStore.bucket, copy.key].join('/');
};

if (Meteor.isServer) {
	Images.allow({
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