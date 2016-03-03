//https://intense-torch-7697.firebaseio.com

var notesApp = angular.module('notesApp', [ 'ngRoute', 'ngCookies']);
notesApp.controller('notes', ['$scope', 'myService', '$rootScope', function ($scope, myService, $rootScope) {
    ///khai bao
    var self = this;
    var arr = [];
    var arr2 = [];
    var arrcomplete = [];
    var arrstarter = [];
    var arrNoti = [];
    $scope.repeat = 0;
    $scope.starter = true;
    arrtoday = [];
    $scope.starter = false;
    $scope.ndatest = "";
    $scope.ndatestartt;
    var that = this;
    $scope.showstarter = false;
    $scope.showinbox = true;
    $scope.showtoday = false;
    var in10Days = new Date();
    /*$('[data-toggle=offcanvas]').click(function(){
        $('#wrapper').toggleClass('offcanvas');
       
    });*/
    /*$('#menu-toggle').click(function(){
        $('#wrapper').toggleClass('offcanvas');
        console.log("sdsf");
    });*/
    /*$('#menu-toggle').click(function(){
        console.log("sdsf");
        return false;
    });*/
    sideNav();
    widthDesc();
    /*$('#dob').pickadate({
        format: 'mm/dd/yyyy',
        formatSubmit: 'mm/dd/yyyy',
        hiddenName: true
    });*/
    $('#dob').pickadate({
        weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        showMonthsShort: true
    });
    $('#dob1').pickadate({
        weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        showMonthsShort: true
    });

    $scope.canvasLoad = function () {
        $('#wrapper').toggleClass('offcanvas');
    }
    if (in10Days.getDate() < 10) {
        $scope.todayStr = " " + in10Days.getDate() + " ";
    } else {
        $scope.todayStr = in10Days.getDate();
    }
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
    this.disabled = function (date, mode) {
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

    this.openCalendar = function (e, date) {
        that.open[date] = true;
    };
    var arrAll = [];
    /*$scope.notes = arr;
    $scope.arrcompletes = arrcomplete;*/

    //lay du lieu ve
    var myDataRef = new Firebase('https://intense-torch-7697.firebaseio.com/complete/');
    myDataRef.on("value", function (snapshot) {
        snapshot.forEach(function (itemSnap) {
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
        myService.loadbyName(arrAll, "ptn", arrtoday, arrstarter, arr, arrcomplete);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    $scope.showInbox = function () {
        $scope.showstarter = false;
        $scope.showinbox = true;
        $scope.showtoday = false;
    }
    $scope.showStarter = function () {
        $scope.showstarter = true;
        $scope.showinbox = false;
        $scope.showtoday = false;
    }
    $scope.showToday = function () {
        $scope.showstarter = false;
        $scope.showinbox = false;
        $scope.showtoday = true;
    }
    $scope.toggledbldisplayclose = function () {
        $scope.divdbldisp = false;
    }
    $scope.loaddesc = function (notet) {
        $scope.note = notet;
        $scope.editnote = notet.nname;
        var nds = new Date(notet.ndatestart);
        var ndr = new Date(notet.ndateremind);
        $scope.date1 = nds.toDateString();
        that.dates.date2 = new Date(notet.ndateremind);
        if (nds == " " || nds == 'Invalid Date') {
            $scope.date1 = "";
        } else {
            $scope.date1 = nds.toDateString();
        }
        if (ndr == 'Invalid Date') {
            $scope.date7 = "";
            $scope.time1 = "";
        } else {

            var strtime = " ";
            if ((ndr.getHours() - 12) > 9 || (ndr.getHours()) > 9) {
                if (ndr.getMinutes() > 9) {
                    strtime = ndr.getHours() - 12 + ":" + ndr.getMinutes() + " PM";
                } else {
                    strtime = ndr.getHours() - 12 + ":" + "0" + ndr.getMinutes() + " PM";
                }
                if (ndr.getHours() - 12 === 0) {
                    strtime = ndr.getHours() + ":" + "0" + ndr.getMinutes() + " AM";
                }

            } else {
                if (ndr.getMinutes() > 9) {
                    strtime = "0" + ndr.getHours() + ":" + ndr.getMinutes() + " AM";
                } else {
                    strtime = "0" + ndr.getHours() + ":" + "0" + ndr.getMinutes() + " AM";
                }
                if (ndr.getHours() === 0) {
                    strtime = "12:" + "0" + ndr.getMinutes() + " AM";
                }
            }
            $scope.date7 = ndr.toDateString();
            $scope.time1 = strtime;
        }


    }
    $scope.changeStarter = function () {
        $scope.starter = !$scope.starter;
    }
    $scope.ABC = function () {
            $('.datepicker').pickadate();
        }
        //tao moi cong viec
    $scope.doSomething = function (inputnote, starter, startdate, datet1, datet2, repeatt) {
        var date = new Date();
        var datet = " ";
        var str = datet2;

        if (datet1 === " " && datet2 !== " ") {
            datet = new Date();
            var h = (datet2.slice(0, datet2.lastIndexOf(":")));
            var m = (datet2.slice(datet2.lastIndexOf(":") + 1, datet2.lastIndexOf(":") + 3));
            if (datet2.lastIndexOf("PM") !== -1) {
                datet.setHours(parseInt(h) + 12);
                datet.setMinutes(m);
            } else {
                datet.setHours(h);
                datet.setMinutes(m);
            }

        } else if (datet1 !== " " && datet2 === " ") {
            datet = new Date(datet1);
            //datet.setH
        } else if (datet1 === " " && datet2 === " ") {
            //datet.setH
        } else {
            datet = new Date(datet1);
            var h = (datet2.slice(0, datet2.lastIndexOf(":")));
            var m = (datet2.slice(datet2.lastIndexOf(":") + 1, datet2.lastIndexOf(":") + 3));
            if (datet2.lastIndexOf("PM") !== -1) {
                datet.setHours(parseInt(h) + 12);
                datet.setMinutes(m);
            } else {
                datet.setHours(h);
                datet.setMinutes(m);
            }
            //$scope.datet7 = datet.toDateString();
        }
        var strdate = new Date(startdate);
         var str = " ";
        if (strdate == 'Invalid Date' || strdate === ' ') {
            strdate = " ";
            if (parseInt(repeatt) > 0) {
                strdate = new Date();
                str = strdate.toDateString();
            }else{
                str = " ";
            }
        }else{
            tr = strdate.toDateString();
        }
        

        var item = {
            id: '',
            nname: inputnote,
            ndatestart: str ,
            ndateremind: datet.toString(),
            nstart: starter,
            repeat: repeatt,
            complete: false,
            completedate: " ",
            namecomplete: " ",
            createdate: date.toDateString(),
            listitem: [],
            listuser: [$rootScope.username],
            comment: []
        };

        myService.doSomething(item, arr, arrstarter);
        $scope.inputnote1 = '';
        $scope.date5 = "";
        $scope.date6 = "";
        $scope.time3 = "";
        $scope.repeat = 0;
    }
    $scope.checkrepeat = function(){
        var strdate = new Date($scope.date1);
        if (strdate == 'Invalid Date' || strdate === ' ' ||strdate == undefined) {
            if (parseInt($scope.repeat) > 0) {
                strdate = new Date();
                $scope.date1 = strdate.toDateString();
            }
        }
    }
    $scope.checkrepeat2 = function(){
        var strdate = new Date($scope.date5);
        if (strdate == 'Invalid Date' || strdate === ' ' ||strdate == undefined) {
            if (parseInt($scope.repeat2) > 0) {
                strdate = new Date();
                $scope.date5 = strdate.toDateString();
            }
        }
    }
    $scope.todays = arrtoday;
    $scope.starters = arrstarter;

    //
    $scope.updatenname = function (notet) {
            myService.updatennameService(notet, $scope.editnote);
        }
        //
    $scope.changedate = function (notet, datet) {
            myService.changedateService(notet, datet, arrtoday);
        }
        //
    $scope.changedate2 = function (notet, datet1, datet2) {
        var datet = " ";
        var str = datet2;

        if (datet1 === " " && datet2 !== " ") {
            datet = new Date();
            var h = (datet2.slice(0, datet2.lastIndexOf(":")));
            var m = (datet2.slice(datet2.lastIndexOf(":") + 1, datet2.lastIndexOf(":") + 3));
            if (datet2.lastIndexOf("PM") !== -1) {
                datet.setHours(parseInt(h) + 12);
                datet.setMinutes(m);
            } else {
                datet.setHours(h);
                datet.setMinutes(m);
            }
            $scope.date7 = datet.toDateString();

        } else if (datet1 !== " " && datet2 === " ") {
            datet = new Date(datet1);
            $scope.date7 = datet.toDateString();
            //datet.setH
            $scope.time1 = "00:00";
        } else if (datet1 === " " && datet2 === " ") {
            $scope.date7 = "";
            $scope.time1 = "";
            //datet.setH
        } else {
            datet = new Date(datet1);
            var h = (datet2.slice(0, datet2.lastIndexOf(":")));
            var m = (datet2.slice(datet2.lastIndexOf(":") + 1, datet2.lastIndexOf(":") + 3));
            if (datet2.lastIndexOf("PM") !== -1) {
                datet.setHours(parseInt(h) + 12);
                datet.setMinutes(m);
            } else {
                datet.setHours(h);
                datet.setMinutes(m);
            }
            //$scope.datet7 = datet.toDateString();
        }
        myService.changedate2Service(notet, datet);

    }
    $scope.changedate3 = function (datet1, datet2) {
            var datet = " ";
            var str = datet2;

            if (datet1 === " " && datet2 !== " ") {
                datet = new Date();
                var h = (datet2.slice(0, datet2.lastIndexOf(":")));
                var m = (datet2.slice(datet2.lastIndexOf(":") + 1, datet2.lastIndexOf(":") + 3));
                if (datet2.lastIndexOf("PM") !== -1) {
                    datet.setHours(parseInt(h) + 12);
                    datet.setMinutes(m);
                } else {
                    datet.setHours(h);
                    datet.setMinutes(m);
                }
                $scope.date6 = datet.toDateString();

            } else if (datet1 !== " " && datet2 === " ") {
                datet = new Date(datet1);
                $scope.date6 = datet.toDateString();
                //datet.setH
                $scope.time3 = "00:00";
            } else if (datet1 === " " && datet2 === " ") {
                $scope.date6 = " ";
                $scope.time3 = " ";
                //datet.setH
            } else {
                datet = new Date(datet1);
                var h = (datet2.slice(0, datet2.lastIndexOf(":")));
                var m = (datet2.slice(datet2.lastIndexOf(":") + 1, datet2.lastIndexOf(":") + 3));
                if (datet2.lastIndexOf("PM") !== -1) {
                    datet.setHours(parseInt(h) + 12);
                    datet.setMinutes(m);
                } else {
                    datet.setHours(h);
                    datet.setMinutes(m);
                }
                //$scope.datet7 = datet.toDateString();
            }

        }
        //them moi commment
    $scope.addcomment = function (note) {
            myService.addcomment(note, $scope.inputcomment,$rootScope.username)
            $scope.inputcomment = '';
        }
        //them moi mot itemlist
    $scope.addlistitem = function (note) {
            myService.addlistitemService(note, $scope.inputnotelist);
            $scope.inputnotelist = '';
        }
        //xoa comment
    $scope.removecomment = function (note, cmt) {
            myService.removecomment(note, cmt);
            $scope.inputcomment = '';
        }
        //check itemlist
    $scope.checkComplete = function (note, itemlist) {
            myService.checkCompleteService(note, itemlist);
        }
        //check start
    $scope.checkstart = function (note) {
        myService.checkstartService(note, arrcomplete, arr, arrstarter);
    }

    //xoa itemlist
    $scope.removeItem = function (note, itemlist) {
            myService.removeItemService(note, itemlist);
        }
        //xoa note
    $scope.removenote = function (note) {
        myService.removenoteService(note, arrcomplete, arr, arrstarter, arrtoday);
    }

    $scope.toggledbldisplay = function () {
        $scope.divdbldisp = true;
    }
    $scope.login = function (username) {

        //$location.path("/inbox");
        $scope.notes = arr;
        $scope.arrcompletes = arrcomplete;
        $rootScope.dn = true;
        $scope.username = username;
        myService.loadbyName(arrAll, $scope.username, arrtoday, arrstarter, arr, arrcomplete)
    }
    $scope.complete = function (note) {
        var username = $scope.username;
        myService.completeService(note, arrcomplete, arr, arrstarter, arrtoday, username);
        $scope.loaddesc(note);
    }
    $scope.rightMenu = function (note) {
        console.log(note.nname);
    }


    //cho phep hien thi nhung cong viec da hoan thanh
    $scope.showcomplete = function () {
            if ($scope.showcompl == true) {
                $scope.showcompl = false;
            } else {
                $scope.showcompl = true;
            }
        }
        //hien thi thoi gian comment so voi thoi gian hien tai
    $scope.timeSince = function (date) {
        return myService.timeSinceService(date);
    }
    $scope.removeNoti = function (item, idx) {
        arrNoti.splice(idx, 1);
    }


    $scope.playSound = function () {
        var audio = document.getElementById("audio1");
        audio.play();
    }
    $scope.sharenote = function(note, user){
        myService.shareuserService(note, user);
    }
    $scope.loadchecksharenote = function(notet, user){
        if(notet == undefined){
            return false;
        }
        var list = notet.listuser;
        if(list == undefined){
            return false;
        }
        for(var i = 0; i < list.length; i ++){
            if(list[i] === user){
                return true;
            }
        }
        return false;
    }
    $scope.arrN = arrNoti;
    var i = myService.intervalNoti(arr, arrNoti);
    /* $scope.username = "";
     $rootScope.dn = false;*/
    $scope.notes = arr;
    $scope.arrcompletes = arrcomplete;
    $rootScope.username = "ptn";

    var api_picker_open = $('#api_picker_open').pickadate({}),
        api_calendar_open = api_picker_open.data('pickadate'),
        api_button_open = $('#api_button_open').on({
            click: function () {
                setTimeout(function () {
                    api_calendar_open.open()
                }, 0)
            }
        })

    var api_picker_time_open1 = $('#api_pickertime1_open').pickatime({
            interval: 5
        }),
        api_calendartime1_open = api_picker_time_open1.data('pickatime'),
        api_buttontime_open1 = $('#api_buttontime_open1').on({
            click: function () {
                setTimeout(function () {
                    api_calendartime1_open.open()
                }, 0)
            }
        })

    var api_pickerstartdate1_open1 = $('#startdate1').pickadate({
            interval: 5
        }),
        api_calendartstartdate1_open = api_pickerstartdate1_open1.data('pickadate'),
        api_buttonstartdate1_open = $('#api_buttonstartdate1_open').on({
            click: function () {
                setTimeout(function () {
                    api_calendartstartdate1_open.open()
                }, 0)
            }
        })


    var api_picker_open2 = $('#api_picker_open2').pickadate({}),
        api_calendar_open2 = api_picker_open2.data('pickadate'),
        api_button_open2 = $('#api_button_open2').on({
            click: function () {
                setTimeout(function () {
                    api_calendar_open2.open()
                }, 0)
            }
        })

    var api_picker_time_open2 = $('#api_pickertime2_open').pickatime({
            interval: 5
        }),
        api_calendartime2_open = api_picker_time_open2.data('pickatime'),
        api_buttontime_open2 = $('#api_buttontime_open2').on({
            click: function () {
                setTimeout(function () {
                    api_calendartime2_open.open()
                }, 0)
            }
        })

    var api_pickerstartdate2_open2 = $('#startdate2').pickadate({
            interval: 5
        }),
        api_calendartstartdate2_open = api_pickerstartdate2_open2.data('pickadate'),
        api_buttonstartdate2_open = $('#api_buttonstartdate2_open').on({
            click: function () {
                setTimeout(function () {
                    api_calendartstartdate2_open.open()
                }, 0)
            }
        })
    $scope.date6 = "";
    $scope.time3 = "";
    $("#repeatp").hide();
     $("#repeat").click(function(){
        $("#repeatp").toggle();
    });
    $("#sharenotelist").hide();
     $("#sharenote").click(function(){
        $("#sharenotelist").toggle();
    });

}]);
