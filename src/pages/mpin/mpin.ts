import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { SigninPage } from '../signin/signin';
import { MyApp } from '../../app/app.component';
import { CategoriesPage } from '../categories/categories';
import { GuesthscodePage } from '../guesthscode/guesthscode';
import { VideologinPage } from '../videologin/videologin';
import { OtpPage } from '../otp/otp';
//import { SubscriptionPage } from '../subscription/subscription';
//import { EmailverificationPage } from '../emailverification/emailverification';
import { ChangempinPage } from '../changempin/changempin';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-mpin',
  templateUrl: 'mpin.html',
})
export class MpinPage {
  userdata: any;
  usermobile: any;
  fullname: any;
  @ViewChild("mpin") mpin;
  mobile:any;
  country_id: any;
  user_id: any;
  userdetails: Object;
  username: any;
  business: any;
  email: any;
  user_status: any;
  subscription_id: any;
  email_check: any;
  other_check: any;
  usertype: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage:Storage, public http: HttpClient, public platform:Platform) {
      platform.registerBackButtonAction(() => {
      },1);
  }

  Login(){
    var link= MyApp.url+"mpin_login.php";
    var Mydata = JSON.stringify({
      'mobile':this.usermobile,
      'mpin': this.mpin.value
    });
    this.http.post(link,Mydata).subscribe((data)=>{
      if(data==1){

        console.log("usertype : ", this.usertype);
        console.log("other_check : ", this.other_check);
        if(this.usertype == "Other"){

          if(this.other_check == 0){
            alert("Your verification is under process. Please try after some time");
            this.navCtrl.push(SigninPage);  
          }else{
            this.navCtrl.push(CategoriesPage);
          }

        }else{          
          this.navCtrl.push(CategoriesPage);
        }
        //this.navCtrl.push(CategoriesPage);
      }
      else{
        alert("LOGIN PIN Not Matching with this Device Registration");
        this.navCtrl.push(SigninPage);
      }
    })
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }
  changempin(){
    this.navCtrl.push(ChangempinPage);
  }
  
  Hscodes(){
    this.navCtrl.push(GuesthscodePage);
  }
  mii(){
    this.navCtrl.push(VideologinPage);
  }
  contact(){
    alert("Please Mail Your Query to 'info@eximbni.com'.")
  }
  notification(){
    alert("This Feature is comming soon");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MpinPage');
    this.storage.get("userdetails").then((val)=>{
      this.userdata=val;
      if(this.userdata){
      this.usermobile = this.userdata[0].mobile;
      console.log(this.usermobile);
      this.fullname = this.userdata[0].name;
      this.user_id = this.userdata[0].id;
        this.country_id = this.userdata[0].country_id;
        this.http
          .get(MyApp.url + "profile.php?user_id=" + this.user_id)
          .subscribe(edata => {
            this.userdetails = edata;
            console.log("userdata", edata);
            this.username = this.userdetails[0].name;
            this.business = this.userdetails[0].business_name;
            this.email = this.userdetails[0].email;
            this.user_status = this.userdetails[0].status;
            this.subscription_id = this.userdetails[0].subscription_id;
            this.email_check=this.userdetails[0].email_check;
            this.usertype = this.userdata[0].user_type;
            this.other_check = this.userdata[0].other_check;
            console.log("other_check : ", this.other_check);
            if(this.user_status==0){
              this.navCtrl.push(OtpPage);
            }
            else{
              if(this.subscription_id==0){
                this.navCtrl.push(SigninPage)
              }
              else{
                if(this.email_check==0){
                  this.navCtrl.push(SigninPage);
                }
              }
            }
           
           
          });

      }
      else{
        this.navCtrl.push(SigninPage);
      }
    })
  }

}
