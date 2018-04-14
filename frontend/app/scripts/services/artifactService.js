'use strict';
/**
 * @ngdoc function
 * @name wheretoseeApp.service:artifactService
 * @description
 * # artifactService
 * Controller of the left drawer of the application
 */

angular.module('wheretoseeApp')
  .service('artifactService',['socketService',function(socketService){
    var socket = socketService['artifactSocket'];


    return {};

}]);
