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
		apiKey: "AIzaSyCmKcMKzKroMq2Uli0y7qg0ectcowt0Iy8",
		authDomain: "bt-internships.firebaseapp.com",
		databaseURL: "https://bt-internships.firebaseio.com",
		storageBucket: "bt-internships.appspot.com",
		messagingSenderId: "367923136332"
	};
	firebase.initializeApp(CONFIG);

	
	$scope.deleteItem = function(id){
		//console.log(id);
		var itemRef = new firebase.database().ref('/2017/'+ id);
		itemRef.remove();
	}




	//place the uid of every approved user in this array
	const APPROVED_UIDS = [
		"bv1j4n5YV2gT43LV2RLTKUSt13K2",
		"BgupKS6BzmVffIdLqggWeOhtK9G2"
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
