import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController, LoadingController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NotificationInfoPage } from '../notification-info/notification-info';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';
import { FranchisemapPage } from '../franchisemap/franchisemap';
import { viewClassName } from '@angular/compiler';


@Component({
  selector: 'page-req-franchise',
  templateUrl: 'req-franchise.html',
})
export class ReqFranchisePage {
 
  @ViewChild("type") type;
  @ViewChild("country") country;
  @ViewChild("state") state;
  @ViewChild("description") description;
  @ViewChild("business_background") business_background;
  @ViewChild("countryof_origin") countryof_origin;
  @ViewChild("business_info") business_info;
  @ViewChild("url") url;
  @ViewChild("ownership_type") ownership_type;
  @ViewChild("infrastructure") infrastucture;
  @ViewChild("anual_turnover") anual_turnover;
  @ViewChild("willing_tosetup") willing_tosetup;
  userid: any;
  details: any;

  frnchisetypes: any;
  selectedtype = [];
  dropdownSettings2 = {};
  
  continent : any;
  selectedcontinent: any[];
  dropdownContinent: {};
  continentrow: boolean;

  regional : any;
  selectedregional: any[];
  dropdownRegional: {};
  regionalrow: boolean;
  continent_id: any;
  
  countries: any;
  selectedItems = [];
  dropdownSettings = {};
  countryrow: boolean;
  country_id: any;
  
  chapters: any;
  selectedchapter = [];
  dropdownSettings3 = {};
  chapterrow : boolean;
  regional_id: any;

  zones :any;
  selectedzone: any[];
  dropdownZone: {};
  zonerow: boolean;
  zone_id: any;
  
  states: any;
  selectedstate = [];
  dropdownSettings1 = {};
  staterow : boolean;
  state_id: any; 

  hscodes: any;
  selectedhscode = [];
  dropdownHscode = {};
  hscoderow : boolean;
  hscode_id: any; 
  chapter: string;
  request_id: any;
  userdetails: any;
  type_id: any;
  availability: Object;
  message: string;
  emessage: string;
  smessage: string;
  messagecount: Object;
  showcount: any;

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http: HttpClient, public alertCtrl: AlertController,
    private storage: Storage,public loadingCtrl: LoadingController) {
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
  franchisemap() {
    var link = MyApp.url+"checkavailability.php";
    var chkData = JSON.stringify({
      'franchise_type': this.type,
      'country_id' : this.country_id ,
      'state_id': this.state_id
    });
    console.log(chkData);
    this.http.post(link,chkData).subscribe((data)=>{
      this.availability = data;
      console.log(this.availability);
      if(this.availability==0){
        this.smessage = "Hurray.. Position Vacant.. you can proceed";
        this.emessage = "";
      }
      else{
        this.emessage = "Sorry.. Position is already filled. Please try with other options ";
        this.smessage ="";
      }
    })
  }


  submit() {
    
    var link = MyApp.url+"franchise_request.php";
    var myData = JSON.stringify({
      'user_id': this.userid,
      'franchise_type': this.type,
      'country_id': this.country_id,
      'state_id': this.state_id,
      'description': this.description.value,
      'business_background':this.business_background.value,
      'url': this.url.value,
      'countryof_origin': this.countryof_origin.value,
      'business_info':this.business_info.value,
      'infrastructure': this.infrastucture.value,
      'ownership_type':this.ownership_type.value,
      'anual_turnover':this.anual_turnover.value,
      'willing_tosetup':this.willing_tosetup.value,

    });
    console.log("json data", myData);
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure  you want to submit this form',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('cnacel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {

            const loader = this.loadingCtrl.create({
              content: "Data Submitting, Please wait...",
            });
        
            loader.present();

            this.http.post(link, myData).subscribe((data) => {
              this.details = data;
              console.log(this.details, ' request details');
              if (data !== 0) {
                loader.dismiss();
                this.request_id = data;
                this.storage.set("request_id", this.request_id);
                this.navCtrl.push(NotificationInfoPage,{
                  'requestid':this.details
                });
              }
              else {
                loader.dismiss();
                const alert = this.alertCtrl.create({
                  title: 'Sorry !',
                  subTitle: 'Some thing went wrong. Please try after some time',
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

  ngOnInit() {

    /* franchise types*/
    this.http.get(MyApp.url+"getfranchisetypes.php").subscribe((data) => {
      this.frnchisetypes = data;
      console.log(this.frnchisetypes, 'frnchisetypes');
    });
    this.selectedtype = [];
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'id',
      textField: 'franchise',
/*       selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All', */
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    /* Continent List */
    this.http.get(MyApp.url+"getcontinent.php").subscribe((data) => {
      this.continent = data;
      console.log('continent', this.continent);
      this.selectedcontinent = [];
      this.dropdownContinent = {
        singleSelection: true,
        idField: 'id',
        textField: 'gcontinent',
        allowSearchFilter: true,
        closeDropDownOnSelection: true
      };
    });

    /* countries list*/
    this.http.get(MyApp.url+"getcountries.php").subscribe((data) => {
      this.countries = data;
      console.log(this.countries, 'countries');
    });
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'country_id',
      textField: 'name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    /* chapters list */
    this.http.get(MyApp.url+"chapters.php").subscribe((data) => {
      this.chapters = data;
      console.log(this.chapters, 'chapters');
    });
    this.selectedchapter = [];
    this.dropdownSettings3 = {
      singleSelection: true,
      idField: 'id',
      textField: 'chapter_name',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
    /* chapters list */

  }

  onselecttype(type: any) {
    console.log(type, 'type');
    this.type = type.id;
    
      if(type.id==3){
        this.continentrow = true;
        this.regionalrow = false;
        this.countryrow = false;
        this.chapterrow = false;
        this.zonerow = false;
        this.staterow = false;
        this.hscoderow = false;
        this.regional_id ='';
        this.country_id ='';
        this.zone_id ='';
        this.state_id ='';
        this.chapter ='';
        this.hscode_id ='';
      }else{
        if(type.id==4){
          this.continentrow = true;
          this.regionalrow = true;
          this.countryrow = false;
          this.chapterrow = false;
          this.zonerow = false;
          this.staterow = false;
          this.hscoderow = false;
          this.country_id ='';
          this.zone_id ='';
          this.state_id ='';
          this.chapter ='';
          this.hscode_id ='';          
        }else{
          if(type.id==1){
            this.countryrow = true;
            this.continentrow = false;
            this.regionalrow = false;
            this.chapterrow = false;
            this.zonerow = false; 
            this.staterow = false;
            this.hscoderow = false;
            this.continent_id ='';
            this.regional_id ='';
            this.zone_id ='';
            this.state_id ='';
            this.chapter ='';
            this.hscode_id ='';                   
          }else{
            if(type.id==5){
              this.countryrow = true;
              this.chapterrow = true;
              this.continentrow = false;
              this.regionalrow = false;
              this.zonerow = false;
              this.staterow = false;
              this.hscoderow = false;
              this.continent_id ='';
              this.regional_id ='';
              this.zone_id ='';
              this.state_id ='';
              this.hscode_id ='';              
              

            }else{
              if(type.id==6){
                this.countryrow = true;
                this.zonerow = true;
                this.chapterrow = false;
                this.continentrow = false;
                this.regionalrow = false;
                this.staterow = false;
                this.hscoderow = false;  
                this.continent_id ='';
                this.regional_id ='';
                this.state_id ='';
                this.chapter ='';
                this.hscode_id ='';                
                

              }else{
                if(type.id==7){
                  this.countryrow = true;
                  this.zonerow = true;
                  this.chapterrow = true;
                  this.continentrow = false;
                  this.regionalrow = false;
                  this.staterow = false;
                  this.hscoderow = false;
                  this.continent_id ='';
                  this.regional_id ='';
                  this.state_id ='';
                  this.hscode_id ='';                        
                }else{
                  if(type.id==2){
                    this.countryrow = true;
                    this.zonerow = false;
                    this.staterow = true;
                    this.chapterrow = false;
                    this.continentrow = false;
                    this.regionalrow = false;
                    this.hscoderow = false;  
                    this.continent_id ='';
                    this.regional_id ='';
                    this.chapter ='';
                    this.hscode_id ='';
                  }else{
                    if(type.id==8){
                      this.countryrow = true;
                      this.zonerow = true;
                      this.staterow = true;
                      this.chapterrow = true;
                      this.continentrow = false;
                      this.regionalrow = false;
                      this.hscoderow = false;                          
                      this.continent_id ='';
                      this.regional_id ='';
                      this.hscode_id ='';      
                    }else{
                      if(type.id==9){
                        this.continentrow = false;
                        this.regionalrow = false;
                        this.countryrow = true;
                        this.chapterrow = true;
                        this.zonerow = true;
                        this.staterow = true;
                        this.hscoderow = true;
                        this.continent_id ='';
                        this.regional_id ='';                        
                      }else{
                        console.log("Please Select Franchise Type");
                        this.continentrow = false;
                        this.regionalrow = false;
                        this.countryrow = false;
                        this.chapterrow = false;
                        this.zonerow = false;
                        this.staterow = false;
                        this.hscoderow = false;
                        this.continent_id ='';
                        this.regional_id ='';
                        this.country_id ='';
                        this.zone_id ='';
                        this.state_id ='';
                        this.chapter ='';
                        this.hscode_id ='';
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    console.log('typeid : ' , this.type);
  }

 
  onselectcontinent(continentitem : any){
    this.continent_id = continentitem.id;
    console.log("Selected Continent is : ", continentitem);
    
    this.http.get(MyApp.url+"getregional.php?continent_id="+this.continent_id).subscribe((rdata)=>{
      this.regional = rdata;
      console.log("Regional data :", this.regional);
      this.selectedregional = [];
      this.dropdownRegional = {
        singleSelection : true,
        idField : 'id',
        textField : 'continent',
        allowSearchFilter : true,
        closeDropDownOnSelection : true
      };

    });

  }

  onselectregional(items : any){
    this.regional_id = items.id;
    console.log("Selected Regional is : ", items);
  }

  getstates(country: any) {
    this.country_id = country.country_id;
    console.log("Selected Country is : ",country);

    this.http.get(MyApp.url+"getstates.php?country_id=" + this.country_id).subscribe((data) => {
      this.states = data;
      //console.log('states', this.states);
      this.selectedstate = [];
      this.dropdownSettings1 = {
        singleSelection: true,
        idField: 'zone_id',
        textField: 'name',
        allowSearchFilter: true,
        closeDropDownOnSelection: true
      };
    });

    this.http.get(MyApp.url+"getzones.php?country_id=" + this.country_id).subscribe((data) => {
      this.zones = data;
      //console.log('zones', this.zones);
      this.selectedzone = [];
      this.dropdownZone = {
        singleSelection: true,
        idField: 'id',
        textField: 'zone_name',
        allowSearchFilter: true,
        closeDropDownOnSelection: true
      };
    });

  }

  onselectstate(state: any) {
    this.state_id = state.zone_id;
    console.log("Selected State Id is : ", this.state_id);
  }

  onselectchapter(chapter: any) {
    this.chapter = chapter.id;
    console.log("Selected Chapter is : ",chapter);

    var link=MyApp.url+"getpackhsncodes.php";
    var Jsondata=JSON.stringify({
      'chapter_id':chapter.id,
      'country_id': this.country_id
    });
    console.log('jsndata',Jsondata);
    this.http.post(link,Jsondata).subscribe((data)=>{
      this.hscodes=data;
      console.log('hscode data : ',this.hscodes);
      this.selectedhscode = [];
      this.dropdownHscode = {
        singleSelection: true,
        idField: 'hscode',
        textField: 'MyColumn',
        allowSearchFilter: true,
        closeDropDownOnSelection: true          
      };

    });

  }

  onselectzone(items : any){
    this.zone_id = items.id;
    console.log("Selected Zone is : ",items);
  }

  onselecthscode(items: any){
    this.hscode_id = items.hscode;
    console.log("Selected HSCODE is : ",items);
  }
  Back(){
    this.navCtrl.push(CategoriesPage)
  }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad requset franchise page');
    this.storage.get('userdetails').then((val) => {
      this.userdetails = val;
      this.userid = this.userdetails[0].id;
      console.log('userid=', this.userid);

      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.userid).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
    });
    this.continentrow = false;
    this.regionalrow = false;
    this.countryrow = false;
    this.chapterrow = false;
    this.zonerow = false;
    this.staterow = false; 
    this.hscoderow = false;
  }

}