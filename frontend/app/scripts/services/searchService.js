'use strict';
/**
 * @ngdoc function
 * @name wheretoseeApp.service:searchService
 * @description
 * # searchService
 * Controller of the left drawer of the application
 */

angular.module('wheretoseeApp')
  .service('searchService',['socketService',function(socketService){
    var socket = socketService['searchSocket'];

    return {};
  }
]);
