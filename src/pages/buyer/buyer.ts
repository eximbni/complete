import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
//import { AnyARecord } from 'dns';


/**
 * Generated class for the BuyerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-buyer',
  templateUrl: 'buyer.html',
})
export class BuyerPage {
  userdetails:any;
  chapters:any;
  
selectedItems = {};
dropdownSettings = {};
user_id:any;
country_id:any;
chapterid:any;
buyerslist:any;
  onlinebuyerslist: any;
  leadpostbuyerslist: any;
  pet:any
  constructor(public navCtrl: NavController,public navParams: NavParams, private http:HttpClient, private storage :Storage,
    public menuCtrl:MenuController) {
      this.pet="kittens";
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
  this.navCtrl.push(WebinarPage);
}
quotes(){
  this.navCtrl.push(RfqPage);
}

ngOnInit() {
  this.storage.get("userdetails").then((val)=>{
    this.userdetails =val;
    this.user_id = this.userdetails[0].id;
    console.log('id',this.user_id);
    console.log('userdetails',val);
    
  this.http.get(MyApp.url+"getuserchapters.php?user_id="+this.user_id).subscribe((data)=>{
    this.chapters = data;
      console.log( this.chapters,'chapters');
    });
    console.log(this.chapters,'chapter names');
  });
 

 this.selectedItems = {};
 console.log(this.selectedItems ,'selected list');
  this.dropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'ch_description',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
   // itemsShowLimit: '3',
    //limitSelection:this.count,
    allowSearchFilter: false
  };
}
onItemSelect(item: any) {
  console.log(item,'selecteditem');
console.log(item.id,'id no');
this.chapterid =item.id;
this.http.get(MyApp.url+"getbuyerslist.php?country_id="+this.country_id+"&chapter_id="+this.chapterid).subscribe((data)=>{
  console.log('buyers list',data);
  this.buyerslist = data;
});
this.http.get(MyApp.url+"getonlinebuyerslist.php?country_id="+this.country_id+"&chapter_id="+this.chapterid).subscribe((odata)=>{
  console.log('buyers list',odata);
  this.onlinebuyerslist = odata;
});
this.http.get(MyApp.url+"getleadpostbuyerslist.php?country_id="+this.country_id+"&chapter_id="+this.chapterid).subscribe((ldata)=>{
  console.log('buyers list',ldata);
  this.leadpostbuyerslist = ldata;
});
}
  ionViewDidLoad() {
    this.storage.get("userdetails").then((val)=>{
      this.userdetails =val;
      this.user_id = this.userdetails[0].id;
      this.country_id = this.userdetails[0].country_id;
      console.log('id',this.user_id); console.log('id',this.country_id);
      console.log('userdetails',val);
    });
   
    console.log(BuyerPage);
   
  }
 

}
