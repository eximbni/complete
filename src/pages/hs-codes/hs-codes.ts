import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { HsnleadsPage } from '../hsnleads/hsnleads';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';

@Component({
  selector: 'page-hs-codes',
  templateUrl: 'hs-codes.html',
})
export class HsCodesPage {
  codes:any;
  hsdetails:any;
  chap_id:any;
  hsncode:any;
  userdata: any;
  country_id: any;
  user_id: any;
  messagecount: Object;
  showcount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage,
    private http: HttpClient, public menuCtrl: MenuController, public alertCtrl:AlertController) {
      
  }
  
  getCodes(ev:any){
    this.hsdetails;
    const val=ev.target.value;
if(val && val.trim() !=''){
this.getCodes = this.codes.filter((code)  => {
  return (code.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
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

hscode_leads(i){
    this.navCtrl.push(HsnleadsPage,
      {'hsncode':this.hsdetails[i].hscode}
      );
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  Back(){
    this.navCtrl.push(CategoriesPage);
  }

  home(){
    this.navCtrl.push(CategoriesPage);
  }
  bhs4(i){
    var hscode = this.hsdetails[i].hscode.slice(0,4);
    const alert = this.alertCtrl.create({
      title: hscode,
      subTitle: this.hsdetails[i].hs4
    });
    alert.present();
    
  }
  bhs5(i){
    var hscode = this.hsdetails[i].hscode.slice(0,5);
    const alert = this.alertCtrl.create({
      title: hscode,
      subTitle: this.hsdetails[i].hs5
    });
    alert.present();
  }
  bhs6(i){
    var hscode = this.hsdetails[i].hscode.slice(0,6);
    const alert = this.alertCtrl.create({
      title: hscode,
      subTitle: this.hsdetails[i].hs6
    });
    alert.present();
  }

  ionViewDidLoad(){
    this.chap_id =this.navParams.get('chap_data');
    console.log(this.chap_id,'chap id');
    this.storage.get("userdetails").then((val)=>{
    this.userdata = val;
    this.country_id = this.userdata[0].country_id;
    this.user_id = this.userdata[0].id;

    this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
      this.messagecount=count;
      this.showcount = this.messagecount[0].unreadMsgs;
      console.log('Message Count:', this.messagecount);
    })

    this.http.get(MyApp.url+"gethsncodes.php?chapter_id="+this.chap_id+"&country_id="+this.country_id).subscribe((data)=>{
      this.hsdetails=data;
      console.log(this.hsdetails,);

    });

});
    console.log('hscodespage');
  }
}