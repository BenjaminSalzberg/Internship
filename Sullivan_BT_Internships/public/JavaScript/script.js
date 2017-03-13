// Initialize Firebase
var config = {
	apiKey: "AIzaSyCH9Ip83AVAahbvt7hbVA9OSEbnjnBHNbE",
	authDomain: "internships-1b609.firebaseapp.com",
	databaseURL: "https://internships-1b609.firebaseio.com",
	storageBucket: "internships-1b609.appspot.com",
	messagingSenderId: "820212679716"
};
firebase.initializeApp(config);


$("#Form").submit(function(event) {
		event.preventDefault();
		var form = this;
		var json = ConvertFormToJSON(form);
	    if (!validate(json)) {
	    	alert("Please enter either an email, a phone number, or a fax number.");
	    }

	    if (!json.CompanyName) {
	    	alert("Please enter your company's name.");
	    	return;
	    }

	    //establisher batabase connection to 
		var db = firebase.database().ref('/2017' + json.CompanyName);
		db.set(json).then(function() {
			$("input").attr('disable', true);
			alert("Thank you for submitting!");
		})
		.catch(function(e) {
			alert("We are sorry, your submission could not be saved right now.");console.log("Firebase error:\n" + e)
		});
		

		
});

function validate (json) {
	if (!json.EMail && !json.PhoneNumber && !json.FaxNumber) {
		return false;
	}
	return true;
};
