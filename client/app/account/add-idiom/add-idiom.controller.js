'use strict';

angular.module('idiomologyApp')
  .controller('AddIdiomCtrl', function ($scope, $http) {
    
    $scope.state = "find";

    $scope.checkForId

    $scope.getFind = function() {
      $scope.state = "find";
    };

    $scope.getCreate = function() {
      $scope.state = "create";
    };

  });
