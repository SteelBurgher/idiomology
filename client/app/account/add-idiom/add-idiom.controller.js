'use strict';

angular.module('idiomologyApp')
  .controller('AddIdiomCtrl', function ($scope) {
    
    $scope.state = "find";

    $scope.getFind = function() {
      $scope.state = "find";
    };

    $scope.getCreate = function() {
      $scope.state = "create";
    };

  });
