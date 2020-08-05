import { Component } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
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
  userdata: any;
  user_id: any;
  country_id: any;
  messagecount: any;
  showcount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private storage:Storage, public menuCtrl:MenuController) {
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
    this.storage.get('userdetails').then((val) => {
      this.userdata = val;
      this.user_id = this.userdata[0].id;
      this.country_id = this.userdata[0].country_id;
      console.log('userdata', this.userdata);
      console.log('countryiid', this.country_id);

      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
  
  }); 
    console.log('ionViewDidLoad BestpracticesPage');
  }

}
