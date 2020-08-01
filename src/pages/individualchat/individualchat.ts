import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, MenuController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable'; 


@Component({
  selector: 'page-individualchat',
  templateUrl: 'individualchat.html',
})
export class IndividualchatPage {
  page: any;
  @ViewChild(Content) content: Content;
 
  userdetails:any;
  username: any = '';
  message: any;
  chatroom:any;
  messages:Observable<any[]>;
  _chatSubscription;
  chatname:any;
 user : boolean ;
 user_id:any;
 datenow:any;
  //items: Observable<any[]>;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams ) {
    this.chatroom = this.navParams.get('chatroom')
    this.chatname = this.navParams.get("chatname");
    this.datenow = Date.now();
    
   this.username = this.navParams.get("username");
   this.user=this.username;
    console.log('messages',this.messages);
    setTimeout(() => {
      this.content.scrollToBottom(0);
      }, 100);
    
     
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  

 sendMessage() {
  
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(0);
      }, 100);

    }
  ionViewWillLeave(){
    
  }

}
