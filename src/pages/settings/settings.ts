import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, ModalController, Platform, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FeedbackPage } from '../feedback/feedback';
import { MyApp } from '../../app/app.component';
import { SocialSharing } from '@ionic-native/social-sharing';

//declare var google;


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  @ViewChild("status")status;
  languages:any;
  plugins:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
 
  
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http: HttpClient,
    public modalCtrl: ModalController, public platform: Platform, private socialSharing: SocialSharing) {
     
    }

    toggleMenu() {
      this.menuCtrl.toggle();
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
    //console.log(this.status.value);
    console.log('ionViewDidLoad SettingsPage');
/*     function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    } */
  }

}
