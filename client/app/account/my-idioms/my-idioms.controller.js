'use strict';

angular.module('idiomologyApp')
  .controller('MyIdiomsCtrl', function ($scope, Auth, $http) {
    $scope.state = 'all';
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.collections = $scope.getCurrentUser().collections; 
    $scope.userIdioms = [];
    $scope.chosenIdiom = undefined;
    $scope.showChooseBox = false;

    $scope.getUsersIdioms = function() {
      $scope.userIdioms = [];
      $http.post("api/users/getIdioms", {
        userId: $scope.getCurrentUser()._id
      })
        .success(function(data) {
          for(var i = 0; i < data.length; i++) {
            $scope.userIdioms.push(data[i]);
          }
        });
    }

    $scope.getUsersIdioms(); 

    $scope.showChooseBox = function(idiom) {
      console.log(idiom);
      $scope.showChooseBox = true;
    };


    $scope.closeChooseBox = function() {
      $scope.chosenIdiom = undefined;
      $scope.showChooseBox = false;
    };



    $scope.getAll = function() {
      $scope.state = 'all';
    }
    $scope.getCollections = function() {
      $scope.state = 'collections';
    }
    $scope.getPractice = function(collection) {
      $scope.state = 'practice';
    }

    $scope.addCollection = function(collectionName) {
      $http.post('api/users/collections', {
        userId: $scope.getCurrentUser()._id,
        collectionName: collectionName
      })
      .success(function(data, status, headers, config) {
        $scope.collections.push(data);
        console.log($scope.collections)
      })
      .error(function(data, status, headers, config) {
        console.log(data);
      })
    }


  });
