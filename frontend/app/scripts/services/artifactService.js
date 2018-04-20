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

    var artifactData = {

    };

    var retrieveArtifact = function(data){
      data['artifactID']=data.id;
      socket.emit('get_artifact_by_id',data);
    };

    socket.on('retrieved_artifact',function(data){
      artifactData[data.id]=data;
    });

    var removeArtifact = function(artifactID){
      delete artifactData[artifactID];
    }

    return {
      retrieveArtifact : retrieveArtifact,
      artifactData : artifactData,
      removeArtifact : removeArtifact
    };
}]);
