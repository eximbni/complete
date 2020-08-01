import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { VideologinPage } from '../videologin/videologin';



@Component({
  selector: 'page-notification-info',
  templateUrl: 'notification-info.html',
})
export class NotificationInfoPage {
  requestid: any;

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
    this.requestid = this.navParams.get('requestid');
  }
   
toggleMenu() {
    this.menuCtrl.toggle();
  }
  home(){
    this.navCtrl.push(CategoriesPage);
  }
  leads(){
    this.navCtrl.push(LeadsPage);
  }
  chatting(){
    this.navCtrl.push(ChatPage);
  }
  webinar(){
    this.navCtrl.push(VideologinPage);
  }
  quotes(){
    this.navCtrl.push(RfqPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationInfoPage');
  }

}
