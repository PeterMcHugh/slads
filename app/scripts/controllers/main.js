(function (angular) {
  'use strict';

  var module = angular.module('sladsApp');

  module.controller('MainCtrl', function ($scope, $location, $window, $interval, parseService) {

    //Rotate pages when fullscreen
    var isFullScreen = function () {
      return ($window.fullScreen) || ($window.innerWidth === $window.screen.width && $window.innerHeight === $window.screen.height);
    };

    var rotate = function() {
      $scope.page = ($scope.page === 'ladder' ? 'orders' : 'ladder');
    };

    var interval;

    angular.element($window).bind('resize', function() {
      if (angular.isDefined(interval)) {
        $interval.cancel(interval);
        interval = undefined;
      }
      if (isFullScreen()) {
        interval = $interval(rotate, 10000);
      }
    });
    //Rotate end

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
