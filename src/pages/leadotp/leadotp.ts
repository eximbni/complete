import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SubscriptionPage } from '../subscription/subscription';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';


@Component({
  selector: 'page-leadotp',
  templateUrl: 'leadotp.html',
})
export class LeadotpPage {
  mobile:any;
  user_id:any;
  country_id:any;
  otp:string="";
  otpdata:any;
  resenddata:any;
  state_id:any;
  userdetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl : MenuController,
    private http:HttpClient ,public toastCtrl: ToastController, private storage : Storage) {
      this.menuCtrl.enable(false, "sideMenu");
  }

  
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  resend(){
    var link=MyApp.url+"resendotp.php";
    var rdata=JSON.stringify({
    'mobile':this.mobile,
    });
    this.http.post(link,rdata).subscribe((data)=>{
      this.resenddata =data;
      console.log('resend otp datac status',data);
      if(data==1){
        const toast = this.toastCtrl.create({
          message: 'OTP sent successfully. Please enter the OTP below for validation',
          duration: 4000
        });
        toast.present();
      }
      else{
        const toast = this.toastCtrl.create({
          message: 'Incorrect OTP',
          duration: 4000
        });
        toast.present();
      }
    
    });
    
  }
  onOtpChange(event:string){
    this.otp = event;
    console.log(this.otp);
  }
  confirm(){
    console.log('otp=',this.otp);
    var link=MyApp.url+"otpvalidate.php";
    var Jdata=JSON.stringify({
    'otp':this.otp,
    'mobile':this.mobile,
    });
    console.log('otp no',Jdata);
    this.http.post(link,Jdata).subscribe((data)=>{
      this.otpdata = data;
      console.log('otp value result',data);
      if(data==1){
        this.navCtrl.push(SubscriptionPage,
          {
            'user_id':this.user_id,
            'country_id':this.country_id,
            'state_id':this.state_id,
      });
      }
      else{
        const toast = this.toastCtrl.create({
          message: 'Incorrect OTP',
          duration: 4000
        });
        toast.present();
      }
    })
    /**/
  }
  ionViewDidLoad() {
    this.storage.get('userdetails').then((val)=>{
      this.userdetails = val;
      console.log('userdata',this.userdetails);
    });
    //this.storage.get('signupdata',this.signupdata);
    console.log('ionViewDidLoad leadOtpPage');
  }

}
