window.onload = function() {
		firebase.auth().onAuthStateChanged(user => {
		if(!user) {
			window.location = 'Login_Page.html'; //If User is not logged in, redirect to login page
		}
	});
};