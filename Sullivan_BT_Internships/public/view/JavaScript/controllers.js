var app = angular.module("view", [
	"firebase",
	"ngRoute"
]);//instantiate that these are things that will be used

app.factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
	return $firebaseAuth();
}]);//

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
	//initialize firebase
	const CONFIG = {
		apiKey: "AIzaSyCH9Ip83AVAahbvt7hbVA9OSEbnjnBHNbE",
		authDomain: "internships-1b609.firebaseapp.com",
		databaseURL: "https://internships-1b609.firebaseio.com",
		storageBucket: "internships-1b609.appspot.com",
		messagingSenderId: "820212679716"
	};
	firebase.initializeApp(CONFIG);

	$locationProvider.html5Mode(true);//says this is in html5 mode

	$routeProvider.when("/", {//provides a way to link to the template and tells the template what the button will do
		controller: "login",
		templateUrl: "templates/login.html",
		resolve: {
			"currentAuth": ["Auth", function (Auth) {
				return Auth.$waitForSignIn();
			}]
		}
	}).
	when("/view", {//for is something needs a sign in
		controller: "dash",
		templateUrl: "templates/dash.html",
		resolve: {
			"currentAuth": ["Auth", function (Auth) {
				return Auth.$requireSignIn();
			}]
		}
	}).
	otherwise({//sends to login page in case all other checks fail, same as line 23
		template:"templates/login.html"
	});
}]);


app.controller("login", ["currentAuth","$scope",function (currentAuth, $scope){

}]);

app.controller("dash", ["currentAuth","$scope",function (currentAuth, $scope){
	
}]);