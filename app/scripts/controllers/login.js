(function (angular, Parse) {
    'use strict';

    var module = angular.module('sladsApp');

    module.controller('LoginCtrl', function ($scope, $location) {

        $scope.formError = "";

        $scope.login = function (username, password) {
            Parse.User.logIn(username, password, {
                success: function (user) {
                    $scope.formError = "";
                    $location.path('/');
                },
                error: function (user, error) {
                    $scope.formError = error.message;
                }
              });
          };
      });

  }(this.angular, this.Parse));
