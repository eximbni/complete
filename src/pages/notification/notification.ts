import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChatPage } from '../chat/chat';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';
import { MyaccountPage } from '../myaccount/myaccount';


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notify: string = "notifytab";

  buyleads:any;
  notifications:any;
   user_id: any;
  userdata: any;
  country_id: any;
  logindata: any;
  messagecount: Object;
  showcount: any;

  constructor(public navCtrl: NavController,public navParams: NavParams, private http: HttpClient, public alertCtrl: AlertController,

    private storage: Storage, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, "sideMenu");
    this.logindata = navParams.get('userdetails');
    console.log('userdetails', this.logindata);
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
Back(){
  this.navCtrl.push(MyaccountPage);
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

    this.http.get(MyApp.url+"getusernotification.php?user_id=" + this.user_id).subscribe((data)=>{
      this.notifications = data;
      console.log(this.notifications,'notifications');
    });



  });
}

}