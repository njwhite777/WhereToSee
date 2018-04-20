angular.module('wheretoseeApp')
 .directive('map', ['$interval','socketService',function ($interval,socketService) {

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

    scope.removeMarker = function(markerData){
      var tmarker = markers[markerData.id];
      theMap.removeLayer(tmarker);
    }

    scope.addMarker = function(markerData){
      var coords=markerData.coords;
      var id=markerData.id;
      var marker = new L.marker(coords,{draggable:'true'})
        .bindPopup("<img src='tree.png' alt='"+ markerData.desc +"'></img>");

      marker.on('dragend',function(event){
        var tmarker = event.target;
        var startMarker = markers[tmarker.id];
        var startPos = originalPos[tmarker.id];

        if(!theMap.getBounds().contains(tmarker.getLatLng()))
        {
          theMap.removeLayer(tmarker);
        }else{
          tmarker.setLatLng(startPos);
        }
      });

      marker.addTo(theMap);
      markers[name] = marker;
      marker['name'] = name;
      originalPos[name] = marker.getLatLng();
    }

    theMap.invalidateSize();

    scope.invalidateMap = function(){
      theMap.invalidateSize();
    };
  }

  return {
    template: '<div id="map"></div>',
    restrict: 'E',
      link: link
  };
}]);
