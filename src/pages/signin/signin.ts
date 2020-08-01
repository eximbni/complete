import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, Platform, } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SignupPage } from '../signup/signup';
import { ForgrtPwdPage } from '../forgrt-pwd/forgrt-pwd';
import { Storage } from '@ionic/storage';
import { CategoriesPage } from '../categories/categories';
//import { Plugins } from "@capacitor/core";
//const { PushNotifications } = Plugins;
//import { FCM } from "capacitor-fcm";
//const fcm = new FCM(); 
import { MyApp } from '../../app/app.component';
import { GuesthscodePage } from '../guesthscode/guesthscode';
import { VideologinPage } from '../videologin/videologin';
import { SubscriptionPage } from '../subscription/subscription';
import { EmailverificationPage } from '../emailverification/emailverification';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  logindetails: any;
  @ViewChild("email") email;
  @ViewChild("pwd") pwd;
  passwordshow: boolean;
  logindata: any;
  userstatus: any;
  userid: any;
  deviceid: any;
  country_id: any;
  subscription_id: number;
  email_check: number;
  other_check: number;
  user_type: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient,
    private storage: Storage, public alertCtrl: AlertController, public menuCtrl: MenuController,
   private platform:Platform
  ) {
    this.menuCtrl.enable(false, "sideMenu");
  }
  
toggleMenu() {
  this.menuCtrl.toggle();
}
  showpwd() {
    this.passwordshow = !this.passwordshow;
  }
  signin() {
    console.log(this.email.value);
    console.log(this.pwd.value);

    var link = MyApp.url+"login.php";
    var mydata = JSON.stringify({
      'password': this.pwd.value,
      'email': this.email.value,
      'deviceid': this.deviceid,
    });
    console.log('json data', mydata);
    this.http.post(link, mydata).subscribe((data) => {
      this.logindata = data;
      console.log('logindata data',this.logindata);
      this.userid = this.logindata[0].id;
      this.userstatus = this.logindata[0].status;
      this.user_type = this.logindata[0].user_type;
      this.other_check = this.logindata[0].other_check;
      this.country_id = this.logindata[0].country_id;
      this.subscription_id = this.logindata[0].subscription_id;
      this.email_check = this.logindata[0].email_check;
      this.storage.set('user_id',this.userid);
      this.storage.set('userdetails',this.logindata);
      if (data == "email does not exists Please Signup") {

          const alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'E-Mail does not exist, Please Sign-Up',
            buttons: ['OK'],
            cssClass: 'buttoncss'

          });
          alert.present();
      }
      else {
        if (data == "Password not Matching with Username") {
            const alert = this.alertCtrl.create({
              title: 'Oops!',
              subTitle: 'Username and/or Password not matching with our records',
              buttons: ['OK'],
              cssClass: 'buttoncss'
            });
          alert.present();
        }
        else {

          if(this.subscription_id==0){

              const alert = this.alertCtrl.create({
              title: 'Pending!',
              subTitle: 'You have not subscribed to any Package please subscribe and login again',
              buttons: ['OK'],
              cssClass: 'buttoncss'
            });
            alert.present();
            this.navCtrl.push(SubscriptionPage)
          }
            else{

              if(this.email_check==0){
                  const alert = this.alertCtrl.create({
                  title: 'Pending!',
                  subTitle: 'Your email id is not verified Please verify and logn again',
                  buttons: ['OK'],
                  cssClass: 'buttoncss'
                });
                alert.present();
                this.navCtrl.push(EmailverificationPage)
              }
              else{
    
                if(this.user_type=='Other'){
    
                    if(this.other_check==0){
                      const alert = this.alertCtrl.create({
                        title: 'Pending!',
                        subTitle: 'Your verification is under process. Please try after some time',
                        buttons: ['OK'],
                        cssClass: 'buttoncss'
                      });
                      alert.present();
                  }
                  else{
                    this.navCtrl.push(CategoriesPage, { 
                      'userdetails': this.logindata,
                      'country_id': this.country_id,
                      'user_id': this.userid,
                      'status': this.userstatus,
                    });
                  }

                }
                else{
                  this.navCtrl.push(CategoriesPage, { 
                    'userdetails': this.logindata,
                    'country_id': this.country_id,
                    'user_id': this.userid,
                    'status': this.userstatus,
                  });
                }


              }

            }
         
          
        }

       }

    });
  }
  VideoLog(){
    this.navCtrl.push(VideologinPage);
  }
  fgtpwd() {
    this.navCtrl.push(ForgrtPwdPage);
  }
  register() {
    this.navCtrl.push(SignupPage);
  }
  serachHS(){
    this.navCtrl.push(GuesthscodePage);
  }
  ionViewDidLoad() {
   this. platform.ready().then(()=>{
  });
   
  }
}


