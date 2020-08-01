import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat'; 
import { RfqPage } from '../rfq/rfq';
import { QuotationPage } from '../quotation/quotation';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component'; 
import { VideologinPage } from '../videologin/videologin';

/**
 * Generated class for the MypurchasebuydetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mypurchasebuydetails',
  templateUrl: 'mypurchasebuydetails.html',
})
export class MypurchasebuydetailsPage {

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
  profiledata: any;
  subscription: any;
  subscription_id: any;
  chat: any;
  chatroomdata:any;
  toastCtrl: any;
  leaddocuments: Object;
  posted_id: any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http:HttpClient, private storage:Storage,
    public alertCtrl:AlertController) {}
  
  
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

  
  respond(){
    console.log('userdetails',this.logindata);
    console.log('leadsdata',this.details);
    console.log('leads type',this.leadtype);
      this.navCtrl.push(QuotationPage,{'userdetails':this.logindata, 'leaddetails':this.details, 'leadid':this.b_id});
  }
  later(){
    const toast = this.toastCtrl.create({
      message: 'Check it later',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  chatpg(i) {
    if(this.chat==1){
      console.log('Agree clicked');
 var link= MyApp.url+"lead_chat.php";
var chatjsondata=JSON.stringify({
'other_id':this.details[i].posted_by,
'user_id':this.user_id,
});

console.log("sending data",chatjsondata);
this.http.post(link,chatjsondata).subscribe((data)=>{
this.chatroomdata = data;
console.log("chatroomdata data",data)
//alert.present(data);
if(data==1){
  const alert = this.alertCtrl.create({
    title: 'Success!',
    subTitle: 'You just added to chat',
    buttons: ['OK']
  });
alert.present();
  this.navCtrl.push(ChatPage,{
    'chatroom':this.details[i].id,
  });
}else if(data==2){
  const alert = this.alertCtrl.create({
    title: 'Oops!',
    subTitle: 'Your are alreday added..!',
    buttons: ['OK']
  });
  alert.present();
}else if(data==3){
  const alert = this.alertCtrl.create({
    title: 'Oops!',
    subTitle: 'Your have insufficiant credits..!',
    buttons: ['OK']
  });
  alert.present();
}else{
const alert = this.alertCtrl.create({
  title: 'Oops!',
  subTitle: 'Your request for adding is not done!',
  buttons: ['OK']
});
alert.present();
}
});
     
    }else{
      const alert = this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: 'You are not eligible to chat, please check your package',
        buttons: ['OK']
      });
      alert.present();
    }
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyleaddetailsPage');
    this.b_id=this.navParams.get('bid');

    console.log(this.b_id,'id here');
    this.storage.get('userdetails').then((val)=>{
      this.userdetails=val;
      this.user_id=this.userdetails[0].id;
      this.country_id=this.userdetails[0].country_id;
      this.email = this.userdetails[0].email;
      console.log('userdata',this.userdata);
      console.log('countryiid',this.country_id);
      console.log('userdata',this.userdetails);
    
           this.http.get(MyApp.url+"leaddetails.php?id="+this.b_id).subscribe((data) => {
           this.details= data;
           this.posted_id = data[0].posted_by;
           console.log( this.details,'leaddetails');
        
              this.http.get(MyApp.url+"getlead_documents.php?lead_id="+this.b_id+"&user_id="+this.posted_id).subscribe((data)=>{
                this.leaddocuments = data;
                console.log("leaddocuments data",data);
              });       
        
          });

   this.http.get(MyApp.url+"getbuyleads.php?country_id="+this.country_id).subscribe((data)=>{
        this.buyleads = data;
        console.log(this.buyleads,'buy leads');
      });

      this.http.get(MyApp.url+"purchasedleads.php?user_id="+this.user_id).subscribe((sdata)=>{
        this.sellleads = sdata;
        console.log(this.sellleads,'sell leads');
      });
      
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
    this.http.get(MyApp.url + "users_responses.php?lead_id=" + this.b_id+"&user_id="+this.user_id).subscribe((data)=>{
      this.leadresponses = data;
      console.log("response data",data);
    });
    console.log('ionViewDidLoad my purchased buy leads details Page');
  }

}
