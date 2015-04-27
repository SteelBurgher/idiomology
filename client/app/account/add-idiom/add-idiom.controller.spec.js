'use strict';

describe('Controller: AddIdiomCtrl', function () {

  // load the controller's module
  beforeEach(module('idiomologyApp'));

  var AddIdiomCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddIdiomCtrl = $controller('AddIdiomCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
