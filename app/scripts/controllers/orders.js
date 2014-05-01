(function (angular) {
  'use strict';

  var module = angular.module('sladsApp');

  module.controller('OrdersCtrl', function ($scope, $modal, parseService, model) {

    $scope.orders = [];

    $scope.products = [];

    var queryForOrders = function () {
      $scope.orders = model.Order.query();
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

        parseService.currentUser().success(function(user){
          var order = new model.Order();

          order.user = {__type: 'Pointer', className: '_User', objectId: user.objectId};
          order.content = fields[0].value;

          order.$save(function () {
            queryForOrders();
            d.hide();
          });

        });

      };
    };

    $scope.clear = function () {
      var destroy = function (results) {
        if(results.length > 0) {
          var order = results.pop();
          console.log(order);
          order.$remove(function () {
            destroy(results);
          });
        } else {
          queryForOrders();
        }
      };
      destroy($scope.orders);
    };

  });

}(this.angular));
