import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RequirementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-requirement',
  templateUrl: 'requirement.html',
})
export class RequirementPage {
  @ViewChild("quantity") quantity;
  @ViewChild("description") description;
  userdetails:any;
  leaddetails: any;
  leadid: any;
  country: any;
  companyname: any;
  sellername: any; 
  product: any;
  qty: any; uom: any;
  unitmeasure: any; 
  requirementdata: any;
  leadref_id: any;
  lead_posted_by: any;
  user_id: any;
  product_id: any;
  dropdownSettings = {};
  dropdownList = [];
  requirment_type: any;
  messagecount: Object;
  showcount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private http: HttpClient,
    public alertCtrl: AlertController, private storage:Storage) {
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
    this.navCtrl.push(WebinarPage);
  }
  quotes() {
    this.navCtrl.push(RfqPage);
  }

  RequirementSend() {
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you agree to post this requirement ?”',
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
            console.log('no api link url ');
            var link = MyApp.url+"postsellleadrequirement.php";
            var jsondata = JSON.stringify({
              'response_quantity': this.quantity.value,
              'description': this.description.value,
              'req_type': this.requirment_type,
              'uom': this.unitmeasure,
              'product_id': this.product_id,
              'lead_id': this.leadid,
              'leadref_id': this.leadref_id,
              'lead_posted_by': this.lead_posted_by,
              'user_id': this.user_id,
            });
            console.log('json data', jsondata);
            this.http.post(link, jsondata).subscribe((data) => {
              this.requirementdata = data;
              console.log('data response=', data);
              if (data == 1) {
                const alert = this.alertCtrl.create({
                  title: 'Success!',
                  subTitle: 'Your response has been submitted successfully',
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.push(LeadsPage);
              }
              else {
                const alert = this.alertCtrl.create({
                  title: 'Oops!',
                  subTitle: 'There seems to be a technical problem. Please contact our admin team. Sorry for the inconvenience',
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
  /*---  dropdown ---*/
  ngOnInit() {
    this.dropdownList = [
      { id: 'immediate', name: 'Immediate' },
      { id: 'week', name: '7 Days' },
      { id: 'month', name: '30 Days' },
      { id: 'regular', name: 'Regular' },
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      //selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
  }
  onItemSelecttype(item: any) {
    console.log(item, 'req type ');
    this.requirment_type = item.id;
    console.log('type assign=', this.requirment_type);
  }
  ionViewDidLoad() {
    this.storage.get("userdetails").then((val)=>{
      this.userdetails = val;
      this.user_id = this.userdetails[0].id;
      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
    });
    console.log('userdetails', this.userdetails);
    this.leaddetails = this.navParams.get('leaddetails');
    this.leadid = this.navParams.get('leadid');
    this.sellername = this.leaddetails[0].name;
    this.companyname = this.leaddetails[0].business_name;
    this.country = this.leaddetails[0].countryname;
    this.product_id = this.leaddetails[0].product_id;
    this.qty = this.leaddetails[0].quantity;
    this.unitmeasure = this.leaddetails[0].uom;
    this.leadref_id = this.leaddetails[0].leadref_id;
    this.lead_posted_by = this.leaddetails[0].posted_by;
    console.log('name', this.sellername, 'company', this.companyname, 'country', this.country, 'prodcut', this.product,
      'uom', this.unitmeasure, 'quantity', this.qty);
    
    console.log('leaddetails', this.leaddetails);
    this.http.get(MyApp.url+"leaddetails.php?id=" + this.leadid).subscribe((data) => {
      this.leaddetails = data;
      console.log(this.leaddetails, 'leaddetails');
    });
    console.log('ionViewDidLoad RequirementPage');
  }

}
