import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { MypurchasedetailsPage } from '../mypurchasedetails/mypurchasedetails';
import { MypurchasebuydetailsPage } from '../mypurchasebuydetails/mypurchasebuydetails';
import { VideologinPage } from '../videologin/videologin';


@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  user_id:any;
  userdata: any;
  country_id: any;
  notifications: Object;
  logindata: any;
  inboxdetails: Object;

  constructor(public navCtrl: NavController,public navParams: NavParams, private http: HttpClient, public alertCtrl: AlertController,

    private storage: Storage, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, "sideMenu");
    this.logindata = navParams.get('userdetails');
    console.log('userdetails', this.logindata);
  }
 
  purchaseleaddetails(i) {
    console.log('purchase lead id=', i.lead_id);
    if(i.lead_type =='Buy'){
      this.navCtrl.push(MypurchasebuydetailsPage, { 'bid': i.lead_id, 'userdetails': this.logindata });
    }else if(i.lead_type =='Sell'){
      this.navCtrl.push(MypurchasedetailsPage, { 'sid': i.lead_id, 'userdetails': this.logindata });
    }else{
      alert("This notification is not related to lead details");
      return false;
    }
   
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
  this.navCtrl.push(CategoriesPage)
}
ionViewDidLoad() {

  this.storage.get('userdetails').then((val) => {
    this.userdata = val;
    this.user_id = this.userdata[0].id;
    this.country_id = this.userdata[0].country_id;
    console.log('userdata', this.userdata);
    console.log('countryiid', this.country_id);


  this.http.get(MyApp.url+"getinbox.php?user_id=" + this.user_id).subscribe((data)=>{
    this.inboxdetails = data;
    console.log(this.inboxdetails,' inboxdetails');
  });



});
}




}
