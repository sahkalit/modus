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
	}, {
		fieldName: 'terms',
		fieldLabel: 'I accept <a href="/conditions">the terms and conditions</a>',
		inputType: 'checkbox',
		visible: true,
		saveToProfile: false
	}]
});