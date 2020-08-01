import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { VideologinPage } from '../videologin/videologin';

/**
 * Generated class for the MypackagedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mypackagedetails',
  templateUrl: 'mypackagedetails.html',
})
export class MypackagedetailsPage {
  userdata: any;
  user_id: any;
  packs: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public http: HttpClient, public menuCtrl: MenuController) {
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
    console.log('ionViewDidLoad MypackagedetailsPage');
    this.storage.get("userdetails").then((val)=>{
      this.userdata = val;
      this.user_id= this.userdata[0].id;
      console.log(this.user_id,"User_id")
      this.http.get(MyApp.url+"getuserprofile.php?user_id="+this.user_id).subscribe((data)=>{
        console.log(data);
        this.packs = data;

      })
    })
  }

}
