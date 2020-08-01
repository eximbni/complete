import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HsCodesPage } from '../hs-codes/hs-codes';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';


@Component({
  selector: 'page-level3',
  templateUrl: 'level3.html',
})
export class Level3Page {
  chap_data: any;
  response: any;
  level3: any;
  level3fr: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient , public menuCtrl: MenuController) {
   this.chap_data= this.navParams.get("chap_data")
   console.log(this.chap_data);
   this.http.get(MyApp.url+"getlevel3.php?chapter_id="+this.chap_data).subscribe((data)=>{
     this.response = data;
     console.log(this.response);
     
   })

  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  hscodes(i){
    this.navCtrl.push(HsCodesPage,{
      'chap_data':this.response[i].hscode
    })
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
    console.log('ionViewDidLoad Level3Page');
  }

}
