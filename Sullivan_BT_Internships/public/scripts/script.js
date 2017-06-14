// Initialise Firebase
const CONFIG = {
	apiKey: "AIzaSyCmKcMKzKroMq2Uli0y7qg0ectcowt0Iy8",
	authDomain: "bt-internships.firebaseapp.com",
	databaseURL: "https://bt-internships.firebaseio.com",
	storageBucket: "bt-internships.appspot.com",
	messagingSenderId: "367923136332"
};
firebase.initializeApp(CONFIG);
var db = firebase.database();

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

	//variables to maintain proper timing for animations
	let open = false;
	let iShowing = false;

	if (mobile) {
		$("main div#companies").slideUp(800, function () {
			$("main").css("height", "").addClass('submitted');
			$("main div#companies-submitted").slideDown(600, function () {
				open = true;
				if (!iShowing) {
					$("main div#companies-submitted div.valign-wrapper div#success i").animate({width: "72px"}, 1000, "easeInCubic");
				}
			});
		});
	} else {
		$("main").css("height", "").addClass('submitted');
		$("main div#companies").slideUp(800, function () {
			$("main div#companies-submitted").slideDown(600, function () {
				open = true;
				if (!iShowing) {
					$("main div#companies-submitted div.valign-wrapper div#success i").animate({width: "72px"}, 1000, "easeInCubic");
				}
			});
		});
	}

	const DATA = ConvertFormToJSON(this);

	//validate (see validate() below)
	if (!validate(DATA)) {
		$("main div#companies-submitted div#loading").fadeOut(10, function () {
			$("main div#companies-submitted div#warning").fadeIn(300, function () {
				$("main div#companies-submitted div.valign-wrapper div#warning i").animate({height: "72.22px"}, 1000, "easeInCubic");
				window.setTimeout(function () {
					$("main div#companies-submitted div.valign-wrapper div#warning button").slideDown();
				}, 1680);
			});
		});
		return;
	}

	
	//establishes database connection to the year/company name
	let companyRef = db.ref('2017').child(DATA.companyName);
	//send the json to database, then display fitting message
	console.log(DATA);
	companyRef.set(DATA).then(function() {
		$("main div#companies-submitted div#loading").fadeOut(10, function () {
			$("main div#companies-submitted div#success").fadeIn(300, function () {
				if (open) {
					iShowing = true;
					$("main div#companies-submitted div.valign-wrapper div#success i").animate({width: "72px"}, 1000, "easeInCubic");
				}
			});
		});
	}) //if there is an error in writing to the database, this function is run:
	.catch(function(e) {
		console.error("Firebase error:\n" + e);

		$("main div#companies-submitted div#loading").fadeOut(10, function () {
			$("main div#companies-submitted div#failed").fadeIn(300);
		});
	});
});

//handler for button to return to form
$("button.return").click(function(e) {
	e.preventDefault();

	$("main div#companies-submitted").slideUp(800, function () {
		open = false;
		$("main div#companies").slideDown(600, function () {
			$("main").css("height", "auto").removeClass('submitted');
		});
		$("main div#companies-submitted div.valign-wrapper div#success, main div#companies-submitted div.valign-wrapper div#warning, main div#companies-submitted div.valign-wrapper div#failed").hide();
		$("main div#companies-submitted div.valign-wrapper div#loading").css('display', 'block');
	});
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

//checks that either the email or phone# has been filled in
function validate (json) {
	try {
		if (!json.email && !json.phone) {
			return false;
		}
		return true;
	} catch (e) {
		console.error("Error occurred during validation.");
	}
};

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
			$('.collapsible').collapsible();
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