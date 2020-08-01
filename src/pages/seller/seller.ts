import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { LeadDetailsPage } from '../lead-details/lead-details';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';

/**
 * Generated class for the SellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-seller',
  templateUrl: 'seller.html',
})
export class SellerPage {

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
  }
  

  sellerinfo(){
    this.navCtrl.push(LeadDetailsPage);
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerPage');
  }

}
