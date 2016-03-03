//https://intense-torch-7697.firebaseio.com

var notesApp = angular.module('notesApp',['ui.bootstrap', 'ui.bootstrap.datetimepicker','ngDragDrop','ngRoute','ngCookies']);
notesApp.controller('notesController', notes);

    notes.$inject = ['$scope', '$interval', 'myService','$rootScope','$location'] ;  
function notes($scope,$interval,myService,$rootScope,$location ){
    ///khai bao
    var self = this;
    var arr = [];
    var arr2 = [];
    var arrcomplete = [];
    var arrstarter = [];
    var arrNoti = [];
    $scope.starter = true;
    arrtoday = [];
    $scope.ndatest = "";
    $scope.ndatestartt;
    var that = this;
    $scope.showstarter = false;
    $scope.showinbox = true;
    $scope.showtoday = false;
    var in10Days = new Date();
    in10Days.setDate(in10Days.getDate() + 10);
    
    this.dates = {
        date1: null,
        date2: null,
        date3: null
    };

    this.open = {
        date1: false,
        date2: false,
        date3: false
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
    var arrAll = [];
    /*$scope.notes = arr;
    $scope.arrcompletes = arrcomplete;*/
    
    //lay du lieu ve
    var myDataRef = new Firebase('https://intense-torch-7697.firebaseio.com/complete/');     
    myDataRef.on("value", function(snapshot) {
        snapshot.forEach(function(itemSnap) {
           /* if($scope.username == "" || $scope.username == undefined){
                return;
            }
            var ibl = false;
            for(var i = 0; i < arrAll[i].listuser.length; i ++){
                if(arrAll[i].listuser[i] === $scope.username){
                    ibl = true;
                }
            }
            if(ibl === true){*/
            arrAll.push(itemSnap.val());
        });
        console.log("load");
        $scope.$apply();
        myDataRef.off("value");
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }); 
    $scope.showInbox = function(){
        $scope.showstarter = false;
        $scope.showinbox = true;
        $scope.showtoday = false;
    }
    $scope.showStarter = function(){
        $scope.showstarter = true;
        $scope.showinbox = false;
        $scope.showtoday = false;
    }
    $scope.showToday = function(){
        $scope.showstarter = false;
        $scope.showinbox = false;
        $scope.showtoday = true;
    }
    $scope.toggledbldisplayclose = function () {
         $scope.divdbldisp = false;
    }
    $scope.loaddesc = function(notet){
        $scope.note = notet;
        $scope.editnote = notet.nname;
        var nds = new Date(notet.ndatestart);
        var ndr = new Date(notet.ndateremind);
        that.dates.date1 = new Date(notet.ndatestart);
        that.dates.date2 = new Date(notet.ndateremind);
        if(nds == 'Invalid Date'){
            that.dates.date1 = null;
        }
        if(ndr == 'Invalid Date'){
            that.dates.date2 = null;
        }
        
        
    }
    //tao moi cong viec
    $scope.doSomething = function(inputnote,starter){
        var date = new Date();
        var item = {id:'',
                    nname:inputnote, 
                    ndatestart:'20-12-2015',
                    ndateremind: " ", 
                    nstart:starter,
                    complete:false,
                    completedate: " ",
                    namecomplete: " ",
                    createdate:date.toDateString(),
                    listitem:[],
                    listuser:[$rootScope.username],
                    comment:[]
                   };
        
        myService.doSomething(item, arr,arrstarter); 
        $scope.inputnote1 = '';
    }
    $scope.todays = arrtoday;
    $scope.starters = arrstarter;
    
    //
    $scope.updatenname = function(notet){
        myService.updatennameService(notet,$scope.editnote);
    }
    //
    $scope.changedate = function(notet,datet){
        myService.changedateService(notet,datet,arrtoday);
    }
    //
    $scope.changedate2 = function(notet,datet){
        myService.changedate2Service(notet,datet);
       
    }
    //them moi commment
    $scope.addcomment = function(note){
        myService.addcomment(note,$scope.inputcomment)
        $scope.inputcomment = '';
    }
    //them moi mot itemlist
    $scope.addlistitem = function(note){
        myService.addlistitemService(note, $scope.inputnotelist);
        $scope.inputnotelist = '';
    }
    //xoa comment
    $scope.removecomment = function(note, cmt){
        myService.removecomment(note, cmt);
        $scope.inputcomment = '';
    }
    //check itemlist
    $scope.checkComplete = function(note, itemlist){
        myService.checkCompleteService(note, itemlist);
    }
    //check start
    $scope.checkstart = function(note){
        myService.checkstartService(note,arrcomplete,arr, arrstarter);
    }
   
    //xoa itemlist
    $scope.removeItem = function(note, itemlist){
        myService.removeItemService(note, itemlist);
    }
    //xoa note
    $scope.removenote = function(note){
        myService.removenoteService(note, arrcomplete, arr,arrstarter, arrtoday);
    }
    
    $scope.toggledbldisplay = function () {
        $scope.divdbldisp = true;
    }
    $scope.login = function (username) {
        
        $location.path("/inbox");
        $scope.notes = arr;
        $scope.arrcompletes = arrcomplete;
        $rootScope.dn = true;
        $scope.username = username;       
        myService.loadbyName(arrAll, $scope.username,arrtoday, arrstarter,arr, arrcomplete)
    }
    $scope.complete = function(note){
        var username = $scope.username;
        myService.completeService(note, arrcomplete, arr,arrstarter,arrtoday, username);
        $scope.loaddesc(note);
    } 
    $scope.rightMenu = function(note){
        console.log(note.nname);
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
        return myService.timeSinceService(date);
    }
    $scope.removeNoti = function(item, idx){
        arrNoti.splice(idx, 1);
    }
    
    
    $scope.playSound = function(){
        var audio = document.getElementById("audio1");
        audio.play();
    }
    $scope.arrN = arrNoti;
    var i = myService.intervalNoti(arr, arrNoti);
    $scope.username = "";
    $rootScope.dn = false;
    

};
//notesApp.config(function($routeProvider) {
//		$routeProvider
//			.when('/', {
//				templateUrl : 'inbox.html'
//			})
//            
//			.when('/starter', {
//				templateUrl : 'starter.html'
//			})
//            .when('/inbox', {
//				templateUrl : 'inbox.html'
//			})
//            .when('/login', {
//				templateUrl : 'login.html'
//			})
//			.when('/today', {
//				templateUrl : 'today.html'
//			});
//	});
//         

                


                
