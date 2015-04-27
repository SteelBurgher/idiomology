'use strict';

angular.module('idiomologyApp')
  .controller('MyIdiomsCtrl', function ($scope, Auth) {
    $scope.message = 'Hello';
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
