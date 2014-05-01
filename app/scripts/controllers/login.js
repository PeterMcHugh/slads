(function (angular) {
  'use strict';

  var module = angular.module('sladsApp');

  module.controller('LoginCtrl', function ($scope, $location, parseService) {

    $scope.login = function (username, password) {
      parseService.login(username, password)
      .success(function () {
        $location.path('/main');
      }).error(function (response) {
        $scope.formError = response.error;
      });
    };

  });

}(this.angular));
