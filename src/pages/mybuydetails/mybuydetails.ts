import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { IndividualchatPage } from '../individualchat/individualchat';
import { Storage } from '@ionic/storage';
import { VideologinPage } from '../videologin/videologin';

/**
 * Generated class for the MybuydetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mybuydetails',
  templateUrl: 'mybuydetails.html',
})
export class MybuydetailsPage {
  b_id:any;
  username:any;
 details:any;userdetails:any;
 userdata:any;

 email:any;
 user_id: any;
 country_id: any;buyleads:any;sellleads:any;
 logindata:any;leadtype:any;
 leadresponses:any;
 lead_id:any;
  from: any;
  to: any;
  product: any;
  quantity: any;
  uom: any;
  description: any;
  profiledata: any;
subscription: any;
subscription_id: any;
chat: any;
chatroomdata:any;
leadref_id:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http:HttpClient, public alertCtrl:AlertController,
  private storage:Storage) {
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

 
chatpg(i) {
  if(this.chat==1){
    console.log('Agree clicked');
var link= MyApp.url+"lead_chat.php";
var chatjsondata=JSON.stringify({
'other_id':this.leadresponses[i].response_posted_by,
'user_id':this.user_id,
});

console.log("sending data",chatjsondata);
this.http.post(link,chatjsondata).subscribe((rdata)=>{
this.chatroomdata = rdata;
console.log("data",rdata)
if(rdata!=0){
const alert = this.alertCtrl.create({
title: 'Success!',
subTitle: 'You have successfully added this user to the Chat option. You can now initiate chat conversation with this user',
buttons: ['OK']
});
alert.present();
this.navCtrl.push(IndividualchatPage,{
'chatroom':this.chatroomdata[i].id,
});
}
else{
const alert = this.alertCtrl.create({
title: 'Oops!',
subTitle: 'We could not process your request. Please reach out to our customer service',
buttons: ['OK']
});
alert.present();
}
});
   
  }
  else{
    const alert = this.alertCtrl.create({
      title: 'Sorry!',
      subTitle: 'You are not eligible to initiate this chat. Please purchase a package with Chat option included',
      buttons: ['OK']
    });
    alert.present();
  }
 
}

  ionViewDidLoad() {
    this.lead_id=  this.navParams.get('id');
    this.from = this.navParams.get("from");
    this.to = this.navParams.get("to");
    this.product = this.navParams.get("product");
    this.quantity = this.navParams.get("quantity");
    this.uom = this.navParams.get("uom");
    this.description = this.navParams.get("description");
    this.leadref_id = this.navParams.get("leadref_id");

    this.http.get(MyApp.url+"myresponses.php?lead_id="+this.lead_id).subscribe((data)=>{
      this.leadresponses = data;
      console.log("response data",data);
    });
    this.storage.get('userdetails').then((val) => {
      this.userdetails = val;
     
      this.user_id = this.userdetails[0].id;
      console.log('userdata', this.userdetails);
      this.http.get(MyApp.url + "profile.php?user_id=" + this.user_id).subscribe((pdata) => {
        this.profiledata = pdata;
        console.log("userprofile data", this.profiledata);
        this.subscription_id = this.profiledata[0].subscription_id;
        console.log("my subscription pack id is=", this.subscription_id);

        this.http.get(MyApp.url + "mysubscription.php?subscription_id=" + this.subscription_id).subscribe((pdata) => {
          this.subscription = pdata;
          this.chat = this.subscription[0].chat;
          console.log("chat option is", this.chat)
          console.log("userprofile data", this.profiledata);
        });
      });
    });
    console.log('ionViewDidLoad MybuydetailsPage');
  }

}
