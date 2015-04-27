'use strict';

angular.module('idiomologyApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-idioms', {
        url: '/my-idioms',
        templateUrl: 'app/my-idioms/my-idioms.html',
        controller: 'MyIdiomsCtrl'
      });
  });