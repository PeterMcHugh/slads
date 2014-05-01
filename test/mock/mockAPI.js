(function (angular){
  'use strict';

  var mockAPI = angular.module('mockAPI', []);

  mockAPI.value('mockUser', {
    createdAt:'2014-04-29T21:44:37.026Z',
    objectId:'xt5EVmaifR',
    sessionToken:'EL1HZOx0KTiKysdKWcbJULop9',
    updatedAt:'2014-04-29T21:44:37.026Z',
    username:'testUser'
  });

}(this.angular));
