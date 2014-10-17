var TTTApp = angular.module('TTTApp', []);

TTTApp.controller('TTTController', function ($scope) {

  $scope.testString = "Angular source, App, and Controller present" ;

  $scope.cellList = [
  {status: "A"}, 
  {status: "B"}, 
  {status: "C"}, 
  {status: "D"}, 
  {status: "E"}, 
  {status: "F"}, 
  {status: "G"}, 
  {status: "H"}, 
  {status: "I"}
  ]  ;

  $scope.movecounter = 0 ;

  $scope.testJS = function() {
    console.log('Correctly accessing JS function.') ;
  } ;

  $scope.playerPicks = function(thisCell) {
    $scope.movecounter = $scope.movecounter + 1 ;
    console.log("Cell was: " + thisCell.status) ;
    if (($scope.movecounter % 2) == 1) {
      thisCell.status = "X" ;  
    } else {
      thisCell.status = "O" ;
    } 
  
  console.log("Cell is now: " + thisCell.status) ;
  } ;


}) ;