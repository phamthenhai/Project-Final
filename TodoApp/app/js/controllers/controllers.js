//https://intense-torch-7697.firebaseio.com

var notesApp = angular.module('notesApp', ['ngRoute', 'ngCookies', 'firebase']);
notesApp.controller('notes', ['$scope', 'itemService', 'myService', '$rootScope', '$timeout', function ($scope, itemService, myService, $rootScope, $timeout) {
    ///khai bao
    var arrAll = [];
    arrAll = itemService.setListToScope();

    var arr = [];
    var arrcomplete = [];
    var arrstarter = [];
    var arrNoti = [];
    $scope.repeat = 0;
    $scope.starter = true;
    $scope.headname = "Inbox";
    arrtoday = [];
    $scope.starter = false;
    $scope.ndatest = "";
    $scope.ndatestartt;
    $scope.showstarter = false;
    $scope.showinbox = true;
    $scope.showtoday = false;
    var in10Days = new Date();
    sideNav();
    widthDesc();
    $scope.canvasLoad = function () {
        $('#wrapper').toggleClass('offcanvas');
    }
    if (in10Days.getDate() < 10) {
        $scope.todayStr = " " + in10Days.getDate() + " ";
    } else {
        $scope.todayStr = in10Days.getDate();
    }
    //function show list note in inbox
    $scope.showInbox = function () {
            $scope.showstarter = false;
            $scope.starter = false;
            $scope.date5 = "";
            $scope.headname = "Inbox";
            $scope.showinbox = true;
            $scope.showtoday = false;
        }
        //function show list note in starred
    $scope.showStarter = function () {
            $scope.starter = true;
            $scope.date5 = "";
            $scope.showstarter = true;
            $scope.showinbox = false;
            $scope.showtoday = false;
            $scope.headname = "Starred";
        }
        //function show list note in today
    $scope.showToday = function () {
            var d = new Date();
            $scope.starter = false;
            $scope.date5 = d.toDateString();
            $scope.showstarter = false;
            $scope.showinbox = false;
            $scope.showtoday = true;
            $scope.headname = "Today";
        }
        //function close menu description
    $scope.toggledbldisplayclose = function () {
            $scope.divdbldisp = false;
        }
        //function load data to menu description
    $scope.loaddesc = function (notet) {
            $scope.note = notet;
            $scope.repeat2 = notet.repeat;
            $scope.editnote = notet.nname;
            var nds = new Date(notet.ndatestart);
            var ndr = new Date(notet.ndateremind);
            $scope.date1 = nds.toDateString();
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

            $('#ip').css("height", notet.nname.length);
            var t = $('.body-desc').outerHeight();
            var t1 = $('#ip').outerHeight();
            var t3 = $(window).height();
            $('.body-desc').css("height", t3 - t1 - 100);
        }
        //function change state starred
    $scope.changeStarter = function () {
        $scope.starter = !$scope.starter;
    }

    //function show date to string
    $scope.convertDate = function (d) {
            var datet = new Date(d);
            if (datet === " " || datet == 'Invalid Date' || datet === '' || datet == undefined) {
                return " ";
            }
            return datet.getDate() + "." + (datet.getMonth() + 1) + "." + (1900 + datet.getYear());
        }
        //function create new note

    $scope.doSomething = function (inputnote, starter, startdate, datet1, datet2, repeatt) {
            myService.doSomething(inputnote, starter, startdate, datet1, datet2, repeatt, arr, arrstarter, $rootScope.username);
            $scope.inputnote = '';
            if ($scope.showtoday === true) {

            } else {
                $scope.date5 = "";
            }
            if ($scope.showstarter === true) {

            } else {
                $scope.starter = false;
            }
            $scope.date6 = "";
            $scope.time3 = "";
            $scope.repeat = 0;
        }
        //function check radio button repeat (radio button create note)
    $scope.checkrepeat = function () {
            var strdate = new Date($scope.date5);
            if (strdate == 'Invalid Date' || strdate === ' ' || strdate == undefined) {
                if (parseInt($scope.repeat) > 0) {
                    strdate = new Date();
                    $scope.date5 = strdate.toDateString();
                }
            }
        }
        //function check radio button repeat (radio button description)
    $scope.checkrepeat2 = function () {
            var strdate = new Date($scope.date1);
            if (strdate == 'Invalid Date' || strdate === ' ' || strdate == undefined) {
                if (parseInt($scope.repeat2) > 0) {
                    strdate = new Date();
                    $scope.date1 = strdate.toDateString();
                }
            }
            myService.changerepeatService($scope.note, $scope.repeat2);
            myService.changedateService($scope.note, $scope.date1, arrtoday);
        }
        /*$scope.af = function (e) {
            auto_height1(e);

        }*/
    $scope.todays = arrtoday;
    $scope.starters = arrstarter;

    //function update name note
    //notet: note update name
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

        if (datet1 === "" && datet2 !== "") {
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

        } else if (datet1 !== "" && datet2 === "") {
            datet = new Date(datet1);
            $scope.date7 = datet.toDateString();
            //datet.setH
            $scope.time1 = "00:00";
        } else if (datet1 === "" && datet2 === "") {
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
    $scope.ktcommentname = function (name) {
        return name.charAt(0);
    }
    $scope.changedate3 = function (datet1, datet2) {
            var datet = "";
            var str = datet2;

            if (datet1 === "" && datet2 !== "") {
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

            } else if (datet1 !== "" && datet2 === "") {
                datet = new Date(datet1);
                $scope.date6 = datet.toDateString();
                //datet.setH
                $scope.time3 = "00:00";
            } else if (datet1 === "" && datet2 === "") {
                $scope.date6 = "";
                $scope.time3 = "";
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
            myService.addcomment(note, $scope.inputcomment, $rootScope.username)
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
            if (itemlist.complete === true) {
                $scope.playSound();
            }
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
    $scope.shareuserlist = [];
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
        if (note.complete === true) {
            $scope.playSound();
        }

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
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
    $scope.sharenote = function (note, user) {
        myService.shareuserService(note, user);
    }
    $scope.loadchecksharenote = function (notet, user) {
        if (notet == undefined) {
            return false;
        }
        var list = notet.listuser;
        if (list == undefined) {
            return false;
        }
        for (var i = 0; i < list.length; i++) {
            if (list[i] === user) {
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
    $rootScope.username = $rootScope.globals.currentUser.username;
    $rootScope.ktusername = $rootScope.username.charAt(0);

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
    $("#repeat").click(function () {
        $("#repeatp").toggle();
    });
    $("#sharenotelist").hide();
    $("#sharenote").click(function () {
        $("#sharenotelist").toggle();
    });

    var a = ['ptn', 'user', 'guest', 'khidauma'];
    for (var i = 0; i < 4; i++) {
        if (a[i] !== $rootScope.username) {
            $scope.shareuserlist.push(a[i]);
        }
    }
    $scope.cleardate = function () {
        $scope.date5 = "";
        $scope.date6 = "";
        $scope.time3 = "";
    }
    $scope.$watch(function () {
        if ( (arrAll.length > 0)) {
            myService.loadbyName(arrAll, $scope.username, arrtoday, arrstarter, arr, arrcomplete);
            $scope.load = -1;
            arrAll = [];
        }
        if ((($scope.date5 !== '' && $scope.date5 == undefined) || ($scope.date5 === '' && $scope.date5 != undefined)) && (($scope.date6 !== '' && $scope.date6 == undefined) || ($scope.date6 === '' && $scope.date6 != undefined))) {
            $scope.showclear = false;
        } else {
            $scope.showclear = true;
        }
    });



}]);
notesApp
    .controller('RegisterController', RegisterController);

RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];

function RegisterController(UserService, $location, $rootScope, FlashService) {
    var vm = this;

    vm.register = register;

    function register() {
        vm.dataLoading = true;
        UserService.Create(vm.user)
            .then(function (response) {
                if (response.success) {
                    FlashService.Success('Registration successful', true);
                    $location.path('/login');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
    }
}
notesApp
    .controller('LoginController', LoginController);

LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

function LoginController($location, AuthenticationService, FlashService) {
    var vm = this;

    vm.login = login;

    (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
    })();

    function login() {
        vm.dataLoading = true;
        AuthenticationService.Login(vm.username, vm.password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $location.path('/home');
            } else {
                FlashService.Error(response.message);
                vm.dataLoading = false;
            }
        });
    };
}
