Accounts.ui.config({
	requestPermissions: {
		facebook: ['email','user_about_me']
	},
	extraSignupFields: [{
		fieldName: 'name',
		fieldLabel: 'Nome'
	}]
});