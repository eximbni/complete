import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { RequirementPage } from '../requirement/requirement';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat'; 
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';


@Component({
  selector: 'page-lead-details',
  templateUrl: 'lead-details.html',
})
export class LeadDetailsPage {
  userdetails: any; username: any; email: any;
  s_id: any;
  details: any;
  chaptername: any;
  expiry_date: any;
  description: any;
  hsncode: any;
  quantity: any;
  uom: any;
  product: any; logindata: any;
  countryname: any;
  leadtype: any; lead_id: any;
  user_id: any;
  profiledata: any;
  subscription: any;
  subscription_id: any;
  chat: any;
  chatroomdata:any;

  public sendTo   : any;
  public subject  : string = 'Message from MIIOS App';
  public message  : string = 'Experience the easyness of imports and exports'+this.product+","+this.quantity+this.uom+" form "+this.countryname;
  public image    : string	= 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
  public url      : string	= 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient, private storage: Storage, public menuCtrl: MenuController,public alertCtrl:AlertController,
    public toastCtrl:ToastController) {

    this.menuCtrl.enable(true, "sideMenu");
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

 
  home() {
    this.navCtrl.push(CategoriesPage);
  }
  leads() {
    this.navCtrl.push(LeadsPage);
  }
  chatting() {
    this.navCtrl.push(ChatPage);
  }
  webinar() {
    this.navCtrl.push(VideologinPage);
  }
  quotes() {
    this.navCtrl.push(RfqPage);
  }
  leadspg() {
    this.navCtrl.push(LeadsPage);
  }
  respond() {
    console.log('leadsdata', this.details);
    console.log('leads type', this.leadtype);
    this.navCtrl.push(RequirementPage, { 'userdetails': this.userdetails, 'leaddetails': this.details, 'leadid': this.s_id });
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
console.log("data",data)
if(data==1){
const alert = this.alertCtrl.create({
  title: 'Success!',
  subTitle: 'You have successfully added this user to the Chat option. You can now initiate chat conversation with this user',
  buttons: ['OK']
});
alert.present();
this.navCtrl.push(ChatPage);
}
else{
  if(data==2){
    const alert = this.alertCtrl.create({
      title: 'Already Exixts!',
      subTitle: 'This Chatroom already exists. Click OK to go to the Chat room',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(ChatPage,{
      'chatroom':this.details[i].id,
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
}
});
     
    }else{
      const alert = this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: 'You are not eligible to initiate this chat. Please purchase a package with Chat option included',
        buttons: ['OK']
      });
      alert.present();
    }
   
  }
  showdocs(){
    console.log("docs page");
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
  ionViewDidLoad() {
    this.s_id = this.navParams.get('sid');
    console.log('ionViewDidLoad sellleaddetailsPage');
    console.log(this.s_id, 'id here');

    this.http.get(MyApp.url + "leaddetails.php?id=" + this.s_id).subscribe((data) => {
      this.details = data;
      this.leadtype = this.details[0].lead_type;
      this.lead_id = this.details[0].id;
      console.log(this.details, 'leaddetails');
      console.log('lead-type=', this.leadtype);
      console.log('lead-id=', this.leadtype);
    });
    this.storage.get('userdetails').then((val) => {
      this.userdetails = val;
      this.username = this.userdetails[0].name;
      this.email = this.userdetails[0].email;
      this.user_id = this.userdetails[0].id;
      console.log('userdata', this.userdetails);
      console.log('username', this.username);
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
  }


}
