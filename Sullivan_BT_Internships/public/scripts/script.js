// Initialise Firebase
const CONFIG = {
	apiKey: "AIzaSyCmKcMKzKroMq2Uli0y7qg0ectcowt0Iy8",
	authDomain: "bt-internships.firebaseapp.com",
	databaseURL: "https://bt-internships.firebaseio.com",
	storageBucket: "bt-internships.appspot.com",
	messagingSenderId: "367923136332"
};
firebase.initializeApp(CONFIG);

let mobile;
$(document).ready(function() {	
	checkWidth();
});

$(window).resize(function() {
	checkWidth();
});

let checkWidth = function () {
	if ($(window).width() <= 992) {
		mobile = true;
	} else {
		mobile = false;
	};
};


/*
 ******************
   Companies Form
 ******************
*/
$("form").submit(function(event) {
	event.preventDefault();

	if (mobile) {
		$("main div#companies").slideUp(800, function () {
			$("main").css("height", "");
			$("main div#companies-submitted").slideDown(600);
		});
	} else {
		$("main").css("height", "");
		$("main div#companies").slideUp(800, function () {
			$("main div#companies-submitted").slideDown(600);
		});
	}

	let form = this;
	const JSON = ConvertFormToJSON(form);
	
	//validate (check validate() below)
	if (!validate(JSON)) {
		$("main div#companies-submitted #loading").slideUp(300, function () {
			$("main div#companies").slideDown(1250);
		});

		alert("Please enter either an email, a phone number, or a fax number.");
	} else {
		//establishes database connection to the year/company name
		let db = firebase.database().ref('2017').child('companies').child(JSON.companyName).child('info');
		//send the json to database, then disable the inputs, and alert thank you message
		db.set(JSON).then(function() {
			$("input").attr('disabled', true);
			alert("Thank you for submitting!");
			$("main div#companies-submitted #loading").fadeOut(10, function () {
				$("main div#companies-submitted #successful").fadeIn(300);
			});

		}) //if there is an error in writing to the database, this function is run:
		.catch(function(e) {
			console.error("Firebase error:\n" + e);

			$("main div#companies-submitted #loading").fadeOut(10, function () {
				$("main div#companies-submitted #failed").fadeIn(300);
			});
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
try {
	function validate (json) {
		if (!json.email && !json.phone && !json.fax) {
			return false;
		}
		return true;
	};
} catch (e) {
	console.error("Error occurred during validation.");
}

//shows description field in form when the yes button is selected,
//and hides it when yes isn't selected
let open = false;
$("input[type='radio'][name='skill']").change(function () {
	if (this.value == 'yes' && !open) {
		$("#describe").slideDown();
		open = true;
	} else if (this.value != 'yes' && open) {
		$("#describe").slideUp();
		open = false;
	}
});



/*
 ************************
   PushState Navigation
 ************************
*/
//only load angular and angularfire once
/*let loaded = false;
let loadNg = function () {
	$.getScript('/bower_components/angular/angular.min.js', function (data, textStatus) {
		$.getScript('/bower_components/angularfire/dist/angularfire.min.js', function (data, textStatus) {
			$.getScript('/scripts/ng.js');
		});
		//ng();
	});
};*/

//function changes the DOM based on the page to navigate to
let navigate = function (target) {
	if (target.includes("companies")) {
		$("main #choose").fadeOut(10, function () {
			//use history.pushState to make the page change
			//register in the browser's history
			history.pushState(null, null, '/companies');
			//sets main height to auto for background
			$("main").css('height', 'auto');
			$("main div#companies").fadeIn(300);
		});

	} else if (target.includes("students")) {
		$("main #choose").fadeOut(10, function () {
			//use history.pushState to make the page change
			//register in the browser's history
			history.pushState(null, null, '/students');
			//sets main height to auto for background
			//$("main").css('height', 'auto');
			$("main div#students").fadeIn(300);
		});

		/*if (!loaded) {
			loadNg();
			loaded= true;
		}*/
	} else if (target == "home") {
		$("main div#students, main div#companies").fadeOut(10, function() {
			$("main").css('height', '');
			$("main #choose").fadeIn(300);
		});
	};
};

//triggers a navigation when one of the
//buttons on the landing page is pressed
$("main #choose button").click(function(event) {
	event.preventDefault();
	navigate($(this).attr('id'));
});

//function to clarify navigation when page
//loads, and when user presses back/forward
//button or changes address bar
let locChange = function () {
	if (document.location.pathname == "/") {
		navigate("home");
	} else {
		navigate(document.location.pathname);
	};
};

$(document).ready(function () {
	locChange();
});

//executes whenever the adrees changes
//and when user presses back/forward button
$(window).on('popstate', function (event) {
	event.preventDefault();
	locChange();
});