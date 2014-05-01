'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('sladsApp', 'mockAPI'));

  var MainCtrl, scope, $parseService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, parseService) {

    $parseService = parseService;

    spyOn($parseService, 'currentUser');
    spyOn($parseService, 'logout');

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      parseService: parseService
    });
  }));

  it('Initial page should be ladder', function () {
    expect(scope.page).toBe('ladder');
  });

  it('Should change the current page', function () {
    scope.showPage('other');
    expect(scope.page).toBe('other');
  });

  it('Should get the current user', function () {
    expect($parseService.currentUser).toHaveBeenCalled();
  });

  it('Should logout', function () {
    scope.logout();
    expect($parseService.logout).toHaveBeenCalled();
  });


});
