import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { InviteusersPage } from '../inviteusers/inviteusers';
import { VideologinPage } from '../videologin/videologin';


@Component({
  selector: 'page-invitation',
  templateUrl: 'invitation.html',
})
export class InvitationPage {
  weblink:any;
  webdate:any;
  webtime:any;
  webtitle:any;
  webinardata:any;
  webid:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
    this.webinardata = this.navParams.get("webinar");
    this.webid =this.webinardata[0].id;
    this.webdate = this.webinardata[0].webinar_date;
    this.webtime =this.webinardata[0].webinar_time;
    this.webtitle = this.webinardata[0].title;
    this.weblink =this.webinardata[0].webinar_link;
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
  invite(){
    this.navCtrl.push(InviteusersPage,{
      'inviteeid':this.webid,
      'weblink':this.weblink,
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationPage');
  }

}
