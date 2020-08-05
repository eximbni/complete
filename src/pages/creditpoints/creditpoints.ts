import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';
 

@Component({
  selector: 'page-creditpoints',
  templateUrl: 'creditpoints.html',
})
export class CreditpointsPage {
  creditstab: string = "recharge";
 
  walletcredits:any;
  user_id:any;
  credits:any;
  rfqcredits:any;
  userdata:any;
  country_id: any;
  rechargedata: Object;
  rechargehistory: Object;
  messagecount: Object;
  showcount: any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private storage: Storage, private http:HttpClient) {}
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
  ionViewDidLoad() {
    this.storage.get('userdetails').then((val)=>{
      this.userdata=val;
      this.user_id=this.userdata[0].id;
      this.country_id = this.userdata[0].country_id;
      console.log('userdata',this.userdata);
      this.http.get(MyApp.url+"getcredits.php?user_id="+this.user_id).subscribe((data)=>{
        this.walletcredits = data;
        
        this.credits=this.walletcredits[0].credits;
        this.rfqcredits=this.walletcredits[0].rfq_credits;
        console.log(this.rfqcredits,'credits');
        this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
          this.messagecount=count;
          this.showcount = this.messagecount[0].unreadMsgs;
          console.log('Message Count:', this.messagecount);
        })
      });
      this.http.get(MyApp.url+"getrecharge.php?country_id="+this.country_id).subscribe((data)=>{
        this.rechargedata = data;
       console.log(this.rechargedata,'Recharge Plans');
        
      });
      this.http.get(MyApp.url+"rechargeHistroy.php?user_id="+this.user_id).subscribe((data)=>{
        this.rechargehistory = data;
       console.log(this.rechargehistory,'Recharge History');
        
      });
    });
    console.log('ionViewDidLoad CreditpointsPage');
  }

 


}
