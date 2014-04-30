(function (angular, Parse) {
    'use strict';

    var module = angular.module('sladsApp');

    module.controller('OrdersCtrl', function ($scope, parseService, $modal) {
      
        $scope.orders = [];
      
        $scope.products = [];

        var Order = Parse.Object.extend({className: 'Order', attrs: ['user', 'products']});
      
        var queryForOrders = function () {
          var query = new Parse.Query(Order);
          query.include('user', 'products');
          query.find().then(function (results) {
            $scope.orders = results;
          });
        };
      
        queryForOrders();

        var Product = Parse.Object.extend({className: 'Product', attrs: ['name', 'price']});
      
        var queryForProducts = function () {
          var query = new Parse.Query(Product);
          query.find().then(function (results) {
            $scope.products = results;
          });
        };
      
        queryForProducts();
      
        $scope.order = function () {

          var modalScope = $scope.$new();
          modalScope.title = 'Order';
                      
          var fields = [
          ];
          
          modalScope.fields = fields;

          var d = $modal({
            template: 'views/modal.html',
            scope: modalScope
          });

          modalScope.save = function (fields) {
            var m =  new Order();
            
            m.set('user', parseService.currentUser());
            
            var product = new Product();
            product.set('name', 'Test2');
            product.set('price', 2.0);
            product.save(null, {
            success: function () {
                        m.add('products', product);
                          
            m.save(null, {
              success: function (){
                queryForOrders();
                d.hide();
              }
            });
            }
            });

          };
        };
      
        $scope.openProductModal = function (product) {

          var modalScope = $scope.$new();
          modalScope.title = 'Product';
          
          var name = product ? product.getName() : undefined;
          var price = product ? product.getPrice() : undefined;
                      
          var fields = [
            {label: 'Name', type: 'text', value: name, placeholder: 'Name'},
            {label: 'Price', type: 'number', value: price, placeholder: 'Price'}
          ];
          
          modalScope.fields = fields;

          var d = $modal({
            template: 'views/modal.html',
            scope: modalScope
          });

          modalScope.save = function (fields) {
            var m = product || new Product();
            m.set('name', fields[0].value);
            m.set('price', fields[1].value);
                          
            m.save(null, {
              success: function (){
                queryForProducts();
                d.hide();
              }
            });
          };
        };
        
    });

  }(this.angular, this.Parse));
