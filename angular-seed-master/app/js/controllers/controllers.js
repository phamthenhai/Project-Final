//https://intense-torch-7697.firebaseio.com

var notesApp = angular.module('notesApp',['ui.bootstrap', 'ui.bootstrap.datetimepicker']);
notesApp.controller('notes',['$scope', '$interval', function($scope,$interval){

    var arr = [];
    var arr2 = [];
    var arrcomplete = [];
    $scope.ndatest = "";
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
                var listitemarr;
                if(itemSnap.val().listitem == undefined){
                    listitemarr = [];
                }
                else{
                    listitemarr = itemSnap.val().listitem;
                }
                var d = (new Date(itemSnap.val().createdate).toDateString());
                var d2 = (new Date(itemSnap.val().ndatestart).toDateString());
                var item = {id:itemSnap.val().id,
                            nname:itemSnap.val().nname, 
                            ndatestart:d2,
                            ndateremind:itemSnap.val().ndateremind, 
                            nstart:itemSnap.val().nstart,
                            complete:itemSnap.val().complete,
                            createdate:d,
                            listitem:listitemarr,
                            comment:commentarr
                           };
            if(itemSnap.val().complete === true){
                
                arr.push(item);
            }
            else{
                arrcomplete.push(item);
            }
        });
        $scope.$apply();
        myDataRef.off("value");
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }); 
    
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
    //tao moi cong viec
    $scope.doSomething = function(){
        var date = new Date();
        var item = {id:'',
                    nname:$scope.inputnote, 
                    ndatestart:'20-12-2015',
                    ndateremind:date.toString(), 
                    nstart:true,
                    complete:true,
                    createdate:date.toString(),
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
    //
    $scope.updatenname = function(notet){
        notet.nname = $scope.editnote;
        var hopperRef = myDataRef.child(notet.id+"");
        hopperRef.child("nname").set($scope.editnote);
    }
    //
    $scope.changedate = function(notet,datet){
        var d = "";
        if(datet == null || datet.getYear == 1970){
            d = "";
        }
        else{
            d = datet.toDateString();
        }
        
        var hopperRef = myDataRef.child(notet.id+"/ndatestart");
        notet.ndatestart = d;
        hopperRef.set(d);
       
    }
    //
    $scope.changedate2 = function(notet,datet){
        var d = "";
        if(datet == null || datet.getYear == 1970){
            d = "";
        }
        else{
            d = datet.toString();
        }
        
        var hopperRef = myDataRef.child(notet.id+"/ndateremind");
        notet.ndateremind = d;
        hopperRef.set(d);
       
    }
    //them moi commment
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
            note.push({comment:"[{id:0, commentname:$scope.inputcomment, commentdate:date1.toString()}]"});
        }   
        else{
            note.comment.push({id:(note.comment.length+''), commentname:$scope.inputcomment, commentdate:date.toString()});
        }
        $scope.inputcomment = '';
    }
    //them moi mot itemlist
    $scope.addlistitem = function(note){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"");
        var hopperRef2 = hopperRef.child("listitem");
        var idt = 0;
        if(note.listitem == undefined){
            idt = 0;
        }
        else{
            idt = note.listitem.length;
        }
        var newPostRef = hopperRef2.child(idt).set({id:idt, itemname:$scope.inputnotelist, complete:false});
         if(note.listitem == undefined){
            note.push({listitem:"[{id:idt, itemname:$scope.inputnotelist, complete:false}]"});
        }   
        else{
            note.listitem.push({id:(note.listitem.length+''), itemname:$scope.inputnotelist, complete:false});
        }
        $scope.inputnotelist = '';
    }
    //xoa comment
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
    //check itemlist
    $scope.checkComplete = function(note, itemlist){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"");
        var hopperRef2 = hopperRef.child("listitem");
       
        hopperRef2.child(itemlist.id+"/complete").set(!itemlist.complete);
        if(note.listitem == undefined){
           // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
        }
        else{
            note.listitem[itemlist.id].complete = !itemlist.complete;
        }
    }
    //xoa itemlist
    $scope.removeItem = function(note, itemlist){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"");
        var hopperRef2 = hopperRef.child("listitem");
        var il = {id:itemlist.id, 
                      itemname:note.listitem[note.listitem.length-1].itemname, 
                      complete:note.listitem[note.listitem.length-1].complete};
        hopperRef2.child(itemlist.id).set(il);
        var newPostRef = hopperRef2.child(note.listitem.length-1).remove();
        if(note.listitem == undefined){
           // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
        }
        else{
            note.listitem[itemlist.id] = il;
            note.listitem.splice(note.listitem.length-1,1);
        }
    }
    //danh dau muc da hoan thanh cong viec
    $scope.complete = function(note, idx){
        var hopperRef = myDataRef.child(note.id+"");
        hopperRef.child("complete").set(!note.complete);
        if(note.listitem == undefined){
           // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
        }
        else{
            note.complete = !note.complete;
            arrcomplete.push(note);
            arr.splice(idx, 1);
        }
    } 
    
    //cong viec lam chua dung, can lam lai
    $scope.recomplete = function(note){
        
       var hopperRef = myDataRef.child(note.id+"");
        hopperRef.child("complete").set(!note.complete);
        if(note.listitem == undefined){
           // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
        }
        else{
            note.complete = !note.complete;
            arr.push(note);
            arrcomplete.splice(idx, 1);
        }
    }
    //cho phep hien thi nhung cong viec da hoan thanh
    $scope.showcomplete = function(){
        if($scope.showcompl == true){
            $scope.showcompl = false;
        }
        else{
            $scope.showcompl = true;
        }
    }
    //hien thi thoi gian comment so voi thoi gian hien tai
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
    var arrNoti = [];
    $scope.arrN = arrNoti;
    var i = $interval(function(){
      for(var i = 0; i < arr.length;i ++){
          if(arr[i].ndateremind === " "){
              continue
          }
          var olddate = new Date(arr[i].ndateremind);
          var newdate = new Date();
          var seconds = Math.floor((newdate - olddate)/ 1000);
          var interval = Math.floor(seconds / 60);
          if(seconds == 0){
              arrNoti.push(angular.copy(arr[i]));
          }
      }
     
    }, 1000);
    
    $scope.ndatestartt;
    var that = this;
    
    var in10Days = new Date();
    in10Days.setDate(in10Days.getDate() + 10);
    
    this.dates = {
        date1: null,
        date2: null,
        date3: null,
        date4: null
    };

    this.open = {
        date1: false,
        date2: false,
        date3: false,
        date4: false,
        date5: false,
        date6: false,
        date7: false,
        date8: false,
        date9: false,
        date10: false,
        date11: false
    };

    // Disable today selection
    this.disabled = function(date, mode) {
        return (mode === 'day' && (new Date().toDateString() == date.toDateString()));
    };

    this.dateOptions = {
        showWeeks: false,
        startingDay: 1
    };

    this.timeOptions = {
        readonlyInput: false,
        showMeridian: false
    };

    this.dateModeOptions = {
        minMode: 'year',
        maxMode: 'year'
    };

    this.openCalendar = function(e, date) {
        that.open[date] = true;
    };

    
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