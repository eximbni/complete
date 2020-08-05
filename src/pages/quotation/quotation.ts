import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { TemplatesPage } from '../templates/templates';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the QuotationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quotation',
  templateUrl: 'quotation.html',
})
export class QuotationPage {
  @ViewChild("uom")uom;
  @ViewChild("costperunit")costperunit;
  @ViewChild("totalcost")totalcost;
  @ViewChild("Avilableqty")Avilableqty;
  @ViewChild("description")description;
  
  logindata:any;
  leaddetails:any;
  leadid:any; 
  country:any; 
  companyname:any;
  sellername:any;
   product:any;
  qty:any;
  unitmeasure: any; 
  Quotationdata :any;
  userdata:any;
  user_id:any;
  product_id:any;
  leadref_id:any;
  leadposted_by:any;
  lead_id:any;
  leaddetails1:any;
  messagecount: Object;
  showcount: any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http: HttpClient, public alertCtrl:AlertController,
     private storage:Storage) {}

  
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
  
  QuotaionSend(){
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you agree to send Quotation',
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
           console.log("leadposted_by",this.leadposted_by);
           console.log("leadref_id",this.leadref_id,);
           console.log("user_id",this.user_id,);
            var link=MyApp.url+"postbuyleadrequirement.php";
            var jsondata=JSON.stringify({
              'response_posted_by':this.user_id,
              'lead_posted_by':this.leadposted_by,
              'lead_id':this.leadid,
              'leadref_id':this.leadref_id,
              'uom':this.unitmeasure,
              'product_id':this.product_id,
              'costperunit':this.costperunit.value,
              'totalcost':this.totalcost.value,
              'response_quantity':this.Avilableqty.value,
              'description':this.description.value,
            });
            console.log("json data",jsondata);
            this.http.post(link,jsondata).subscribe((data)=>{
              this.Quotationdata = data;
              console.log('return data',data);
              if(data==1){
                this.navCtrl.push(TemplatesPage);
              }else{

              }
            });
            
          }
        }
      ]
    });
    confirm.present();

  }

  ionViewDidLoad() {
   
    this.leaddetails = this.navParams.get('leaddetails');
     this.leadid = this.navParams.get('leadid');
     this.sellername = this.leaddetails[0].name;
     this.companyname = this.leaddetails[0].business_name;
     this.country = this.leaddetails[0].countryname;
     this.product = this.leaddetails[0].product;
     this.product_id = this.leaddetails[0].product_id;
     this.qty = this.leaddetails[0].quantity;
     this.unitmeasure = this.leaddetails[0].uom;
     this.leadref_id= this.leaddetails[0].leadref_id;
    this.leadposted_by= this.leaddetails[0].posted_by;

     console.log('userdetails',this.logindata,
     'name', this.sellername,
     'company',this.companyname, 
     'country',this.country,
     'prodcut', this.product ,
      'uom',  this.unitmeasure,
      'quantity',this.qty  );
     
     console.log('leaddetails',this.leaddetails);
     console.log('lead_id',this.leadid);
    this.http.get(MyApp.url+"leaddetails.php?id="+this.leadid).subscribe((edata) => {
      this.leaddetails1= edata;
       console.log( this.leaddetails1,'leaddetails');
     });
     this.storage.get("userdetails").then((val)=>{
       this.userdata = val;
       this.user_id=this.userdata[0].id;
       console.log("ud=ser_id",this.user_id)
       this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
     })
    console.log('ionViewDidLoad QuotationPage');
  }

}
