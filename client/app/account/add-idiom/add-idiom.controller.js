'use strict';

angular.module('idiomologyApp')
  .controller('AddIdiomCtrl', function ($scope, $http, $resource, User, Auth) {
    
    $scope.state = "find";
    $scope.noIdiom = false;
    $scope.idiom = {};
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.searchResults = [];
    

    $scope.addIdiom = function() {
      $http.post('/api/idioms', {text:$scope.idiom.text, 
        origin: $scope.idiom.origin,
        context: $scope.idiom.context,
        example: $scope.idiom.example 
        }).
        success(function(data, status, headers, config) {
          $scope.idiom.id = data._id;
          $scope.idiom.words = [];
          for(var i = 0; i < data.words.length; i++) {
            $scope.idiom.words.push(data.words[i]);
          }
          $scope.noIdiom = true;
        }).
        error(function(data, status, headers, config) {
          console.log(data);
        }); 
    };

    $scope.addThisIdiom = function(idiom) {
      console.log(idiom)
      $http.post('api/users/idioms', {
        userId: $scope.getCurrentUser()._id,
        idiom: idiom
      })
      .success(function(data, status, headers, config) {
        console.log("added to User");
      })
      .error(function(data, status, headers, config) {
        console.log(data);
      })

    };
    $scope.addToUser = function() {
      $http.post('api/users/idioms', {
        userId: $scope.getCurrentUser()._id,
        idiom: $scope.idiom
      })
      .success(function(data, status, headers, config) {
        console.log("added to User");
      })
      .error(function(data, status, headers, config) {
        console.log(data);
      })
    };

    $scope.searchForIdioms = function(query) {
      $scope.searchResults = [];
      $http.get("api/idioms")
        .success(function(data) {
          for(var i = 0; i < data.length; i++) {
            $scope.searchResults.push(data[i]);
          }
        });
    }

    $scope.changeDef = function(def, word) {
      $http.put('/api/idioms/def', {
        idiomId: $scope.idiom.id,
        word: word,
        newDefinition: def
      })
      .success(function(data, status, headers, config) {

      });
    };



    $scope.getFind = function() {
      $scope.state = "find";
    };

    $scope.getCreate = function() {
      $scope.state = "create";
    };

  });
