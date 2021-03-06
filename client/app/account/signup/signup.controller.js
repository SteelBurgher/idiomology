'use strict';

angular.module('idiomologyApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.languages = [{"language": "Arabic"}, 
      {"language": "French"}, 
      {"language": "German"}, 
      {"language": "Arabic"},
      {"language": "Other"}];

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          language: $scope.user.nativeLanguage.language
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/my-idioms');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
