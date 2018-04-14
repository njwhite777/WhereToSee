'use strict';

/**
 * @ngdoc function
 * @name wheretoseeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wheretoseeApp
 */
angular.module('wheretoseeApp')
  .controller('MainCtrl', ['$scope','socketService','searchService','artifactService',function ($scope,socketService,searchService,artifactService) {

      $scope.artifacts = [
        {name: "White Oak",coords:[40.09389490340147, -85.62538134792705],desc: 'A white oak.' },
        {name: "Visitor Center",coords: [40.09585039419487, -85.62004021718168],desc: 'Park Visitor center.' },
        {name: "Great Mound",coords:[40.09451269825916, -85.62251577299321],desc: 'The great mound.' }
      ];

      $scope.removeArtifact = function(index){
        var m = $scope.artifacts.splice(index,1)[0];
        console.log(m)
        $scope.removeMarker(m);
      };



  }]);
