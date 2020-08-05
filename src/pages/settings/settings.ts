import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, ModalController, Platform, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FeedbackPage } from '../feedback/feedback';
import { MyApp } from '../../app/app.component';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { MyaccountPage } from '../myaccount/myaccount';
import { Storage } from '@ionic/storage';
//declare var google;


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  
  languages:any;
  plugins:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  userdata: any;
  user_id: any;
  messagecount: Object;
  showcount: any;
 
  
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http: HttpClient,
    public modalCtrl: ModalController,private storage: Storage, public platform: Platform, private socialSharing: SocialSharing) {
     
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
    Back(){
      this.navCtrl.push(MyaccountPage);
    }
  

    ShareApp(){
      var message="This is a nice app";
      var subject = "EXIM App";
      var file = "https://eximbin.com/api/uploads/bg33.jpg";
      var url = "https://eximbin.com";
      this.socialSharing.share(message, subject, file, url).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
    }
    feedback(){
   this.navCtrl.push(FeedbackPage);
   
  }
  


ngOnInit() {
  this.http.get(MyApp.url+"getlanguages.php").subscribe((data)=>{
    this.languages= data;
    console.log('languages',data);
  this.selectedItems = [];
  this.dropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection:true,
  };
});
}
onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}

  ionViewDidLoad() {
    this.http.get(MyApp.url+"getlanguages.php").subscribe((data)=>{
      this.languages= data;
      console.log('languages',data);
    });


    this.storage.get("userdetails").then((val)=>{
      this.userdata= val;
      this.user_id= this.userdata[0].id; 
      
      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })


    })
    //console.log(this.status.value);
    console.log('ionViewDidLoad SettingsPage');
/*     function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    } */
  }

}
