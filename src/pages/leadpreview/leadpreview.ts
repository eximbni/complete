import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { OtppostPage } from '../otppost/otppost';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { VideologinPage } from '../videologin/videologin';
import { RfqPage } from '../rfq/rfq';
import { LeadtermsPage } from '../leadterms/leadterms';

/**
 * Generated class for the LeadpreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-leadpreview',
  templateUrl: 'leadpreview.html',
})
export class LeadpreviewPage {
  leaddata: any;
  userdata: any;
  country_id: any;
  user_id: any;
  mobile: any;
  userid: string;
  userprofile: any;
  usermobileno: any;
  business_name: any;
  email: any;
  regdno: any;
  special_istructions: any;
  business_address: any;
  hscode: any;
  description: any;
  uom: any;
  quantity: any;
  price_option: any;
  price: any;
  port: any;
  countries: any;
  formdata: Object;
  indexer:boolean;
  available_time: string;
  terms_checked:any=0;
  impexpmob: any;
  uomname: any;
  impexpmail: any;
  curreny: any;
  loading_port: any;
  destination_port: any;
  loading_port_type: any;
  destination_port_type: any;
  price_model: any;
  lead_ref_id: Object;
  messagecount: Object;
  showcount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public http:HttpClient, 
    public toastCtrl: ToastController,private loadingCtrl : LoadingController) {
    this.leaddata = this.navParams.get("pagedata")
    console.log("toal Data:", this.leaddata)
    this.business_address= this.navParams.get("business_address");
    console.log(this.business_address)
    this.hscode = this.navParams.get("hsncode_id");
    console.log(this.hscode);
    this.description = this.navParams.get("description");
    this.uom = this.navParams.get("uom_id");
    this.uomname = this.navParams.get("uom")
    this.quantity = this.navParams.get("quantity");
    this.price_option = this.navParams.get("price_option")
    this.price_model = this.price_option;
     
    this.price = this.navParams.get("price_inusd");
    this.special_istructions =this.navParams.get("special_instruc");
    this.port = this.navParams.get("port_id");
    this.impexpmob = this.navParams.get("impexpmobile");
    this.impexpmail = this.navParams.get("impexpmail");
    this.curreny = this.navParams.get("currency");
    this.loading_port = this.navParams.get("loading_port");
    this.destination_port = this.navParams.get("destination_port");
    this.loading_port_type = this.navParams.get("loading_port_type");
    this.destination_port_type = this.navParams.get("destination_port_type")
    //this.countries = this.leaddata.country.name

  }
  indexed(){
    console.log(this.indexer);
    if(this.indexer=true){
      this.terms_checked=1;
    }
    
    
  }
  postlead(){
    if(this.terms_checked==1){

      const loader = this.loadingCtrl.create({
        content: "Data Submitting, Please wait...",
      });
  
      loader.present();

    var link=MyApp.url + "postleads.php";
    var totaldata=this.leaddata
    this.http.post(link, totaldata).subscribe((data) => {
      this.formdata = data;
      console.log("Posted Leads details : ",this.formdata);
      if(data==0){
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'There seems to be a technical problem. Please contact our admin team. Sorry for the inconvenience',
          duration: 3000
        });
        toast.present();
      }
      else{
        
        loader.dismiss();
         this.lead_ref_id = this.formdata
         this.storage.set("lead_ref_id", this.lead_ref_id);
        this.navCtrl.push(OtppostPage, {
          'leadref_id': this.formdata,
          'impexpmobile': this.impexpmob,
          'impexpmail':this.impexpmail
        });
      } 
     

    });
  }
  else{
    alert("Please Accet terms and conditions to post lead");
  }
}

leadterms(){
  this.navCtrl.push(LeadtermsPage)
}
  home() {
    this.navCtrl.push(CategoriesPage);
  }
  leads() {
    this.navCtrl.push(LeadsPage, { user_id: this.user_id });
  }
  chatting() {
    this.navCtrl.push(ChatPage, { user_id: this.user_id });
  }
  webinar() {
    this.navCtrl.push(VideologinPage);
  }
  quotes() {
    this.navCtrl.push(RfqPage, { user_id: this.user_id });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadpreviewPage');
    this.storage.get("userdetails").then((val) => {
      this.userdata = val;
        console.log('userprofile data',this.userdata);
        this.business_name=this.userdata[0].business_name;
        this.email = this.userdata[0].email;
        this.regdno = this.userdata[0].ieccode;
        this.regdno = this.userdata[0].gstno;
        this.mobile = this.userdata[0].mobile;
        this.user_id = this.userdata[0].id;
        //this.business_address = this.userdata[0].business_address;
        this.available_time= this.userdata[0].from_time+"to"+this.userdata[0].to_time

        this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
          this.messagecount=count;
          this.showcount = this.messagecount[0].unreadMsgs;
          console.log('Message Count:', this.messagecount);
        })

  });
  }
}
