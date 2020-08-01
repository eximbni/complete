import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';


@Component({
  selector: 'page-inviteusers',
  templateUrl: 'inviteusers.html',
})
export class InviteusersPage {
  userdetails:any;
  chapterslist:any;
  user_id:any;
  chapteruserslist :any;
  selectedchapter = {};
  selectedusers = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  chapter_id:any;
  invitedata:any;
  weblink:any;
  webinar_id:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,private storage:Storage, private http:HttpClient,
     public alertCtrl:AlertController) {
    this.webinar_id = this.navParams.get("inviteeid");
  }
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
  getchapter(chapter){
    console.log('chapter',chapter);
    this.chapter_id = chapter.id;
    console.log('chapter',this.chapter_id);
    this.http.get(MyApp.url+"chapter_users.php?chapter_id="+this.chapter_id).subscribe((data)=>{
      this.chapteruserslist =data;
      this.selectedusers = [];
        this.dropdownSettings1 = {
          singleSelection: false,
          idField: 'id',
          textField: 'business_name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,
        };
    console.log('userchaptersdata',this.chapteruserslist);
      });
  }
  getusers(users){
    console.log(users);

  }
  invite(){
    console.log('chapter',this.chapter_id);
    console.log('users',this.selectedusers);
    console.log('user_id',this.user_id);
    if( this.selectedusers && this.user_id!=''){
var link =MyApp.url+"webinarinvitee.php";
var Jdata=JSON.stringify({
  'webinar_id':this.webinar_id,
  'invitee_id':this.selectedusers,
});
console.log('jsondasta',Jdata);
this.http.post(link,Jdata).subscribe((data)=>{
  this.invitedata = data;
  console.log('data',data);
  if(data){
    this.navCtrl.push(WebinarPage);
  }
  else{
    const alert = this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'Something went wrong plaese try after some time',
      buttons: ['OK']
    });
    alert.present();
  }
});
    }
  
  }
  ionViewDidLoad() {
    this.storage.get("userdetails").then((val)=>{
      this.userdetails=val;
      this.user_id=this.userdetails[0].id;
      console.log("userdetails",this.userdetails);
   
    this.http.get(MyApp.url+"getuserchapters.php?user_id="+this.user_id).subscribe((data)=>{
      this.chapterslist =data;
      this.selectedchapter = [];
        this.dropdownSettings = {
          singleSelection: true,
          idField: 'id',
          textField: 'chapter_name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,
          closeDropDownOnSelection:true,
        };
    console.log('userchaptersdata',this.chapterslist);
  });

});
    console.log('ionViewDidLoad InviteusersPage');
  }

}
