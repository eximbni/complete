import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { EmailverificationPage } from '../emailverification/emailverification';
import { ModalController } from 'ionic-angular';


@Component({
  selector: 'page-package',
  templateUrl: 'package.html',
})
export class PackagePage {
 
  @ViewChild("type") type;
  @ViewChild("description") description;
  @ViewChild("country") country;

  ChapterList = [];
  HscodesList = [];
  selectedItems = {};
  selectedhscodes={};
  promocode :any;
  dropdownSettings = {};
  dropdownSettings1 = {};
  chapters: any;
  ChapList: any;
  plan: any;
  chaplimit: any;
  duration: any;
  chpaters: any;
  cost: any;
  desc: any;
  packdetails: any;
  user_id: any;
  count: any;
  userid: any;
  country_id: any;
  MenuController: any;
  subscription_id: any;
  state_id: any;
  signupdata: any;
  credits: any;
  types: any; 
  u_id: any;
  countries: any;
  details: any;
  plan_name:any;
  chap_id:any;
  hsdetails:any;
  hscount:any;
  plan_cost: any;
  monthly_cost: any;
  coupons: any;
  hsdiv:any=false;
  email: any;
  constructor(public navCtrl: NavController,public navParams: NavParams,
    private http: HttpClient, private storage: Storage, public toastCtrl: ToastController, public menuCtrl: MenuController,
    public alertCtrl: AlertController, public modalCtrl: ModalController, public platform:Platform,
    public loadingCtrl: LoadingController) {
      platform.registerBackButtonAction(() => {
      },1);
      this.count = this.navParams.get("chapters");
    this.hscount = this.navParams.get("hscodes");
 
    this.menuCtrl.enable(false, "sideMenu");
    this.credits = navParams.get('credits');
    this.country_id = navParams.get('country');
    this.plan_name = navParams.get("plan_name");
    this.plan_cost = navParams.get("plan_cost");
    this.monthly_cost = navParams.get("monthly_cost");
    this.coupons = navParams.get("coupons");
    console.log('userid=', this.user_id,
      'credits=', this.credits,
      'country_id=', this.country_id,
      'chpater_count=', this.count);
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  anual(){
    this.duration="365";
  }
  monthly(){
    this.duration="30";
  }
  close(){
    this.hsdiv=false;
  }

  submit() {
    console.log('chapters', this.selectedItems);
console.log('hscose',this.selectedhscodes);
console.log("Promo Code",this.promocode)
const loader = this.loadingCtrl.create({
  content: "Adding Chapters and Creating your Wallet, Please wait...",
});
loader.present();
    var link = MyApp.url+"usersubscription.php";
    var Jdata = JSON.stringify({
      'user_id': this.user_id,
      'chapters': this.selectedItems,
      //'hscodes':this.selectedhscodes,
      'pack_id': this.subscription_id,
      'duration': this.duration,
      'country_id': this.country_id,
      'state_id': this.state_id,
      'credits': this.credits,
      'plan_name':this.plan_name,
      'coupons':this.coupons
    });
    console.log(Jdata);
    this.http.post(link, Jdata).subscribe((cdata) => {
      this.packdetails = cdata;
      console.log(cdata, 'free package details');
      if (cdata) {
        loader.dismiss();
        this.navCtrl.push(EmailverificationPage)
      }
      else {
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Something  went wrong!',
          buttons: ['OK'],
          cssClass: 'buttoncss'
        });
        alert.present();
      }

    });
  }

  //packages multiselect list
  ngOnInit() {
    this.http.get(MyApp.url+"chapters.php").subscribe((data) => {
      this.chapters = data;
      this.ChapList = this.chapters;
      console.log(this.chapters, 'chapters');
    });
    console.log(this.chapters, 'chapter names');

    this.selectedItems = {};
    console.log(this.selectedItems, 'selected list');
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'MyColumn',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      limitSelection:this.count,
      
    };
  }
  onSelectAll(items: any ) {
    console.log('items',items);
    console.log(this.selectedItems[items].id, 'selected _items total');
  }
  onItemSelect(item: any) {
    console.log(item, 'selecteditem');
    console.log(item.id, 'id no');
    this.chap_id=item.id;
    console.log(this.selectedItems[0].id);
    var link=MyApp.url+"getpackhsncodes.php";
    var Jsondata=JSON.stringify({
      'chapter_id':item.id,
      'country_id': this.country_id
    });
    console.log('jsndata',Jsondata);
    this.http.post(link,Jsondata).subscribe((data)=>{
  this.hsdetails=data;
  if(data){
    this.hsdiv=true;
  }
  console.log('hscode',this.hsdetails);

  this.selectedhscodes = {};
  console.log(this.selectedhscodes, 'selected list');
  this.dropdownSettings1 = {
    singleSelection: false,
    idField: 'hscode',
    textField: 'MyColumn',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
        
  };

});
  }
  onhscodeselect(hscode){
    console.log("hscode",hscode);

  }
onallhscodes(hscodes){
  console.log("hscodes all",hscodes);


} 

  ionViewDidLoad() {
    this.storage.get('userdetails').then((val) => {
      this.signupdata = val;
      console.log(this.signupdata, 'signupdata');
      this.user_id = this.signupdata[0].id;
      this.country_id = this.signupdata[0].country_id;
      this.state_id = this.signupdata[0].state_id;
      this.email = this.signupdata[0].email;
      console.log('userid', this.user_id)
    })
    this.subscription_id = this.navParams.get("subscription_id");
    //this.duration = this.navParams.get("duration");
    this.country_id = this.navParams.get("country_id");


  }

}
