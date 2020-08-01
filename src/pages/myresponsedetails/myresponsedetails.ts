import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { RfqPage } from '../rfq/rfq';
import { VideologinPage } from '../videologin/videologin';


@Component({
  selector: 'page-myresponsedetails',
  templateUrl: 'myresponsedetails.html',
})
export class MyresponsedetailsPage {

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
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
  chat(){
    this.navCtrl.push(ChatPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyresponsedetailsPage');
  }

}
