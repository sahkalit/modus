Accounts.ui.config({  
 	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL',
 	requestPermissions: {},
	extraSignupFields: [{
		fieldName: 'firstName',
		fieldLabel: 'First name',
		inputType: 'text',
		visible: true,
		saveToProfile: true
	}, {
		fieldName: 'lastName',
		fieldLabel: 'Last name',
		inputType: 'text',
		visible: true,
		saveToProfile: true
	}]
});