'use strict';

/**
 * @ngdoc function
 * @name wheretoseeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wheretoseeApp
 */
angular.module('wheretoseeApp')
  .controller('MainCtrl', ['$scope','socketService','searchService','artifactService','$q','$timeout','$log',function ($scope,socketService,searchService,artifactService,$q,$timeout,$log) {

      $scope.searchService = searchService;
      $scope.artifactService = artifactService;

      $scope.simulateQuery = false;
      $scope.isDisabled    = false;
      $scope.noCacheResults = false;

      $scope.selectedItemChange=function(item){
        if($scope.selectedItem!=undefined) $scope.artifactService.retrieveArtifact(item);
        $scope.selectedItem=undefined;
      }

  }]);
