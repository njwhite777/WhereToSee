angular.module('wheretoseeApp')
 .directive('map', ['$interval','socketService','$rootScope',function ($interval,socketService,$rootScope) {

  function link(scope, element, attrs) {
    var mapDiv = $('#map');

    mapDiv.css('height', '200px');
    mapDiv.css('width', '400px');

    var theMap = L.map('map',{
      center: [40.09948255,-85.6190990636025],
      zoom: 13
    });

    var socket = socketService['artifactSocket'];


    var markers = {};
    var originalPos = {};

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibmp3aGl0ZTc3NyIsImEiOiJjamZ1Zmplc28zN2YyMzNwZTJyaWVscjNkIn0.hTxwUdZRzk4kz4sHdNYbpw', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 16,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoibmp3aGl0ZTc3NyIsImEiOiJjamZ1Zmplc28zN2YyMzNwZTJyaWVscjNkIn0.hTxwUdZRzk4kz4sHdNYbpw'
    }).addTo(theMap);

    theMap.setView([40.09948255,-85.6190990636025], 13,{reset: true});

    theMap.on('click', function(e) {
      console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    });

    $rootScope.$on('wheretosee:retrieved_artifact',function(meta,data){
      scope.addMarker(data);
    });

    $rootScope.$on('wheretosee:removed_artifact',function(meta,artifact){
      scope.removeMarker(artifact);
    });

    scope.removeMarker = function(artifact){
      var tmarker = markers[artifact.id];
      delete markers[tmarker.id];
      theMap.removeLayer(tmarker);
    }

    var _removeMarkerFromMap = function(event){
      var tmarker = event.target;
      var startMarker = markers[tmarker.id];
      var startPos = originalPos[tmarker.id];
      if(!theMap.getBounds().contains(tmarker.getLatLng()))
      {
        theMap.removeLayer(tmarker);
        delete markers[tmarker.id];
        $rootScope.$emit('wheretosee:map_removed_artifact',tmarker.id);
      }else{
        tmarker.setLatLng(startPos);
      }
    }

    scope.addMarker = function(markerData){
      if(!markers.hasOwnProperty(markerData.id)){
        var coords=markerData.coordinates;
        var id=markerData.id;
        var name=markerData.name;
        var marker = new L.marker(coords,{draggable:'true'})
          .bindPopup("<div>Name: "+ markerData.name +"</div><div>Description: " + markerData.description + "</div>");
        marker.on('dragend',_removeMarkerFromMap);
        marker.addTo(theMap);
        marker['id'] = id;
        marker['name'] = name;
        markers[id] = marker;
        originalPos[id] = marker.getLatLng();
      }
    }
    theMap.invalidateSize();
  }

  return {
    template: '<div id="map"></div>',
    restrict: 'E',
      link: link
  };
}]);
