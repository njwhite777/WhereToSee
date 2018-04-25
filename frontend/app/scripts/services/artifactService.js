'use strict';
/**
 * @ngdoc function
 * @name wheretoseeApp.service:artifactService
 * @description
 * # artifactService
 * Controller of the left drawer of the application
 */

angular.module('wheretoseeApp')
  .service('artifactService',['socketService','$rootScope',function(socketService,$rootScope){
    var socket = socketService['artifactSocket'];
    var artifactData = {};

    var retrieveArtifact = function(data){
      data['artifactID']=data.id;
      socket.emit('get_artifact_by_id',data);
    };

    socket.on('retrieved_artifact',function(data){
      $rootScope.$emit('wheretosee:retrieved_artifact',data);
      artifactData[data.id]=data;
    });

    $rootScope.$on('wheretosee:map_removed_artifact',function(meta,artifactID){
      if(artifactData.hasOwnProperty(artifactID)) {
        $rootScope.$apply(function(){
          delete artifactData[artifactID];
        });
      }
    });

    var removeArtifact = function(artifact){
      $rootScope.$emit('wheretosee:removed_artifact',artifact);
      delete artifactData[artifact.id];
    }

    return {
      retrieveArtifact : retrieveArtifact,
      artifactData : artifactData,
      removeArtifact : removeArtifact
    };
}]);
