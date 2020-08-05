import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

import { HttpClient } from '@angular/common/http';
//import { HspostleadPage } from '../hspostlead/hspostlead';
import { AddhscodePage } from '../addhscode/addhscode';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { Storage } from '@ionic/storage';
import { VideologinPage } from '../videologin/videologin';
import { IdontknowhscodePage } from '../idontknowhscode/idontknowhscode';


@Component({
  selector: 'page-hssearch',
  templateUrl: 'hssearch.html',
})
export class HssearchPage {
  searchresult: any;
  @ViewChild('product') product;
  userdata: any;
  country_id: any;
  user_id: any;
  messagecount: Object;
  showcount: any;

  constructor(public navCtrl: NavController,public menuCtrl:MenuController,
     public navParams: NavParams, private http:HttpClient, public loadingCtrl: LoadingController, public storage:Storage) {
  }
  searchProduct(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.http.get(MyApp.url+'searchproduct.php?product='+this.product.value+'&country_id='+this.country_id). subscribe((data)=>{
      this.searchresult=data;
      console.log('hscodesnad chapters',this.searchresult)
      if(this.searchresult==0){
        alert("Sorry we are unable to find Product you are searching for. if you still like to post a requirement Please contact Admin");
        this.navCtrl.push(AddhscodePage);
      }
      
    })
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  Back(){
    this.navCtrl.push(RfqPage);
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

  postlead(i){
    console.log(" postlead " , this.searchresult[i].chapter_id,this.searchresult[i].hscode,this.searchresult[i].english)
     this.navCtrl.push(IdontknowhscodePage,{
      'chapter_id':this.searchresult[i].chapter_id,
      'hsndescription':this.searchresult[i].english,
      'hsncode':this.searchresult[i].hscode,
    })  
  }
  addhscode(){
    this.navCtrl.push(AddhscodePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HssearchPage');
    this.storage.get("userdetails").then((val)=>{
      this.userdata=val;
      this.country_id = this.userdata[0].country_id;
      this.user_id=this.userdata[0].id;
      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
      console.log("country ID is: ", this.country_id);
    })
  }

}
