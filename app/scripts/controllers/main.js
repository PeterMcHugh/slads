(function (angular) {
  'use strict';

  var module = angular.module('sladsApp');

  module.controller('MainCtrl', function ($scope, $location, parseService) {

    parseService.currentUser(function (user) {
      $scope.currentUser = user;
    });

    $scope.page = 'ladder';

    $scope.logout = function () {
      parseService.logout();
      $location.path('/');
    };

    $scope.showPage = function(page) {
      $scope.page = page;
    };

  });

}(this.angular));
