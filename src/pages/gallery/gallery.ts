import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { WebinarPage } from '../webinar/webinar';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  showvidoeo:any=false;
  userdetails: any;
  user_id: any;
  country_id: any;
  messagecount: any;
  showcount: any;
  

  constructor(public navCtrl: NavController,public menuCtrl:MenuController,private http: HttpClient,  public navParams: NavParams,private storage :Storage) {
   
  }
    
  closeVideo(){
    this.showvidoeo=false;
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
  
  showvideo(){
    this.showvidoeo=true;
  }

  Back(){
    this.navCtrl.push(CategoriesPage);
  }
  ionViewDidLoad() {
    this.storage.get("userdetails").then((val)=>{
      this.userdetails =val;
      this.user_id = this.userdetails[0].id;
      this.country_id = this.userdetails[0].country_id;
      console.log('id',this.user_id); console.log('id',this.country_id);
      console.log('userdetails',val);
      
      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
      
    });
   
   
  }

}
