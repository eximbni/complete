import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { VideologinPage } from '../videologin/videologin';
import { RfqPage } from '../rfq/rfq';
import { FranchisemapPage } from '../franchisemap/franchisemap';
import { ReqFranchisePage } from '../req-franchise/req-franchise';

@Component({
  selector: 'page-frrequest',
  templateUrl: 'frrequest.html',
})
export class FrrequestPage {
  request_id: any;
  status: Object;
  req_status: Object;
  user_id: string;
  userdtails: any;
  frdata: any;
  reqstatus: any;
  message: string;
  messagecount: Object;
  showcount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private storage: Storage, public http: HttpClient, private menuCtrl: MenuController) {
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
franchisemap() {
  this.navCtrl.push(FranchisemapPage);
}
Back(){
  this.navCtrl.push(CategoriesPage);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrrequestPage');
    this.storage.get("userdetails").then((val)=>{
      this.userdtails = val;
      this.user_id = this.userdtails[0].id;
      console.log(this.user_id);
      this.http.get(MyApp.url+"getfrrequest_id.php?user_id="+this.user_id).subscribe((rdata)=>{
        this.frdata=rdata; 
        console.log(this.frdata);
        this.request_id = this.frdata.request_id;
      if(!this.request_id){
        alert("There are no Pending requests for this user. Kindly submit a new  Request if you are Interested to become franchise owner");
        this.navCtrl.push(ReqFranchisePage);
      }
      this.http.get(MyApp.url+"frrequest_status.php?request_id="+this.request_id).subscribe((data)=>{
        this.status = data;
        this.reqstatus = this.status[0].status
        console.log("Request Sttus:", this.status);
        if(this.reqstatus==0){
          this.message = "Your Request Submited sucessfully and peding for approval"
        }
        else{
          if(this.reqstatus==2){
            this.message = "Your Application is under Verification Process"
          }
          else{
            if(this.reqstatus==3){
              this.message = "We are Processing Your Request."
            }
            else{
              if(this.reqstatus==1){
                this.message = "You are already been awarded Franchise"
              }
            }
          }
        }
      })
  })

  this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
    this.messagecount=count;
    this.showcount = this.messagecount[0].unreadMsgs;
    console.log('Message Count:', this.messagecount);
  })



})


  }

}
