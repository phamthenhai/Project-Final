var notesApp = angular.module('notesApp',['ngAudio']);
notesApp.controller('MenuSideBar',['$scope', function($scope){
    
}]);
notesApp.controller('notes',['$scope', function($scope){
    var arr = [{nname:'html', ndatestart:'20-12-2015',ndateremind:'18:00, 2-2-2016', nstart:true,comment:'dfdfd'},
               {nname:'css', ndatestart:'20-12-2015',ndateremind:'18:00, 2-2-2016', nstart:true,comment:'dfdfd'}];
    var arrcomplete = [];
    $scope.notes = arr;
    $scope.arrcompletes = arrcomplete;
    $scope.toggledbldisplay = function () {
         $scope.divdbldisp = true;
    }
    $scope.toggledbldisplayclose = function () {
         $scope.divdbldisp = false;
    }
    $scope.loaddesc = function(notet){
        $scope.note = notet;
        $scope.editnote = notet.nname;
    }
    
    $scope.doSomething = function(){
        
        var item = {nname:$scope.inputnote, ndatestart:'20-12-2015',ndateremind:'18:00, 2-2-2016', nstart:true,comment:'dfdfd'};
        arr.push(item);
    }
    $scope.complete = function(note){
        
        var vt = note.id;
        var vtxoa = -1;
        for(var i = 0; i < arr.length; i ++){
            if(arr[i].id == vt){
                vtxoa = i;
            }
        }
        arr.splice(vtxoa,1);
        arrcomplete.push(note);
    } 
    $scope.recomplete = function(note){
        
        var vt = note.id;
        var vtxoa = -1;
        for(var i = 0; i < arrcomplete.length; i ++){
            if(arrcomplete[i].id == vt){
                vtxoa = i;
            }
        }
        arrcomplete.splice(vtxoa,1);
        arr.push(note);
    }
    $scope.showcomplete = function(){
        if($scope.showcompl == true){
            $scope.showcompl = false;
        }
        else{
            $scope.showcompl = true;
        }
    }
    $scope.playSound = function(){
        $scope.audio.play();
    }
}]);
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