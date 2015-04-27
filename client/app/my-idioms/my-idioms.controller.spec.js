'use strict';

describe('Controller: MyIdiomsCtrl', function () {

  // load the controller's module
  beforeEach(module('idiomologyApp'));

  var MyIdiomsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyIdiomsCtrl = $controller('MyIdiomsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
