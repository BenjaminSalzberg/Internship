var app = angular.module("view", [
	"firebase",
	"ngRoute"
]);//instantiate that these are things that will be used

app.factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
	return $firebaseAuth();
}]);//


app.controller("dash", ["$scope", "$firebaseAuth", "$location", "$firebaseArray", function ($scope, $firebaseAuth, $location, $firebaseArray) {
	//initialize firebase
	const CONFIG = {
		apiKey: "AIzaSyCH9Ip83AVAahbvt7hbVA9OSEbnjnBHNbE",
		authDomain: "internships-1b609.firebaseapp.com",
		databaseURL: "https://internships-1b609.firebaseio.com",
		storageBucket: "internships-1b609.appspot.com",
		messagingSenderId: "820212679716"
	};
	firebase.initializeApp(CONFIG);

	//place the uid of every approved user in this array
	const APPROVED_UIDS = [
		"LiPOM2JIgaWPQ9cNf4QbtVK6p842"
	];


	let auth = $firebaseAuth();
	//auth.$signOut();

	let user;
	auth.$onAuthStateChanged(function (firebaseUser) {
		user = firebaseUser;
		
		//if logged in user is not approved
		if (APPROVED_UIDS.indexOf(user.uid) === -1) {
			$scope.loggedIn = false;
			alert("Sorry. Your account is not authorized to view the data.");
		} else {
			//if logged in user is authorised, give em the dashboard
			$scope.loggedIn = true;
		}
	});

	$scope.login = function () {
		auth.$signInWithRedirect("google").then(function (user) {
			//$location.path("/dash");
		});
	};


	let ref = firebase.database().ref("/2017");
	$scope.data = $firebaseArray(ref);
}]);



//app.controller("ProfileCtrl", ["$scope", "$firebaseObject",function($scope, $firebaseObject) {
//	var ref = firebase.database().ref();
//	// download physicsmarie's profile data into a local object
//	// all server changes are applied in realtime
//	$scope.profile = $firebaseObject(ref.child('profiles').child('physicsmarie'));
//}]);
