import { Component } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the ChatgroupusersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chatgroupusers',
  templateUrl: 'chatgroupusers.html',
})
export class ChatgroupusersPage {
  chatusers:any;
  chatroom:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
    this.chatusers=this.navParams.get("chatusers");
    this.chatroom=this.navParams.get("chatroom");
    console.log("chatusers",this.chatusers);
    console.log("chat room name",this.chatroom);
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatgroupusersPage');
  }

}