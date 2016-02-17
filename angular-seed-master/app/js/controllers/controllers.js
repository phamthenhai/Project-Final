//https://intense-torch-7697.firebaseio.com

var notesApp = angular.module('notesApp',['ngAudio']);
notesApp.controller('notes',['$scope', function($scope){

    var arr = [];
    var arr2 = [];
    var myDataRef = new Firebase('https://intense-torch-7697.firebaseio.com/complete/');
    var myDataRef2 = new Firebase('https://intense-torch-7697.firebaseio.com/complete/');
     
    //Đoạn code này để add data vào firebase, mình đã add sẵn 2 item vào rồi nên comment lại đoạn này, nếu muốn add thêm
    // thì làm tương tự là được
    // var item1 = {nname:'html', ndatestart:'20-12-2015',ndateremind:'18:00, 2-2-2016', nstart:true,comment:'dfdfd'};
    // var item2 = {nname:'css', ndatestart:'20-12-2015',ndateremind:'18:00, 2-2-2016', nstart:true,comment:'dfdfd'};
    // myDataRef.push(item1);
    // myDataRef.push(item2);

    // Phần này dùng để get data trên firebase về, muốn xem data trên firebase thì vào link này: https://blistering-inferno-6633.firebaseio.com
    myDataRef.on("value", function(snapshot) {
        snapshot.forEach(function(itemSnap) {
            var commentarr;
            if(itemSnap.val().comment == undefined){
                commentarr = [];
            }
            else{
                commentarr = itemSnap.val().comment;
            }
            var item = {id:itemSnap.val().id,
                        nname:itemSnap.val().nname, 
                        ndatestart:itemSnap.val().ndatestart,
                        ndateremind:itemSnap.val().ndateremind, 
                        nstart:itemSnap.val().nstart,
                        complete:itemSnap.val().complete,
                        listitem:[{id:'0', itemname:'def', stared:true, complete:true},
                                  {id:'1',itemname:'abc', stared:true, complete:true}],
                        comment:commentarr
                       };
            arr.push(item);
        });
        $scope.$apply();
        myDataRef.off("value");
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }); 
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
        var date = new Date();
        var item = {id:'',
                    nname:$scope.inputnote, 
                    ndatestart:'20-12-2015',
                    ndateremind:'18:00, 2-2-2016', 
                    nstart:true,complete:true,
                    listitem:[],
                    comment:[]
                   };
        var newPostRef = myDataRef.push();
        newPostRef.set(item);
        var hopperRef = myDataRef.child(newPostRef.key());
        hopperRef.update({
          id: newPostRef.key()
        });
        item.id = newPostRef.key();
        arr.push(item);
        $scope.inputnote = '';
    }
    
    $scope.addcomment = function(note){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"");
        var hopperRef2 = hopperRef.child("comment");
        var idt = 0;
        if(note.comment == undefined){
            idt = 0;
        }
        else{
            idt = note.comment.length;
        }
        var newPostRef = hopperRef2.child(idt).set({id:idt, commentname:$scope.inputcomment, commentdate:date.toString()});
         if(note.comment == undefined){
            note.push({comment:"[{id:0, commentname:$scope.inputcomment, commentdate:date.toString()}]"});
        }   
        else{
            note.comment.push({id:(note.comment.length+''), commentname:$scope.inputcomment, commentdate:date.toString()});
        }
        $scope.inputcomment = '';
    }
    $scope.removecomment = function(note, cmt){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"");
        var hopperRef2 = hopperRef.child("comment");
        var cm = {id:cmt.id, 
                      commentname:note.comment[note.comment.length-1].commentname, 
                      commentdate:note.comment[note.comment.length-1].commentdate};
        hopperRef2.child(cmt.id).set(cm);
        var newPostRef = hopperRef2.child(note.comment.length-1).remove();
        if(note.comment == undefined){
           // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
        }
        else{
            note.comment[cmt.id] = cm;
            note.comment.splice(note.comment.length-1,1);
        }
        $scope.inputcomment = '';
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
    $scope.timeSince = function(date){
        var seconds = Math.floor((new Date() - new Date(date))/ 1000);
        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
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