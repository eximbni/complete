import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {
  @ViewChild("mobile") mobile;
  @ViewChild("OldPwd") OldPwd;
  @ViewChild("NewPwd") NewPwd;
  @ViewChild("RePwd") RePwd;
  
  Grid1:any=true;
  pwddetails:any;
  countries:any;
  userdata: any;
  user_id: any;
  mobileno_id: any;
  
  
  
    constructor(public navCtrl: NavController, public navParams: NavParams,
      private http:HttpClient ,private storage: Storage, public menuCtrl:MenuController,public alertCtrl: AlertController, public toastCtrl :ToastController) {
        this.menuCtrl.enable(false, "sideMenu");
    }
  
  
    ChangePwd(){
      console.log('mobile in otp tab',this.mobileno_id);
  if(this.NewPwd.value===this.RePwd.value && this.NewPwd.value!=''){
    //var link=MyApp.url+"changepassword.php";
    var link=MyApp.url+"updatepassword.php";
    var Data=JSON.stringify({
      'oldpassword': this.OldPwd.value,
      'password': this.NewPwd.value,
      'mobile':this.mobileno_id
    });
    console.log(" sending data ", Data);
    this.http.post(link,Data).subscribe((pdata)=>{
  this.pwddetails = pdata;
  console.log('password change',pdata);
  if(pdata==1){
    const alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Password Changed Successfully Please Login!',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(SigninPage);
  }
  else{
      if(pdata==3){
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Old Password is not matched. please try again.',
          buttons: ['OK']
        });
        alert.present();
      }
      else{
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Something went Wrong please try after some Time!',
          buttons: ['OK']
        });
        alert.present();
      }
  }
    });
  }
  else{
    const alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: 'Password is Not Matching!',
      buttons: ['OK']
    });
    alert.present();
  }
    }
    ionViewDidLoad() {
      this.storage.get("userdetails").then((val)=>{
        this.userdata= val;
        this.user_id= this.userdata[0].id;
        this.mobileno_id= this.userdata[0].mobile;
            
      })
  
      console.log('ionViewDidLoad ForgrtPwdPage');
    }
  
  
  }
  
