import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { CreatempinPage } from '../creatempin/creatempin';



@Component({
  selector: 'page-emailverification',
  templateUrl: 'emailverification.html',
})
export class EmailverificationPage {
  userdata: any;
  email: any;
  user_id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public storage:Storage, public http:HttpClient, public platform:Platform) {
      platform.registerBackButtonAction(() => {
      },1);
  }
  emailchk(){
    this.http.get(MyApp.url+"checkmailstatus.php?user_id="+this.user_id).subscribe((data)=>{
      if(data==1){
        alert("Email successfully verified. Your registration is now complete");
        this.navCtrl.push(CreatempinPage);
      }
      else{
        alert("An e-mail has been send to your registered email ID. Kindly verify the e-mail link and click on the submit button below")
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailverificationPage');
    this.storage.get('userdetails').then((val) => {
      this.userdata = val;
      this.user_id = this.userdata[0].id;
      this.email = this.userdata[0].email;
      this.http.get(MyApp.url+"emailverification.php?user_id="+this.user_id+"&email="+this.email).subscribe((data)=>{
        if(data==1){
          alert("An e-mail has been sent your registered e-mail ID");
        }
        else{
          alert("There seems to be a technical problem. Please contact our admin team. Sorry for the inconvenience");
        }
      })
    })
  }

}
