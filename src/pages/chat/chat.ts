import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { RfqPage } from '../rfq/rfq';
import { ItemCreatePage } from '../item-create/item-create'; 
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ChatmsgPage } from '../chatmsg/chatmsg'; 
import { MyApp } from '../../app/app.component'; 
import { ChathsnusersPage } from '../chathsnusers/chathsnusers';
import { VideologinPage } from '../videologin/videologin';
import { GroupchatmsgPage } from '../groupchatmsg/groupchatmsg';
import {Observable} from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
 
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  chapterslist:any;
  userdata:any;
  user_id:any;
  country_id:any;
  chapter_id:any;
  chat_id:any;
  singleroomlist:any;
  groupslist:any;
  sendername: any;
  interval: any;
  pet:any;
  items: Observable<any[]>;
  observableVar: Subscription;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,
    private storage :Storage, private http:HttpClient,) {
      this.pet="Chat";
   
      
    }
  create(){
   
    this.navCtrl.push(ItemCreatePage,{
      'chapter':this.chapter_id,
    'chatid':this.chat_id,
    })
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  home(){
   
    this.http.get(MyApp.url+"update_userchatstatus.php?user_id="+this.user_id+"&status=offline").subscribe((cudata)=>{
      console.log('groups',cudata );
    });
    this.navCtrl.push(CategoriesPage);
  }
   

leads(){
 
  this.http.get(MyApp.url+"update_userchatstatus.php?user_id="+this.user_id+"&status=offline").subscribe((cudata)=>{
    console.log('groups',cudata );
  });
  this.navCtrl.push(LeadsPage);
}
chatting(){
this.navCtrl.push(ChatPage);
}

Back(){
  this.navCtrl.push(ChatPage);
}

webinar(){
 
  this.http.get(MyApp.url+"update_userchatstatus.php?user_id="+this.user_id+"&status=offline").subscribe((cudata)=>{
    console.log('groups',cudata );
  });
this.navCtrl.push(VideologinPage);
}
quotes(){
 
  this.http.get(MyApp.url+"update_userchatstatus.php?user_id="+this.user_id+"&status=offline").subscribe((cudata)=>{
    console.log('groups',cudata );
  });
this.navCtrl.push(RfqPage);
}
groupchatpg(i){
  this.navCtrl.push(GroupchatmsgPage,{'chatroom':this.groupslist[i].chatroom});
}
chpaterchatpg(i){
  this.navCtrl.push(ChathsnusersPage,{
    'chapter':this.chapterslist[i].chapter_id,
    'chapter_name':this.chapterslist[i].chapter_name,

  });
}
individualchatpg(i){
  console.log("user image", this.singleroomlist[i].user_image )
 
  this.http.get(MyApp.url+"updatechatroom.php?chatroom="+this.singleroomlist[i].chatroom).subscribe((yudata)=>{
    console.log('groups',yudata );
  });
  this.navCtrl.push(ChatmsgPage,{'chatroom':this.singleroomlist[i].chatroom,
'chatname':this.singleroomlist[i].business_name,
'chatuser_id':this.singleroomlist[i].user_id,
'sendername':this.sendername,
'callnumber':this.singleroomlist[i].mobile,
'caller_id':this.singleroomlist[i].id,
'business_name':this.singleroomlist[i].business_name,
'user_image':this.singleroomlist[i].user_image,
'chat_status':this.singleroomlist[i].chat_status,
});

}


  
ionViewDidLoad(){
  this.storage.get('userdetails').then((val)=>{
    this.userdata = val;
    this.user_id=this.userdata[0].id;
    this.country_id=this.userdata[0].country_id;
    this.sendername=this.userdata[0].name;
    console.log('userdata',this.userdata);
    console.log('userdata id',this.user_id);
    
    console.log('countryiid',this.country_id);
 
  this.http.get(MyApp.url+"getuserchapters.php?user_id="+this.user_id).subscribe((data)=>{
    this.chapterslist =data;
    this.chapter_id = this.chapterslist[0].chapter_id,
    this.chat_id = this.chapterslist[0].id,
    console.log('chat_id ',this.chat_id );
    console.log('chapter_id',this.chapter_id );
    console.log('chapters list',this.chapterslist );
  });
  this.observableVar = Observable.interval(1000).subscribe(()=>{
  this.http.get(MyApp.url+"singlechatrooms.php?user_id="+this.user_id).subscribe((data)=>{
    this.singleroomlist = data;
    console.log("single chat list",this.singleroomlist);
    });
    this.http.get(MyApp.url+"groupchatrooms.php?user_id="+this.user_id).subscribe((gdata)=>{
      this.groupslist =gdata;
    
      console.log('groups',gdata );
    });
    this.http.get(MyApp.url+"update_userchatstatus.php?user_id="+this.user_id+"&status=online").subscribe((cudata)=>{
      console.log('groups',cudata );
    });
  },);
    
  

});


}
ionViewDidLeave(){
  this.observableVar.unsubscribe();
}

}

