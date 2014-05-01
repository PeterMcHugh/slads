(function (angular) {
  'use strict';

  var module = angular.module('sladsApp');

  module.controller('LoginCtrl', function ($scope, $location, parseService) {

    $scope.formError = '';

    if (parseService.currentUser()) {
      $location.path('/main');
    }

    $scope.login = function (username, password) {
      parseService.login(username, password)
      .success(function () {
        $scope.formError = '';
        $location.path('/main');
      }).error(function (data) {
        $scope.formError = data.error;
      });
    };
  });

}(this.angular));
