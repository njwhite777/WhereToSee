angular.module('wheretoseeApp')
 .directive('imagebox',['$interval','artifactService', function ($interval,artifactService) {

  function link(scope, element, attrs) {
    scope.artifactService = artifactService;
    scope.shouldAnimate = false;

    $interval(
      function(){
        scope.shouldAnimate = true;
      }
    ,50);

    scope.removeArtifact = function(artifact){
      // Can set up removal animation here.
      artifactService.removeArtifact(artifact)
    };

  }

  return {
    scope :{
      artifact:'='
    },
    template: '<div ng-if="shouldAnimate" class="fade_animation" style="height:200px;width:300px;" class="md-whiteframe-2dp" ><md-toolbar class="demo-toolbar md-primary _md _md-toolbar-transitions">'+
                '<div class="md-toolbar-tools">'+
                  '<h3 class="ng-binding ng-isolate-scope"><a class="docs-anchor ng-scope" ng-href="#basic-usage" name="basic-usage" href="#basic-usage">{{ artifact.name }}</a></h3>'+
                  '<span flex="" class="flex"></span>'+
                  '<button class="md-icon-button md-button md-ink-ripple active" type="button" aria-label="Remove Artifact"  ng-click="removeArtifact(artifact)" style="">'+
                    '<md-icon>close</md-icon>'+
                  '</button>'+
              '</md-toolbar></div>'+
              '<md-content> <img style="max-width:100%;max-height:100%;" ng-src="http://localhost:5001{{ artifact.images[0].artifactUrl }}" alt="{{artifact.images[0].description}}" class="md-avatar"></md-content>'+
              '</div>',
      restrict: 'E',
      link: link
  };
}]);
