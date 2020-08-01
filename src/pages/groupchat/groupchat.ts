import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html',
})
export class GroupchatPage {
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
 chatroomdata:any;
 datenow:any;
  sendername: any;
  //items: Observable<any[]>;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams){}
  }

 

