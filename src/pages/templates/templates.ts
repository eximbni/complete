import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { SendquotePage } from '../sendquote/sendquote';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-templates',
  templateUrl: 'templates.html',
})
export class TemplatesPage {
  templates:any;
  previews:any;
  user_id:any;
  userid:any;
  userdetails:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http: HttpClient, private storage: Storage) {
  //this.userid=navParams.get('userid');
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  preview(){
    console.log('user id is',this.userid);
    this.http.get(MyApp.url+"getleadpreview.php?user_id="+this.userid).subscribe((data)=>{
this.previews=data;
console.log('previews',this.previews);
    });
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
  Send(){
    this.navCtrl.push(SendquotePage);
  }

  ionViewDidLoad() { 
    this.storage.get('userdetails').then((val) => {
      this.userdetails = val;
    console.log('user details is', val);
  });
  this.http.get(MyApp.url+"gettemplates.php").subscribe((data)=>{
    this.templates=data;
    console.log(this.templates, "templates");
  });
    console.log('ionViewDidLoad TemplatesPage');
  }

}
