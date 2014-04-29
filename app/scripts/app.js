(function (angular, Parse) {
    'use strict';

    if (Parse !== undefined) {
      Parse.initialize('wHOusfpG1kv1wus81ORw8FNwW7V7NP3qXQMfSYdP', 'LNTVdhY79CqOwTC8xc1m6FVUN71WsrjFFYMsctuK');
    }

    var app = angular.module('sladsApp', ['ngSanitize', 'ngRoute', 'mgcrea.ngStrap', 'parse-angular', 'parse-angular.enhance'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'views/main.html', controller: 'MainCtrl'})
        .when('/login', {templateUrl: 'views/login.html', controller: 'LoginCtrl'})
        .otherwise({
            redirectTo: '/login'
          });
      });

    app.factory('parseService', function () {
      return {
        login: function(username, password, handlers) {
          Parse.User.logIn(username, password, handlers);
        },
        logout: function() {
          Parse.User.logOut();
        }
      };
    });

  }(this.angular, this.Parse));