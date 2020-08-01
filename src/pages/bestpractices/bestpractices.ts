import { Component } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';

/**
 * Generated class for the BestpracticesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-bestpractices',
  templateUrl: 'bestpractices.html',
})
export class BestpracticesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController) {
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
this.navCtrl.push(WebinarPage);
}
quotes(){
this.navCtrl.push(RfqPage);
}
Back(){
  this.navCtrl.push(CategoriesPage)
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad BestpracticesPage');
  }

}
