var notesApp = angular.module('notesApp',[]);
notesApp.controller('MenuSideBar',['$scope', function($scope){
    
}]);
notesApp.controller('notes',['$scope', function($scope){
    var arr = [{nname:'html', ndatestart:'20-12-2015',ndateremind:'18:00, 2-2-2016', nstart:true,comment:'dfdfd'},
               {nname:'css', ndatestart:'20-12-2015',ndateremind:'18:00, 2-2-2016', nstart:true,comment:'dfdfd'}];
    $scope.notes = arr;
}]);