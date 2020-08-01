import { Component } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { VideologinPage } from '../videologin/videologin';
import { RfqPage } from '../rfq/rfq';
import { ChatchapterusersmapPage } from '../chatchapterusersmap/chatchapterusersmap';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-chathsnusers',
  templateUrl: 'chathsnusers.html',
})
export class ChathsnusersPage {
  hsncodes:any;
  chapter_id:any;
  chapter_name: any;
  userdata: any;
  user_id: any;
  locations: Object;
  usercount: Object;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http:HttpClient, public storage:Storage) {
    
    this.chapter_id = navParams.get("chapter");//ChatchapterusersPage
    this.chapter_name = navParams.get("chapter_name");
  }
getHsnUsers(i){
  this.navCtrl.push(ChatchapterusersmapPage,{
    'hsnid':this.chapter_id,
  });
}

/* getHsnUsersMap(i){
  this.navCtrl.push(ChatchapterusersPage,{
    'hsnid':this.chapter_id,
  });
}
 */




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
  ionViewDidLoad() {



    console.log("chapter_id:", this.chapter_id)
    this.http.get(MyApp.url+"getchathsncodes.php?chapter_id="+this.chapter_id).subscribe((data)=>{
      this.hsncodes =data;
      console.log('hscodes',this.hsncodes);
    });
    console.log('ionViewDidLoad ChathsnusersPage');

    this.storage.get("userdetails").then((val)=>{
      this.userdata=val;
   //  console.log("userdata=",this.userdata);
      this.user_id=this.userdata[0].id

    this.http.get(MyApp.url+"getchatchapteruserscount.php?chapter_id="+this.chapter_id+"&user_id="+this.user_id).subscribe((data)=>{
      this.usercount=data;
      console.log("usercount details : ",this.usercount);


    });


  });

  }

}
