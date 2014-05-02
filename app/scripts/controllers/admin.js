(function (angular) {
  'use strict';

  var module = angular.module('sladsApp');

  module.controller('AdminCtrl', function ($scope, $location, parseService) {

    $scope.changePassword = function (password) {
      parseService.currentUser(function (me) {
        parseService.login(me.username, password.old).success(function () {
          me.password = password.new;
          delete me.sessionToken;
          me.$update(function(){
            $scope.success = true;
            $scope.message = 'Success';
          }, function(response){
            $scope.success = false;
            $scope.message = response.error;
          });
        }). error(function (response) {
          $scope.success = false;
          $scope.message = response.error;
        });
      });
    };

  });

}(this.angular));
