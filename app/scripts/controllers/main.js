(function (angular) {
  'use strict';

  var module = angular.module('sladsApp');

  module.controller('MainCtrl', function ($scope, parseService) {

    $scope.currentUser = parseService.currentUser();

    $scope.page = 'ladder';

    $scope.logout = function () {
      parseService.logout();
    };

    $scope.showPage = function(page) {
      $scope.page = page;
    };

  });

}(this.angular));
