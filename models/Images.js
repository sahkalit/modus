var imageStore = new FS.Store.S3("images", {  
	accessKeyId: "AKIAJ644ESIAQVY7QPRQ", //required if environment variables are not set
	secretAccessKey: "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", //required if environment variables are not set
	bucket: "modus-avatars", //required 
	ACL: "public-read"
	// region=>'eu-central-1'
	// The rest are generic store options supported by all storage adapters
	// transformWrite: myTransformWriteFunction, //optional
	// transformRead: myTransformReadFunction, //optional
	// maxTries: 1 //optional, default 5
}); 

Images = new FS.Collection("images", {
	stores: [imageStore],
	// stores: [new FS.Store.FileSystem("imagesFs")]

	// filter: {
	//   allow: {
	// 	contentTypes: ['image/*'] //allow only images in this FS.Collection
	//   }
	// }
});

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