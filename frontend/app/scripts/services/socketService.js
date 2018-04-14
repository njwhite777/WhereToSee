'use strict';
/**
 * @ngdoc function
 * @name wheretoseeApp.service:socketService
 * @description
 * # socketService
 * Controller of the left drawer of the application
 */

angular.module('wheretoseeApp')
  .service('socketService',['socketIOConfig','socketFactory','$q','debug',function(socketIOConfig,socketFactory,$q,debug){

    var sockets = ['artifact','search'];
    var returnObj = {};

    var buildSocketObject = function(socketName){
        var socketURL = socketIOConfig.getSocketURL(socketName);
        var ioSocketConnect = io.connect(socketURL);
        var socket = socketFactory({ ioSocket: ioSocketConnect });
        return socket;
    };
    var socket = buildSocketObject();

    angular.forEach(sockets,function(socketName){
      var socket = buildSocketObject(socketName);
      returnObj[socketName+'Socket'] = socket;
    });


    var notifySocketReady = function() {
      var deferred = $q.defer();
      socket.on('connect',function(message){
        if(debug) console.log("socketService:connected socketio");
        deferred.resolve(message);
      });
      return deferred.promise;
    };
    returnObj['notifySocketReady'] = notifySocketReady;

    return returnObj;
}]);
