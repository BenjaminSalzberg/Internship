/*
 *********************
   List of Companies
 *********************
*/
var app = angular.module("internships", [
	"firebase"
]);

app.factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
	return $firebaseAuth();
}]);

app.controller('students', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
	var arrayRef = db.ref('2017');
	$scope.companies = $firebaseArray(arrayRef);
	//console.log($scope.companies);
}]);