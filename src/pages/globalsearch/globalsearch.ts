import { IdontknowhscodePage } from './../idontknowhscode/idontknowhscode';
import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GoogleMapPage } from '../google-map/google-map';
import { HsnleadsPage } from '../hsnleads/hsnleads';
import { HspostleadPage } from '../hspostlead/hspostlead';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { AddhscodePage } from '../addhscode/addhscode';
import { Storage } from '@ionic/storage';
import { VideologinPage } from '../videologin/videologin';

/**
 * Generated class for the GlobalsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info onio
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-globalsearch',
  templateUrl: 'globalsearch.html',
})
export class GlobalsearchPage {
hsdetails:any;
@ViewChild('product') product;
  searchresult: any;
  hsn_code: any;
  mapusers: Object;
  userdata: any;
  country_id: any;
  user_id: any;
  messagecount: Object;
  showcount: any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, 
    public navParams: NavParams, private http: HttpClient, public loadingCtrl: LoadingController, public storage:Storage) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  searchProduct(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.http.get(MyApp.url+'searchproduct.php?product='+this.product.value+'&country_id='+this.country_id). subscribe((data)=>{
      this.searchresult=data;
      console.log(this.searchresult)
    })
  }


Maps(i){
  this.hsn_code= this.searchresult[i].hsncode;
  console.log(this.hsn_code);
  var link = MyApp.url+"hsnmapusers.php";
  var Mydata = JSON.stringify({
    'hsn_code':this.hsn_code
  });
  console.log(Mydata);
  this.http.post(link,Mydata).subscribe((data)=>{
    this.mapusers = data;
  });
  console.log(this.mapusers,"testing mapdata")
  this.navCtrl.push(GoogleMapPage,{
    'mapusers':this.mapusers
  })

}

Leads(i){
  this.navCtrl.push(HsnleadsPage,{
    'hsncode':this.searchresult[i].id,
  });
}
Post(i){
  console.log(this.searchresult[i].id);
  this.navCtrl.push(IdontknowhscodePage,{
    'hsncode': this.searchresult[i].hscode,
    'chapter_id': this.searchresult[i].chapter_id,
    'hsndescription': this.searchresult[i].english,
    //'hsncode': this.searchresult[i].hscode,
  })
}

Back(){
  this.navCtrl.push(CategoriesPage);
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
addhscode(){
  this.navCtrl.push(AddhscodePage)
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlobalsearchPage');
    this.storage.get("userdetails").then((val)=>{
      this.userdata = val;
      this.country_id = this.userdata[0].country_id
      console.log("country_id",this.country_id);
      this.user_id = this.userdata[0].id; 
      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })


    })
   
  }

}
