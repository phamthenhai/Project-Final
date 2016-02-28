notesApp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
notesApp.directive('notecomplete', function () {
    return {
      templateUrl: 'template/notecomplete.html',
      restrict: 'CE',
      transclude: true,
        replace: true,
      scope: {
        notes:"=notevalue"
        }
    };
});
notesApp.directive('notecompleted', function () {
    return {
      templateUrl: 'template/notecompleted.html',
      restrict: 'CE',
        transclude: true,
        replace: true,
      scope: {
        arrcompletes:"=notevalue"
        }
    };
});
notesApp.directive('xngWatcher', function () {
        return {
            scope:{
                noteitem:'=noteItem'
            },
            template: '<span class="progress-bar" style=" z-index:0; width:{{kq}}%;"></span>',
            link: function (scope, elm, iAttrs) {
                scope.$watch(function () {
                    var id = 0;
                    if(scope.noteitem === undefined){
                        id = 0;
                        return;
                    }
                    for(var i = 0; i < scope.noteitem.length; i ++){
                        if(scope.noteitem[i].complete == true){
                            id ++;
                        }
                    }
                    scope.kq = (id / (scope.noteitem.length) * 100);
                     }, false);
            }}
});
