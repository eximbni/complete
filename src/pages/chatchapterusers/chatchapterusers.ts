import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat'; 
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage'; 
import { CreditpointsPage } from '../creditpoints/creditpoints';
import { VideologinPage } from '../videologin/videologin';

/**
 * Generated class for the ChatchapterusersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chatchapterusers',
  templateUrl: 'chatchapterusers.html',
})
export class ChatchapterusersPage {
  chapter_id:any;
  chat_id:any;
  userslist:any;
  userdetails:any;
  user_id:any;
  chatroomdata:any;
  is_online:any;
  walletcredits:any;
  credits:any;
  subscription:any;
  profiledata:any;
  subscription_id:any;
  chat:any;
  hsn_id:any;
  true='secondary';
  false='danger';
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http:HttpClient, private storage:Storage,
    public alertCtrl: AlertController, ) {  
      
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
mychatpg(i){
  if(this.chat==1 && this.credits>= 1){
  const confirm = this.alertCtrl.create({
    title: 'Confirm',
    message: 'Adding is chargable of one credit Do you agree to proceed and your credit balance is'+this.credits,
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          var link= MyApp.url+"create_chat.php";
var chatjsondata=JSON.stringify({
  'other_id':this.userslist[i].id,
  'user_id':this.user_id,
});

console.log("sending data",chatjsondata);
this.http.post(link,chatjsondata).subscribe((data)=>{
  this.chatroomdata = data;
  console.log("ChatroomData",data)
 if(data){
    const alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Successfully added Contact',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(ChatPage);
  }
  else{
    const alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: 'some thing went wrong!',
      buttons: ['OK']
    });
    alert.present();
  }
});

        }
      }
    ]
  });
  confirm.present();

}
else{
  const alert = this.alertCtrl.create({
    title: 'Sorry!',
    subTitle: 'Insufficient Credit balance, please recharge your wallet',
    buttons: ['OK']
  });
  alert.present();
  this.navCtrl.push(CreditpointsPage);
}
}
  ionViewDidLoad() {
   
    this.storage.get("userdetails").then((val)=>{
      this.userdetails = val;
      this.user_id=this.userdetails[0].id
      this.hsn_id=this.navParams.get("hsnid");
      console.log("HSN COde:",this.hsn_id);
      this.http.get(MyApp.url+"chapter_users.php?chapter_id="+this.hsn_id+"&user_id="+this.user_id).subscribe((data)=>{
        this.userslist= data;
       
        console.log(" chapter wise list",data); 
      });  
      console.log('userid',this.userdetails,'userid',this.user_id);
      this.http.get(MyApp.url + "profile.php?user_id=" + this.user_id).subscribe((pdata) => {
        this.profiledata = pdata;
        console.log("userprofile data", this.profiledata);
        this.subscription_id = this.profiledata[0].subscription_id;
        console.log("my subscription pack id is=", this.subscription_id);
      
        this.http.get(MyApp.url + "mysubscription.php?subscription_id=" + this.subscription_id).subscribe((pdata) => {
          this.subscription = pdata;
          this.chat = this.subscription[0].chat;
          console.log("chat option is", this.chat);
          console.log("userprofile data", this.profiledata);
         });
  });
  this.http.get(MyApp.url+"getcredits.php?user_id=" + this.user_id).subscribe((edata) => {
    this.walletcredits = edata;
    this.credits = this.walletcredits[0].credits;
    console.log(this.walletcredits, 'credits');
 });
    });
    console.log('ionViewDidLoad ChatchapterusersPage');
  }

}
