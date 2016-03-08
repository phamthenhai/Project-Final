notesApp.factory('itemService', ['$firebaseArray', function ($firebaseArray) {
    var ref = new Firebase("https://intense-torch-7697.firebaseio.com/complete/");
    var users = $firebaseArray(ref);
    var arrAll = [];
    users.$loaded()
        .then(function () {
            angular.forEach(users, function (user) {
                arrAll.push(user);
            })
        });
    return {
        setListToScope: function () {
            return arrAll;
        }
    }

}]);
notesApp.service('myService', ['$interval', function ($interval) {
    var self = this;
    var myDataRef = new Firebase('https://intense-torch-7697.firebaseio.com/complete/');
    self.doSomething = function (inputnote, starter, startdate, datet1, datet2, repeatt, arr, arrstarter, username) {
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
        if (strdate == 'Invalid Date' || strdate === ' ' || strdate === '') {
            strdate = " ";
            if (parseInt(repeatt) > 0) {
                strdate = new Date();
                str = strdate.toDateString();
            } else {
                str = " ";
            }
        } else {
            str = strdate.toDateString();
        }


        var item = {
            id: '',
            nname: inputnote,
            ndatestart: str,
            ndateremind: datet.toString(),
            nstart: starter,
            repeat: repeatt,
            complete: false,
            completedate: " ",
            namecomplete: " ",
            createdate: date.toDateString(),
            listitem: [],
            listuser: [username],
            comment: []
        };

        var newPostRef = myDataRef.push();
        newPostRef.set(item);
        var hopperRef = myDataRef.child(newPostRef.key());
        hopperRef.update({
            id: newPostRef.key()
        });
        item.id = newPostRef.key();
        if (item.nstart == true) {
            arrstarter.push(item);
        }
        /*if(item.nstart == true){
            arrstarter.push(item);
        }*/
        arr.push(item);
        var ndate = new Date();
        var dd2 = new Date(item.ndatestart);
        var nndate = new Date(ndate.toDateString());
        var seconds = (dd2 - nndate);
        interval = Math.floor(seconds / 86400);
        if (interval == 0 && item.complete == false) {
            arrtoday.push(item);
        } else {
            var idx4 = -1;
            for (var i = 0; i < arrtoday.length; i++) {
                if (arrtoday[i].id === item.id) {
                    idx4 = i;
                }
            }
            if (idx4 !== -1) {
                arrtoday.splice(idx4, 1);
            }
        }
    }
    self.addcomment = function (note, inputcomment, usernamet) {
            var date = new Date();
            var hopperRef = myDataRef.child(note.id + "");
            var hopperRef2 = hopperRef.child("comment");
            var idt = 0;
            if (note.comment == undefined) {
                idt = 0;
            } else {
                idt = note.comment.length;
            }
            var newPostRef = hopperRef2.child(idt).set({
                id: idt,
                commentname: inputcomment,
                commentdate: date.toString(),
                username: usernamet
            });
            if (note.comment == undefined) {
                note.push({
                    comment: "[{id:0, commentname:inputcomment, commentdate:date1.toString(),username:usernamet}]"
                });
            } else {
                note.comment.push({
                    id: (note.comment.length + ''),
                    commentname: inputcomment,
                    commentdate: date.toString(),
                    username: usernamet
                });
            }
        }
        //xoa itemlist
    self.removeItemService = function (note, itemlist) {
            var date = new Date();
            var hopperRef = myDataRef.child(note.id + "");
            var hopperRef2 = hopperRef.child("listitem");
            var il = {
                id: itemlist.id,
                itemname: note.listitem[note.listitem.length - 1].itemname,
                complete: note.listitem[note.listitem.length - 1].complete
            };
            hopperRef2.child(itemlist.id).set(il);
            var newPostRef = hopperRef2.child(note.listitem.length - 1).remove();
            if (note.listitem == undefined) {
                // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
            } else {
                note.listitem[itemlist.id] = il;
                note.listitem.splice(note.listitem.length - 1, 1);
            }
        }
        //xoa note
    self.removenoteService = function (note, arrcomplete, arr, arrstarter, arrtoday) {
            var date = new Date();
            var hopperRef = myDataRef.child(note.id + "").remove();
            if (note.listitem == undefined) {
                // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
            } else {
                var idx = -1;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id === note.id) {
                        idx = i;
                    }
                }
                var idx2 = -1;
                for (var i = 0; i < arrcomplete.length; i++) {
                    if (arrcomplete[i].id === note.id) {
                        idx2 = i;
                    }
                }
                if (idx !== -1) {
                    arr.splice(idx, 1);
                } else {
                    arrcomplete.splice(idx2, 1);
                }
                var idx3 = -1;
                for (var i = 0; i < arrstarter.length; i++) {
                    if (arrstarter[i].id === note.id) {
                        idx3 = i;
                    }
                }
                if (idx3 !== -1) {
                    arrstarter.splice(idx3, 1);
                }
                var idx4 = -1;
                for (var i = 0; i < arrtoday.length; i++) {
                    if (arrtoday[i].id === note.id) {
                        idx4 = i;
                    }
                }
                if (idx4 !== -1) {
                    arrtoday.splice(idx4, 1);
                }

            }
        }
        //
    self.updatennameService = function (notet, editnote) {
            notet.nname = editnote;
            var hopperRef = myDataRef.child(notet.id + "");
            hopperRef.child("nname").set(editnote);
        }
        //
    self.changedateService = function (notet, datet, arrtoday) {
            var d = "";
            var dt = new Date(datet);
            if (datet == null || datet.getYear == 1970) {
                d = "";
            } else {
                d = dt.toDateString();
            }

            var hopperRef = myDataRef.child(notet.id + "/ndatestart");
            notet.ndatestart = d;
            hopperRef.set(d);
            var ndate = new Date();
            var dd2 = new Date(notet.ndatestart);
            var nndate = new Date(ndate.toDateString());
            var seconds = (dd2 - nndate);
            interval = Math.floor(seconds / 86400);
            if (interval == 0 && notet.complete == false) {
                arrtoday.push(notet);
            } else {
                var idx4 = -1;
                for (var i = 0; i < arrtoday.length; i++) {
                    if (arrtoday[i].id === notet.id) {
                        idx4 = i;
                    }
                }
                if (idx4 !== -1) {
                    arrtoday.splice(idx4, 1);
                }
            }

        }
        //
    self.changedate2Service = function (notet, datet) {
        var d = "";
        if (datet == null || datet.getYear == 1970) {
            d = "";
        } else {
            datet.setSeconds = 0;
            d = datet.toString();
        }

        var hopperRef = myDataRef.child(notet.id + "/ndateremind");
        notet.ndateremind = d;
        hopperRef.set(d);

    }
    self.changerepeatService = function (notet, repeat) {
        var hopperRef = myDataRef.child(notet.id + "/repeat");
        notet.repeat = repeat;
        hopperRef.set(repeat);

    }
    self.completeService = function (note, arrcomplete, arr, arrstarter, arrtoday, username) {
            var hopperRef = myDataRef.child(note.id + "");
            var d = new Date();
            hopperRef.child("complete").set(!note.complete);
            if (note.listitem == undefined) {
                // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
            } else {
                note.complete = !note.complete;
                if (!note.complete) {

                    arr.push(note);
                    var idx = -1;
                    for (var i = 0; i < arrcomplete.length; i++) {
                        if (arrcomplete[i].id === note.id) {
                            idx = i;
                        }
                    }
                    arrcomplete.splice(idx, 1);

                    note = arr[arr.length - 1];
                    note.completedate = d.toDateString();
                    note.namecomplete = " ";
                    hopperRef.child("completedate").set(" ");
                    hopperRef.child("namecomplete").set(" ");
                    if (note.nstart == true) {
                        arrstarter.push(note);
                    }
                    var ndate = new Date();
                    var dd2 = new Date(note.ndatestart);
                    var nndate = new Date(ndate.toDateString());
                    var seconds = (dd2 - nndate);
                    interval = Math.floor(seconds / 86400);
                    if (interval == 0) {
                        arrtoday.push(note);
                    }
                } else {
                    arrcomplete.push(note);
                    var idx = -1;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].id === note.id) {
                            idx = i;
                        }
                    }
                    arr.splice(idx, 1);
                    note = arrcomplete[arrcomplete.length - 1];

                    note.completedate = d.toDateString();
                    note.namecomplete = username;
                    hopperRef.child("completedate").set(d.toDateString());
                    hopperRef.child("namecomplete").set(username);
                    if (note.nstart == true) {
                        var idx3 = -1;
                        for (var i = 0; i < arrstarter.length; i++) {
                            if (arrstarter[i].id === note.id) {
                                idx3 = i;
                            }
                        }
                        if (idx3 != -1) {
                            arrstarter.splice(idx3, 1);
                        }
                    }
                    var ndate = new Date();
                    var dd2 = new Date(note.ndatestart);
                    var nndate = new Date(ndate.toDateString());
                    var seconds = (dd2 - nndate);
                    interval = Math.floor(seconds / 86400);
                    if (interval == 0) {
                        var idx4 = -1;
                        for (var i = 0; i < arrtoday.length; i++) {
                            if (arrtoday[i].id === note.id) {
                                idx4 = i;
                            }
                        }
                        if (idx4 !== -1) {
                            arrtoday.splice(idx4, 1);
                        }
                    }

                }
            }
        }
        //check start
    self.checkstartService = function (note, arrcomplete, arr, arrstarter) {
            var date = new Date();
            var hopperRef = myDataRef.child(note.id + "");

            hopperRef.child("nstart").set(!note.nstart);
            if (note.listitem == undefined) {
                // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
            } else {
                var idx = -1;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id === note.id) {
                        idx = i;
                    }
                }
                var idx2 = -1;
                for (var i = 0; i < arrcomplete.length; i++) {
                    if (arrcomplete[i].id === note.id) {
                        idx2 = i;
                    }
                }
                if (idx !== -1) {
                    arr[idx].nstart = !note.nstart;
                } else {
                    arrcomplete[idx2].nstart = !note.nstart;
                }
                if (note.nstart == true && note.complete == false) {
                    arrstarter.push(note);
                }
                if (note.nstart == false) {
                    var idx3 = -1;
                    for (var i = 0; i < arrstarter.length; i++) {
                        if (arrstarter[i].id === note.id) {
                            idx3 = i;
                        }
                    }
                    if (idx !== -1) {
                        arrstarter.splice(idx3, 1);
                    }
                }
            }
        }
        //hien thi thoi gian comment so voi thoi gian hien tai
    self.timeSinceService = function (date) {
            var seconds = Math.floor((new Date() - new Date(date)) / 1000);
            var interval = Math.floor(seconds / 31536000);

            if (interval >= 1) {
                return interval + " years ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                return interval + " months ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                return interval + " days ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
                return interval + " hours ago";
            }
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
                return interval + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        }
        //check itemlist
    self.checkCompleteService = function (note, itemlist) {
            var date = new Date();
            var hopperRef = myDataRef.child(note.id + "");
            var hopperRef2 = hopperRef.child("listitem");

            hopperRef2.child(itemlist.id + "/complete").set(!itemlist.complete);
            if (note.listitem == undefined) {
                // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
            } else {
                note.listitem[itemlist.id].complete = !itemlist.complete;
            }
        }
        //xoa comment
    self.removecomment = function (note, cmt) {
            var date = new Date();
            var hopperRef = myDataRef.child(note.id + "");
            var hopperRef2 = hopperRef.child("comment");
            var cm = {
                id: cmt.id,
                commentname: note.comment[note.comment.length - 1].commentname,
                commentdate: note.comment[note.comment.length - 1].commentdate,
                username: note.comment[note.comment.length - 1].username
            };
            hopperRef2.child(cmt.id).set(cm);
            var newPostRef = hopperRef2.child(note.comment.length - 1).remove();
            if (note.comment == undefined) {
                // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
            } else {
                note.comment[cmt.id] = cm;
                note.comment.splice(note.comment.length - 1, 1);
            }
        }
        //xoa shareuser
    self.shareuserService = function (note, user) {
            var date = new Date();
            var hopperRef = myDataRef.child(note.id + "");
            var hopperRef2 = hopperRef.child("listuser");
            var arruser = note.listuser;
            var idx = -1;
            for (var i = 0; i < arruser.length; i++) {
                if (arruser[i] === user) {
                    arruser.splice(i, 1);
                    idx++;
                    break;
                }

            }
            if (idx === -1) {
                arruser.push(user);
            }
            hopperRef2.set(arruser);

        }
        //them moi mot itemlist
    self.addlistitemService = function (note, inputnotelist) {
        var date = new Date();
        var hopperRef = myDataRef.child(note.id + "");
        var hopperRef2 = hopperRef.child("listitem");
        var idt = 0;
        if (note.listitem == undefined) {
            idt = 0;
        } else {
            idt = note.listitem.length;
        }
        var newPostRef = hopperRef2.child(idt).set({
            id: idt,
            itemname: inputnotelist,
            complete: false
        });
        if (note.listitem == undefined) {
            note.push({
                listitem: "[{id:idt, itemname:inputnotelist, complete:false}]"
            });
        } else {
            note.listitem.push({
                id: (note.listitem.length + ''),
                itemname: inputnotelist,
                complete: false
            });
        }
    }
    self.removeNotiService = function (item, idx, arrNoti) {
        arrNoti.splice(idx, 1);
    }
    self.intervalNoti = function (arr, arrNoti) {
        $interval(function () {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].ndateremind === " ") {
                    continue
                }
                var olddate = new Date(arr[i].ndateremind);
                var newdate = new Date();
                var seconds = Math.floor((newdate - olddate) / 1000);
                var interval = Math.floor(seconds / 60);
                if (seconds == 0) {
                    var kt = false;
                    for (var k = 0; k < arrNoti; k++) {
                        if (arrNoti[k].id === arr[i].id) {
                            kt = true;
                        }
                    }
                    if (kt === false) {
                        arrNoti.push(angular.copy(arr[i]));
                    }
                    var audio = document.getElementById("audio1");
                    audio.play();
                }
            }

        }, 1000);
    }
    self.loaddescService = function (notet, date1, date7, time1) {
        var nds = new Date(notet.ndatestart);
        var ndr = new Date(notet.ndateremind);
        date1 = nds.toDateString();
        if (nds == " " || nds == 'Invalid Date') {
            date1 = "";
        } else {
            date1 = nds.toDateString();
        }
        if (ndr == 'Invalid Date') {
            date7 = "";
            time1 = "";
        } else {

            var strtime = " ";
            if ((ndr.getHours() - 12) > 9 || (ndr.getHours()) > 9) {
                if ((ndr.getHours() - 12) >= 0) {
                    if (ndr.getMinutes() > 9) {
                        strtime = ndr.getHours() - 12 + ":" + ndr.getMinutes() + " PM";
                    } else {
                        strtime = ndr.getHours() - 12 + ":" + "0" + ndr.getMinutes() + " PM";
                    }
                } else {
                    if (ndr.getMinutes() > 9) {
                        strtime = ndr.getHours() + ":" + ndr.getMinutes() + " PM";
                    } else {
                        strtime = ndr.getHours() + ":" + "0" + ndr.getMinutes() + " PM";
                    }
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
            date7 = ndr.toDateString();
            time1 = strtime;
        }
    }
    self.loadbyName = function (arrAll, username, arrtoday, arrstarter, arr, arrcomplete) {
        for (var i = 0; i < arrAll.length; i++) {
            var ibl = false;
            for (var j = 0; j < arrAll[i].listuser.length; j++) {
                if (arrAll[i].listuser[j] === username) {
                    ibl = true;
                }
            }
            if (ibl === true) {
                var commentarr;
                if (arrAll[i].comment == undefined) {
                    commentarr = [];
                } else {
                    commentarr = arrAll[i].comment;
                }
                var listitemarr;
                if (arrAll[i].listitem == undefined) {
                    listitemarr = [];
                } else {
                    listitemarr = arrAll[i].listitem;
                }
                var d = (new Date(arrAll[i].createdate).toDateString());
                var d2 = (new Date(arrAll[i].ndatestart).toDateString());
                var item = {
                    id: arrAll[i].id,
                    nname: arrAll[i].nname,
                    ndatestart: d2,
                    ndateremind: arrAll[i].ndateremind,
                    nstart: arrAll[i].nstart,
                    repeat: arrAll[i].repeat,
                    complete: arrAll[i].complete,
                    completedate: arrAll[i].completedate,
                    namecomplete: arrAll[i].namecomplete,
                    createdate: d,
                    listitem: listitemarr,
                    listuser: arrAll[i].listuser,
                    comment: commentarr
                };
                var ndate = new Date();
                var dd2 = new Date(d2);
                var nndate = new Date(ndate.toDateString());
                var seconds = (dd2 - nndate);
                if (item.nstart == true && item.complete == false) {
                    arrstarter.push(item);
                }
                interval = Math.floor(seconds / 86400);
                if (interval == 0 && item.complete == false) {
                    arrtoday.push(item);
                }
                if (arrAll[i].complete === false) {

                    arr.push(item);
                } else {
                    arrcomplete.push(item);
                }
            }
        }
    }
}]);
notesApp
    .factory('UserService', UserService);

UserService.$inject = ['$http'];

function UserService($http) {
    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetByUsername(username) {
        return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
    }

    function Create(user) {
        return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
    }

    function Update(user) {
        return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
    }

    function Delete(id) {
        return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
    }
    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return {
                success: false,
                message: error
            };
        };
    }
}
notesApp
    .factory('UserService', UserService);

UserService.$inject = ['$timeout', '$filter', '$q'];

function UserService($timeout, $filter, $q) {

    var service = {};
    service.GetById = GetById;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetById(id) {
        var deferred = $q.defer();
        var filtered = $filter('filter')(getUsers(), {
            id: id
        });
        var user = filtered.length ? filtered[0] : null;
        deferred.resolve(user);
        return deferred.promise;
    }

    function GetByUsername(username) {
        var deferred = $q.defer();
        var filtered = $filter('filter')(getUsers(), {
            username: username
        });
        var user = filtered.length ? filtered[0] : null;
        deferred.resolve(user);
        return deferred.promise;
    }

    function Create(user) {
        var deferred = $q.defer();

        // simulate api call with $timeout
        $timeout(function () {
            GetByUsername(user.username)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        deferred.resolve({
                            success: false,
                            message: 'Username "' + user.username + '" is already taken'
                        });
                    } else {
                        var users = getUsers();

                        // assign id
                        var lastUser = users[users.length - 1] || {
                            id: 0
                        };
                        user.id = lastUser.id + 1;

                        // save to local storage
                        users.push(user);
                        setUsers(users);

                        deferred.resolve({
                            success: true
                        });
                    }
                });
        }, 1000);

        return deferred.promise;
    }

    function Update(user) {
        var deferred = $q.defer();

        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                users[i] = user;
                break;
            }
        }
        setUsers(users);
        deferred.resolve();

        return deferred.promise;
    }


    function Delete(id) {
        var deferred = $q.defer();

        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.id === id) {
                users.splice(i, 1);
                break;
            }
        }
        setUsers(users);
        deferred.resolve();

        return deferred.promise;
    }
    // private functions

    function getUsers() {
        if (!localStorage.users) {
            localStorage.users = JSON.stringify([]);
        }

        return JSON.parse(localStorage.users);
    }

    function setUsers(users) {
        localStorage.users = JSON.stringify(users);
    }
}
notesApp
    .factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];

function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
    var service = {};

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(username, password, callback) {

        /* Dummy authentication for testing, uses $timeout to simulate api call
         ----------------------------------------------*/
        $timeout(function () {
            var response;
            UserService.GetByUsername(username)
                .then(function (user) {
                    if (user !== null && user.password === password) {
                        response = {
                            success: true
                        };
                    } else {
                        response = {
                            success: false,
                            message: 'Username or password is incorrect'
                        };
                    }
                    callback(response);
                });
        }, 1000);

        /* Use this for real authentication
         ----------------------------------------------*/
        //$http.post('/api/authenticate', { username: username, password: password })
        //    .success(function (response) {
        //        callback(response);
        //    });

    }

    function SetCredentials(username, password) {
        var authdata = Base64.encode(username + ':' + password);

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        $cookieStore.put('globals', $rootScope.globals);
    }

    function ClearCredentials() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic';
    }
}

// Base64 encoding service used by AuthenticationService
var Base64 = {

    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },

    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
};
notesApp
    .factory('FlashService', FlashService);

FlashService.$inject = ['$rootScope'];

function FlashService($rootScope) {
    var service = {};

    service.Success = Success;
    service.Error = Error;

    initService();

    return service;

    function initService() {
        $rootScope.$on('$locationChangeStart', function () {
            clearFlashMessage();
        });

        function clearFlashMessage() {
            var flash = $rootScope.flash;
            if (flash) {
                if (!flash.keepAfterLocationChange) {
                    delete $rootScope.flash;
                } else {
                    // only keep for a single location change
                    flash.keepAfterLocationChange = false;
                }
            }
        }
    }

    function Success(message, keepAfterLocationChange) {
        $rootScope.flash = {
            message: message,
            type: 'success',
            keepAfterLocationChange: keepAfterLocationChange
        };
    }

    function Error(message, keepAfterLocationChange) {
        $rootScope.flash = {
            message: message,
            type: 'error',
            keepAfterLocationChange: keepAfterLocationChange
        };
    }
}
