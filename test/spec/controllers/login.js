'use strict';

describe('Controller: LoginCtrl', function () {

  beforeEach(module('sladsApp', 'mockAPI'));

  var LoginCtrl, scope, $parseService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, parseService) {

    $parseService = parseService;

    spyOn($parseService, 'login');

    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      parseService: parseService
    });
  }));

  it('Initial error should be undefined', function () {
    expect(scope.formError).toBe(undefined);
  });


});
