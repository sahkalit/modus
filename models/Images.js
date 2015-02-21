var imageStore = new FS.Store.S3("images", {  
	accessKeyId: "arn:aws:iam::768411740876:user/modus-image", //required if environment variables are not set
	secretAccessKey: "AKIAJCV2LGXP6S2CP7WQ", //required if environment variables are not set
	bucket: "modus-social", //required  
	// The rest are generic store options supported by all storage adapters
	// transformWrite: myTransformWriteFunction, //optional
	// transformRead: myTransformReadFunction, //optional
	// maxTries: 1 //optional, default 5
});

Images = new FS.Collection("images", {
	stores: [imageStore],
	filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});