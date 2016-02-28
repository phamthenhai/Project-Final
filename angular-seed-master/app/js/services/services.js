
notesApp.service('myService' ,['$interval', function ($interval) {
    var self = this;
    var myDataRef = new Firebase('https://intense-torch-7697.firebaseio.com/complete/');     
    self.doSomething = function(item, arr, arrstarter){
        var newPostRef = myDataRef.push();
        newPostRef.set(item);
        var hopperRef = myDataRef.child(newPostRef.key());
        hopperRef.update({
          id: newPostRef.key()
        });
        item.id = newPostRef.key();
        if(item.nstart == true){
            arrstarter.push(item);
        }
        /*if(item.nstart == true){
            arrstarter.push(item);
        }*/
        arr.push(item);
    }
    self.addcomment = function(note,inputcomment){
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
        var newPostRef = hopperRef2.child(idt).set({id:idt, commentname:inputcomment, commentdate:date.toString()});
         if(note.comment == undefined){
            note.push({comment:"[{id:0, commentname:$scope.inputcomment, commentdate:date1.toString()}]"});
        }   
        else{
            note.comment.push({id:(note.comment.length+''), commentname:inputcomment, commentdate:date.toString()});
        } 
    }
     //xoa itemlist
    self.removeItemService = function(note, itemlist){
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
    //xoa note
    self.removenoteService = function(note, arrcomplete, arr,arrstarter, arrtoday){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"").remove();
        if(note.listitem == undefined){
           // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
        }
        else{
            var idx = -1;
            for(var i = 0; i < arr.length; i ++){
                if(arr[i].id === note.id){
                    idx = i;
                }
            }
            var idx2 = -1;
            for(var i = 0; i < arrcomplete.length; i ++){
                if(arrcomplete[i].id === note.id){
                    idx2 = i;
                }
            }
            if(idx !== -1){
            arr.splice(idx, 1);}
            else{
                arrcomplete.splice(idx2, 1);
            }
            var idx3 = -1;
            for(var i = 0; i < arrstarter.length; i ++){
                if(arrstarter[i].id === note.id){
                    idx3 = i;
                }
            }
            if(idx3 !== -1){
                arrstarter.splice(idx3, 1);
            }
            var idx4 = -1;
            for(var i = 0; i < arrtoday.length; i ++){
                if(arrtoday[i].id === note.id){
                    idx4 = i;
                }
            }
            if(idx4 !== -1){
                arrtoday.splice(idx4, 1);
            }
            
        }
    }
    //
    self.updatennameService = function(notet, editnote){
        notet.nname = editnote;
        var hopperRef = myDataRef.child(notet.id+"");
        hopperRef.child("nname").set(editnote);
    }
    //
    self.changedateService = function(notet,datet,arrtoday){
        var d = "";
        var dt = new Date(datet);
        if(datet == null || datet.getYear == 1970){
            d = "";
        }
        else{
            d = dt.toDateString();
        }
        
        var hopperRef = myDataRef.child(notet.id+"/ndatestart");
        notet.ndatestart = d;
        hopperRef.set(d);
        var ndate = new Date();
        var dd2 = new Date(notet.ndatestart);
        var nndate = new Date(ndate.toDateString());
        var seconds = (dd2 - nndate);
        interval = Math.floor(seconds / 86400);
        if (interval == 0 && notet.complete == false) {
            arrtoday.push(notet);
        }
        else{
            var idx4 = -1;
            for(var i = 0; i < arrtoday.length; i ++){
                if(arrtoday[i].id === notet.id){
                    idx4 = i;
                }
            }
            if(idx4 !== -1){
                arrtoday.splice(idx4, 1);
            }
        }
       
    }
     //
    self.changedate2Service = function(notet,datet){
        var d = "";
        if(datet == null || datet.getYear == 1970){
            d = "";
        }
        else{
            datet.setSeconds = 0;
            d = datet.toString();
        }
        
        var hopperRef = myDataRef.child(notet.id+"/ndateremind");
        notet.ndateremind = d;
        hopperRef.set(d);
       
    }
    self.completeService = function(note, arrcomplete, arr,arrstarter, arrtoday,username){
        var hopperRef = myDataRef.child(note.id+"");
        var d = new Date();
        hopperRef.child("complete").set(!note.complete);
        if(note.listitem == undefined){
           // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
        }
        else{
            note.complete = !note.complete;
            if(!note.complete){
               
                arr.push(note);
                var idx = -1;
                for(var i = 0; i < arrcomplete.length; i ++){
                    if(arrcomplete[i].id === note.id){
                        idx = i;
                    }
                }
                arrcomplete.splice(idx, 1);
                
                note = arr[arr.length-1];
                note.completedate = d.toDateString();
                note.namecomplete = " ";
                hopperRef.child("completedate").set(" ");
                hopperRef.child("namecomplete").set(" ");
                if(note.nstart == true){
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
            }
            else{
                arrcomplete.push(note);
                var idx = -1;
                for(var i = 0; i < arr.length; i ++){
                    if(arr[i].id === note.id){
                        idx = i;
                    }
                }
                arr.splice(idx, 1);
                note = arrcomplete[arrcomplete.length-1];
                
                note.completedate = d.toDateString();
                note.namecomplete = username;
                hopperRef.child("completedate").set(d.toDateString());
                hopperRef.child("namecomplete").set(username);
                if(note.nstart == true){
                    var idx3 = -1;
                    for(var i = 0; i < arrstarter.length; i ++){
                        if(arrstarter[i].id === note.id){
                            idx3 = i;
                        }
                    }
                    if(idx3 != -1){
                        arrstarter.splice(idx3, 1);
                    }
                }
                var ndate = new Date();
                var dd2 = new Date(note.ndatestart);
                var nndate = new Date(ndate.toDateString());
                var seconds = (dd2 - nndate);
                interval = Math.floor(seconds / 86400);
                if (interval == 0 ) {
                    var idx4 = -1;
                    for(var i = 0; i < arrtoday.length; i ++){
                        if(arrtoday[i].id === note.id){
                            idx4 = i;
                        }
                    }
                    if(idx4 !== -1){
                        arrtoday.splice(idx4, 1);
                    }
                }
                
            }
        }
    } 
    //check start
    self.checkstartService = function(note, arrcomplete, arr, arrstarter){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"");
       
        hopperRef.child("nstart").set(!note.nstart);
        if(note.listitem == undefined){
           // note.push({comment:[{id:'1', commentname:$scope.inputcomment, commentdate:date}]});
        }
        else{
            var idx = -1;
            for(var i = 0; i < arr.length; i ++){
                if(arr[i].id === note.id){
                    idx = i;
                }
            }
            var idx2 = -1;
            for(var i = 0; i < arrcomplete.length; i ++){
                if(arrcomplete[i].id === note.id){
                    idx2 = i;
                }
            }
            if(idx !== -1){
            arr[idx].nstart = !note.nstart;
            }
            else{
                arrcomplete[idx2].nstart = !note.nstart;
            }
            if(note.nstart == true && note.complete == false){
                 arrstarter.push(note);
            }
            if(note.nstart == false){
                var idx3 = -1;
                for(var i = 0; i < arrstarter.length; i ++){
                    if(arrstarter[i].id === note.id){
                        idx3 = i;
                    }
                }
                if(idx !== -1){
                    arrstarter.splice(idx3, 1);
                }
            }
        }
    }
    //hien thi thoi gian comment so voi thoi gian hien tai
    self.timeSinceService = function(date){
        var seconds = Math.floor((new Date() - new Date(date))/ 1000);
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
    self.checkCompleteService = function(note, itemlist){
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
    //xoa comment
    self.removecomment = function(note, cmt){
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
    }
    //them moi mot itemlist
    self.addlistitemService = function(note,inputnotelist){
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
        var newPostRef = hopperRef2.child(idt).set({id:idt, itemname:inputnotelist, complete:false});
         if(note.listitem == undefined){
            note.push({listitem:"[{id:idt, itemname:$scope.inputnotelist, complete:false}]"});
        }   
        else{
            note.listitem.push({id:(note.listitem.length+''), itemname:inputnotelist, complete:false});
        }
    }
    self.removeNotiService = function(item, idx, arrNoti){
        arrNoti.splice(idx, 1);
    }
    self.intervalNoti = function(arr, arrNoti){
        $interval(function(){
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
                  var audio = document.getElementById("audio1");
                  audio.play();
              }
          }

        }, 1000);
    }
    self.loadbyName= function(arrAll, username,arrtoday, arrstarter,arr, arrcomplete){
        for(var i = 0; i < arrAll.length; i ++){
            var ibl = false;
            for(var j =0; j < arrAll[i].listuser.length; j ++){
                if( arrAll[i].listuser[j] === username){
                    ibl = true;
                }
            }
            if(ibl === true){
            var commentarr;
                if(arrAll[i].comment == undefined){
                    commentarr = [];
                }
                else{
                    commentarr = arrAll[i].comment;
                }
                var listitemarr;
                if(arrAll[i].listitem == undefined){
                    listitemarr = [];
                }
                else{
                    listitemarr = arrAll[i].listitem;
                }
                var d = (new Date(arrAll[i].createdate).toDateString());
                var d2 = (new Date(arrAll[i].ndatestart).toDateString());
                var item = {id:arrAll[i].id,
                            nname:arrAll[i].nname, 
                            ndatestart:d2,
                            ndateremind:arrAll[i].ndateremind, 
                            nstart:arrAll[i].nstart,
                            complete:arrAll[i].complete,
                            completedate:arrAll[i].completedate,
                            namecomplete:arrAll[i].namecomplete,
                            createdate:d,
                            listitem:listitemarr,
                            listuser:arrAll[i].listuser,
                            comment:commentarr
                           };
            var ndate = new Date();
            var dd2 = new Date(d2);
            var nndate = new Date(ndate.toDateString());
            var seconds = (dd2 - nndate);
        if(item.nstart == true && item.complete == false){
            arrstarter.push(item);
        }
        interval = Math.floor(seconds / 86400);
        if (interval == 0 && item.complete == false) {
            arrtoday.push(item);
        }
        if(arrAll[i].complete === false){
                
                arr.push(item);
            }
            else{
                arrcomplete.push(item);
            } }   
        }
    }
}]);