angular.module('wheretoseeApp')
 .directive('imagebox', function ($interval) {

  function link(scope, element, attrs) {

    scope.addMarker(scope.artifact);

  }

  return {
    template: '<div style="height:300px" class="md-whiteframe-2dp" ><md-toolbar class="demo-toolbar md-primary _md _md-toolbar-transitions">'+
                '<div class="md-toolbar-tools">'+
                  '<h3 class="ng-binding ng-isolate-scope"><a class="docs-anchor ng-scope" ng-href="#basic-usage" name="basic-usage" href="#basic-usage">{{ artifact.name }}</a></h3>'+
                  '<span flex="" class="flex"></span>'+
                  '<button class="md-icon-button md-button md-ink-ripple active" type="button" aria-label="Remove Artifact"  ng-click="removeArtifact($index)" style="">'+
                    '<md-icon>close</md-icon>'+
                  '</button>'+
              '</md-toolbar></div>'+
              '<md-content> <img ng-src="{{artifact.image}}" alt="{{artifact.description}}" class="md-avatar"></md-content>'+
              '</div>',

    restrict: 'E',
      link: link
  };
});
