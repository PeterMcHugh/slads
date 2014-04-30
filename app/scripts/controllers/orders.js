(function (angular, Parse) {
  'use strict';

  var module = angular.module('sladsApp');

  module.controller('OrdersCtrl', function ($scope, parseService, $modal) {

    $scope.orders = [];

    $scope.products = [];

    var Order = Parse.Object.extend({className: 'Order', attrs: ['user', 'content']});

    var query = new Parse.Query(Order);

    var queryForOrders = function () {
      query.include('user');
      query.find().then(function (results) {
        $scope.orders = results;
      });
    };

    queryForOrders();

    $scope.order = function () {

      var modalScope = $scope.$new();
      modalScope.title = 'Order';

      var fields = [
        {label: 'Content', type: 'text', placeholder: 'Insert order as text'}
      ];

      modalScope.fields = fields;

      var d = $modal({
        template: 'views/modal.html',
        scope: modalScope
      });

      modalScope.save = function (fields) {
        var order = new Order();

        order.set('user', parseService.currentUser());
        order.set('content', fields[0].value);

        order.save(null, {
          success: function (){
            queryForOrders();
            d.hide();
          }
        });
      };
    };

    $scope.clear = function () {
      query.find().then(function (results) {
        var destroy = function (results) {
          if(results.length > 0) {
            var order = results.pop();
            order.destroy({
              success: function () {
                destroy(results);
              }
            });
          } else {
            queryForOrders();
          }
        };
        destroy(results);
      });
    };

  });

}(this.angular, this.Parse));
