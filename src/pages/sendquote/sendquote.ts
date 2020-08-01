import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-sendquote',
  templateUrl: 'sendquote.html',
})
export class SendquotePage {
  lead_ref_id: any;
  

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, public storage:Storage) {
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
    console.log('ionViewDidLoad SendquotePage');
    this.storage.get("lead_ref_id").then(val=>{
      this.lead_ref_id =val;
    })
  }

}
