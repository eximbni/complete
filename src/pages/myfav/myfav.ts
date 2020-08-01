import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { CategoriesPage } from '../categories/categories';
import { VideologinPage } from '../videologin/videologin';

/**
 * Generated class for the MyfavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-myfav',
  templateUrl: 'myfav.html',
})
export class MyfavPage {
  userdata: any;
  user_id: any;
  favdata: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, 
    public storage: Storage, public http:HttpClient) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
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
    home(){
      this.navCtrl.push(CategoriesPage);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyfavPage');
    this.storage.get("userdetails").then((val)=>{
      this.userdata = val;
      this.user_id = this.userdata[0].id;
      this.http.get(MyApp.url+"getfavhscodes.php?user_id="+this.user_id).subscribe((data)=>{
        this.favdata =data;
        console.log("Fav Data:", this.favdata);
      })
    })
  }

}
