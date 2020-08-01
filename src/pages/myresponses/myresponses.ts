import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';
 
@Component({
  selector: 'page-myresponses',
  templateUrl: 'myresponses.html',
})
export class MyresponsesPage {
  myresponse:any;
  userdetails:any;
  user_id:any;

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http: HttpClient,
    private storage:Storage) {
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
    this.navCtrl.push(VideologinPage);
  }
  quotes(){
    this.navCtrl.push(RfqPage);
  }
  ionViewDidLoad() {
    this.storage.get("userdetails").then((val)=>{
      this.userdetails=val;
      this.user_id=this.userdetails[0].id;
      console.log("userid=",this.user_id);
   
    this.http.get(MyApp.url+"myresponses.php?user_id="+this.user_id).subscribe((data)=>{
      this.myresponse = data;
      console.log("myresponses",data);
    });
  });
    console.log('ionViewDidLoad MyresponsesPage');
  }

}
