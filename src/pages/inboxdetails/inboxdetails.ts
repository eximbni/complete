import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';


@Component({
  selector: 'page-inboxdetails',
  templateUrl: 'inboxdetails.html',
})
export class InboxdetailsPage {
  uom:any;
  name:any;
  business_name:any;
  description:any;
  response_quantity:any;
  reponse_date:any;
  req_type:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  ionViewDidLoad() {
this.uom=this.navParams.get("uom");
this.name=this.navParams.get("name");
this.business_name=this.navParams.get("business_name");
this.description=this.navParams.get("description");
this.response_quantity=this.navParams.get("response_quantity");
this.reponse_date=this.navParams.get("reponse_date");
this.req_type=this.navParams.get("req_type");
    console.log('ionViewDidLoad InboxdetailsPage');
  }

}
