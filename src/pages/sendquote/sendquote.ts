import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http'; 
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-sendquote',
  templateUrl: 'sendquote.html',
})
export class SendquotePage {
  lead_ref_id: any;
  userdata: any;
  user_id: any;
  messagecount: any;
  showcount: any;
  

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, public http:HttpClient, public storage:Storage) {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad SendquotePage');
    this.storage.get("lead_ref_id").then(val=>{
      this.lead_ref_id =val;
    });


    this.storage.get("userdetails").then((val) => {
      this.userdata = val;
        console.log('userprofile data',this.userdata); 
        this.user_id = this.userdata[0].id; 

        this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
          this.messagecount=count;
          this.showcount = this.messagecount[0].unreadMsgs;
          console.log('Message Count:', this.messagecount);
        })

  });




  }

}
