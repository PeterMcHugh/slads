'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('sladsApp'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('Initial page should be ladder', function () {
    expect(scope.page).toBe('ladder');
  });

});
