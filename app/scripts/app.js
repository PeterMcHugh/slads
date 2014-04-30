(function (angular, Parse) {
    'use strict';

    if (Parse !== undefined) {
      Parse.initialize('wHOusfpG1kv1wus81ORw8FNwW7V7NP3qXQMfSYdP', 'LNTVdhY79CqOwTC8xc1m6FVUN71WsrjFFYMsctuK');
    }

    var app = angular.module('sladsApp', ['ngSanitize', 'ngRoute', 'mgcrea.ngStrap', 'parse-angular', 'parse-angular.enhance'])
    .config(function ($routeProvider) {
        $routeProvider
          .when('/', {templateUrl: 'views/login.html', controller: 'LoginCtrl'})
          .when('/main', {templateUrl: 'views/main.html', controller: 'MainCtrl'})
          .when('/modal', {templateUrl: 'views/modal.html'})
          .otherwise({redirectTo: '/'});
      });

    app.factory('parseService', function () {
      return {
        login: function(username, password, handlers) {
          Parse.User.logIn(username, password, handlers);
        },
        logout: function() {
          Parse.User.logOut();
        },
        currentUser : Parse.User.current
      };
    });
  
    //Redirect to the login page if not authenticated
    app.run(function ($rootScope, $location, parseService) {
      $rootScope.$on('$routeChangeStart', function (event) {
        if (parseService.currentUser() === null) {
          event.preventDefault();
          $location.path('/');
        }
      });
      $rootScope.$watch(parseService.currentUser, function (value){
        if(!value) {
          $location.path('/');
        }
      });
    });
  


  }(this.angular, this.Parse));