/*
 *******************
   Students' Login
 *******************
*/
//let ng = function () {
	var app = angular.module("internships", [
		"firebase"
	]);

	app.factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
		return $firebaseAuth();
	}]);

	app.controller('students', ['$scope', function ($scope) {
		$scope.msg = 'heloo';
	}]);


	$("main div#students form#login").submit(function(event) {

	});
//};