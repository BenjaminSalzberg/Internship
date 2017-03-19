// Initialize Firebase
const CONFIG = {
	apiKey: "AIzaSyCmKcMKzKroMq2Uli0y7qg0ectcowt0Iy8",
	authDomain: "bt-internships.firebaseapp.com",
	databaseURL: "https://bt-internships.firebaseio.com",
	storageBucket: "bt-internships.appspot.com",
	messagingSenderId: "367923136332"
};
firebase.initializeApp(CONFIG);

$("form").submit(function(event) {
	event.preventDefault();
	let form = this;
	const JSON = ConvertFormToJSON(form);
	
	//validate (check validate() below)
	if (!validate(JSON)) {
		alert("Please enter either an email, a phone number, or a fax number.");
	} else {
		//establishes database connection to the year/company name
		let db = firebase.database().ref('/2017').child(JSON.CompanyName);
		//send the json to database, then disable the inputs, and alert thank you message
		db.set(JSON).then(function() {
			$("input").attr('disabled', true);
			alert("Thank you for submitting!");
		}) //if there is an error in writing to the database, this function is run:
		.catch(function(e) {
			alert("We are sorry, your submission could not be saved right now.");console.log("Firebase error:\n" + e)
		});
	};
});

//makes the form data a json object, with the keys being the element names, and the values being the element values
function ConvertFormToJSON(form){
	let array = jQuery(form).serializeArray();
	let json = {};
	
	jQuery.each(array, function() {
		json[this.name] = this.value || '';
	});
	
	return json;
};

//checks that either the email, phone#, or fax# have been filled in
function validate (json) {
	if (!json.EMail && !json.PhoneNumber && !json.FaxNumber) {
		return false;
	}
	return true;
};

let open = false;
$("input[type='radio'][name='Skill']").change(function () {
	if (this.value == 'yes' && !open) {
		$("#describe").slideDown();
		open = true;
	} else if (this.value == 'no' && open) {
		$("#describe").slideUp();
		open = false;
	}
});
