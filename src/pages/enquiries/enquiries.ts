import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-enquiries',
  templateUrl: 'enquiries.html',
})
export class EnquiriesPage {
  items:any;
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
  chat(){
    this.navCtrl.push(ChatPage);
  }
  webinar(){
    this.navCtrl.push(WebinarPage);
  }
  quotes(){
    this.navCtrl.push(RfqPage);
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiriesPage');
  }

}
