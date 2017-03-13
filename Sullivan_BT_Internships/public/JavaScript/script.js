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

	    //establisher batabase connection to the year/company name
		var db = firebase.database().ref('/2017' + json.CompanyName);
		//send the json to database, then disable the inputs, and alert thank you message
		db.set(json).then(function() {
			$("input").attr('disabled', true);
			alert("Thank you for submitting!");
		}) //if there is an error in writing to the database, this function is run:
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
