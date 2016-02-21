service('myService', ['$interval', '$scope',function ($interval,$scope) {
    var self = this;
     var arr = [];
    var arr2 = [];
    var arrcomplete = [];
    var arrtoday = [];
    this.ndatest = "";
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
            var ndate = new Date();
            var dd2 = new Date(d2);
            var nndate = new Date(ndate.toDateString());
            var seconds = (dd2 - nndate);
        
        interval = Math.floor(seconds / 86400);
        if (interval == 0) {
            arrtoday.push(item);
        }
            if(itemSnap.val().complete === false){
                
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
    this.ndatestartt;
    
    this.loaddesc = function(notet){
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
    this.doSomething = function(input){
        var date = new Date();
        var item = {id:'',
                    nname:input, 
                    ndatestart:'20-12-2015',
                    ndateremind: " ", 
                    nstart:true,
                    complete:false,
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
    }
    this.updatennameService = function(notet,editnote){
        notet.nname = editnote;
        var hopperRef = myDataRef.child(notet.id+"");
        hopperRef.child("nname").set(editnote);
    }
    //
    this.changedateService = function(notet,datet){
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
    this.changedate2Service = function(notet,datet){
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
    this.addcommentService = function(note,inputcomment){
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
            note.push({comment:"[{id:0, commentname:inputcomment, commentdate:date1.toString()}]"});
        }   
        else{
            note.comment.push({id:(note.comment.length+''), commentname:inputcomment, commentdate:date.toString()});
        }
    }
    //them moi mot itemlist
    this.addlistitemService = function(note, inputnotelist){
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
            note.push({listitem:"[{id:idt, itemname:inputnotelist, complete:false}]"});
        }   
        else{
            note.listitem.push({id:(note.listitem.length+''), itemname:inputnotelist, complete:false});
        }
    }
    //xoa comment
    this.removecommentService = function(note, cmt){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"");
        var hopperRef2 = hopperRef.child("comment");
        var cm = {id:cmt.id, 
                      commentname:note.comment[note.comment.length-1].commentname, 
                      commentdate:note.comment[note.comment.length-1].commentdate};
        hopperRef2.child(cmt.id).set(cm);
        var newPostRef = hopperRef2.child(note.comment.length-1).remove();
        if(note.comment == undefined){
           
        }
        else{
            note.comment[cmt.id] = cm;
            note.comment.splice(note.comment.length-1,1);
        }
    }
    //check itemlist
    this.checkCompleteService = function(note, itemlist){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"");
        var hopperRef2 = hopperRef.child("listitem");
       
        hopperRef2.child(itemlist.id+"/complete").set(!itemlist.complete);
        if(note.listitem == undefined){
           
        }
        else{
            note.listitem[itemlist.id].complete = !itemlist.complete;
        }
    }
    //xoa itemlist
    this.removeItemService = function(note, itemlist){
        var date = new Date();
        var hopperRef = myDataRef.child(note.id+"");
        var hopperRef2 = hopperRef.child("listitem");
        var il = {id:itemlist.id, 
                      itemname:note.listitem[note.listitem.length-1].itemname, 
                      complete:note.listitem[note.listitem.length-1].complete};
        hopperRef2.child(itemlist.id).set(il);
        var newPostRef = hopperRef2.child(note.listitem.length-1).remove();
        if(note.listitem == undefined){
           
        }
        else{
            note.listitem[itemlist.id] = il;
            note.listitem.splice(note.listitem.length-1,1);
        }
    }
    //danh dau muc da hoan thanh cong viec
    this.completeService = function(note, idx){
        var hopperRef = myDataRef.child(note.id+"");
        hopperRef.child("complete").set(!note.complete);
        if(note.listitem == undefined){
           
        }
        else{
            note.complete = !note.complete;
            if(!note.complete){
               
                arr.push(note);
                arrcomplete.splice(idx, 1);
            }
            else{
                 arrcomplete.push(note);
                arr.splice(idx, 1);
            }
        }
    } 
    
    //cong viec lam chua dung, can lam lai
    this.recompleteService = function(note,idx){
        
       var hopperRef = myDataRef.child(note.id+"");
        hopperRef.child("complete").set(!note.complete);
        if(note.listitem == undefined){
           
        }
        else{
            note.complete = !note.complete;
            arr.push(note);
            arrcomplete.splice(idx, 1);
        }
    }
    
    //hien thi thoi gian comment so voi thoi gian hien tai
    this.timeSinceService = function(date){
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
}]);