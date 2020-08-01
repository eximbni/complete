import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HsCodesPage } from '../hs-codes/hs-codes';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';


@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html',
})
export class ChaptersPage {
  chapters:any;
  id:any;
  chapterdetails:any=[];
  i:any;
  catdetails:any;
  chapdetails:any;
  cat_id:any;
  numbers:any;
  chapterdata :any;
 

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,
    private http:HttpClient, public storage:Storage, ) {

      this.cat_id = navParams.get('cat_id');
      console.log( this.cat_id);
this.http.get(MyApp.url+"getchapters.php?category_id="+this.cat_id).subscribe((data)=>{
  this.chapterdetails=data;
  console.log( this.chapterdetails,'chapters');
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
          this.navCtrl.push(VideologinPage);
         }
quotes(){
  this.navCtrl.push(RfqPage);
}
  hscodes(i){
  this.navCtrl.push(HsCodesPage,
    { 'chap_data':this.chapterdetails[i].id,

    });
    
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
 
ionViewDidLoad(){
  console.log(this.chapterdetails,'hello');
}
}
