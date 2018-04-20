'use strict';
/**
 * @ngdoc function
 * @name wheretoseeApp.service:searchService
 * @description
 * # searchService
 * Controller of the left drawer of the application
 */

angular.module('wheretoseeApp')
  .service('searchService',['socketService','$q','artifactService',function(socketService,$q,artifactService){
    var socket = socketService['searchSocket'];
    var searchStatus = {
      'availible' : false,
      'searchItems': [],
    }
    var deferred;

    var searchFieldChanged = function(searchString){
      var deferred = $q.defer();
      socket.emit('search_artifact_name',{'searchString': searchString});
      socket.on('retrieved_search_results',function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    };

    return {
      searchFieldChanged : searchFieldChanged,
      searchStatus : searchStatus,
    };
  }
]);
