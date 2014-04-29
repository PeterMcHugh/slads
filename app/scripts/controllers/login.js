(function (angular) {
    'use strict';

    var module = angular.module('sladsApp');

    module.controller('LoginCtrl', function ($scope, $location, parseService) {

        $scope.formError = '';

        $scope.login = function (username, password) {
            parseService.login(username, password, {
                success: function () {
                  $scope.formError = '';
                  $location.path('/');
                },
                error: function (user, error) {
                  $scope.formError = error.message;
                }
              });
          };
      });

  }(this.angular));
