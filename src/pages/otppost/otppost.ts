import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { RfqPage } from '../rfq/rfq';
import { SendquotePage } from '../sendquote/sendquote';

/**
 * Generated class for the OtppostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-otppost',
  templateUrl: 'otppost.html',
})
export class OtppostPage {

   mobile:any;
user_id:any;
country_id:any;
otp:string="";
otpdata:any;
resenddata:any;
state_id:any;
userdetails:any;
referal_code:any;
leadref_id:any;
impexpdiv = false;
utype: any;
impexpmob: any;
  impexpotp: any;
  impexpmail: any;
  skiptimer: number;
  maxtime: number;
constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl : MenuController,
  private http:HttpClient ,public toastCtrl: ToastController, private storage : Storage) {
    this.menuCtrl.enable(false, "sideMenu");
}
rfqPg(){
  this.navCtrl.push(RfqPage);
}
toggleMenu() {
  this.menuCtrl.toggle();
}

resend(){
  var link=MyApp.url+"resendpostleadotp.php";
  var rdata=JSON.stringify({
  'mobile':this.mobile,
  'otp_status':'1'
  });
  console.log('resnd otp mobile no ',this.mobile);
  this.http.post(link,rdata).subscribe((data)=>{
    this.resenddata =data;
    console.log('resend otp data status : ',data);
    if(data==1){
      const toast = this.toastCtrl.create({
        message: 'OTP sent successfully. Please enter the OTP below for validation'+this.mobile,
        duration: 4000
      });
      toast.present();
    }
    else{

      if(data==2){
        const toast = this.toastCtrl.create({
          message: 'Invalid Mobile Number : '+this.mobile,
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

    }
  
  });
  
}



resendimpexp(){
  var link=MyApp.url+"resendpostleadotp.php";
  var rdata=JSON.stringify({
  'mobile':this.impexpmob,
  'otp_status':'2',
  'email' :this.impexpmail
  });
  console.log('resnd otp mobile no ',this.impexpmob);
  this.http.post(link,rdata).subscribe((data)=>{
    this.resenddata =data;
    console.log('resend otp data status : ',data);
    if(data==1){
      const toast = this.toastCtrl.create({
        message: 'OTP sent successfully. Please enter the OTP below for validation'+this.impexpmail,
        duration: 4000
      });
      toast.present();
    }
    else{

      if(data==2){
        const toast = this.toastCtrl.create({
          message: 'Invalid Mobile Number : '+this.impexpmail,
          duration: 4000
        });
        toast.present();
      }
      else{
        const toast = this.toastCtrl.create({
          message: 'OTP not sent on mail, Please try again',
          duration: 4000
        });
        toast.present();
      }

    }
  
  });
  
}



onOtpChange(event:string){
  this.otp = event;
  console.log(this.otp);
}

onimpexpOtpChange(eventimpexp:string){
  this.impexpotp = eventimpexp;
  console.log("impexpotp : ", this.impexpotp);
}

confirm(){
  console.log('otp=',this.otp);
  var link=MyApp.url+"postleadotpvalidate.php";
  var Jdata=JSON.stringify({
  'otp':this.otp,
  'mobile':this.mobile,
  'impexpotp':this.impexpotp,
  'impexpmobile':this.impexpmob,
  'leadref_id':this.leadref_id,
  });
  console.log('otp no',Jdata);
  this.http.post(link,Jdata).subscribe((data)=>{
    this.otpdata = data;
    console.log('otp value result',data);
    if(data==1){
      this.navCtrl.push(SendquotePage);
    }
    else{
          const toast = this.toastCtrl.create({
            message: this.otpdata,
            duration: 30000
          });
          toast.present();

    }
  })
  /**/
}
ionViewDidLoad() {
  this.maxtime=180
  this.skiptimer = setInterval(x => 
    {
        if(this.maxtime <= 1) {
          //this.twobtn = true;
          clearInterval(this.skiptimer);
          this.resend();
        }
        this.maxtime -= 1;
        
    }, 1000);
  this.leadref_id = this.navParams.get("leadref_id");
  console.log('leadref_id',this.leadref_id);
  this.impexpmob = this.navParams.get("impexpmobile");
  this.impexpmail = this.navParams.get("impexpmail");
  console.log('impexpmobile : ',this.impexpmob);
  
  this.storage.get('userdetails').then((val)=>{
    this.userdetails = val;
    this.user_id =this.userdetails[0].id;
    this.referal_code =this.userdetails[0].referal_code;
    this.mobile = this.userdetails[0].mobile;
    this.utype = this.userdetails[0].other_check;
    //console.log("Other_check : ", this.utype);
    if(this.utype ==1){
      this.impexpdiv = true;
    }
    console.log('userdata',this.userdetails);
    console.log('user id',this.user_id);
    console.log('mobile',this.mobile);
    console.log('referal_code',this.referal_code);
  });

  console.log('ionViewDidLoad leadOtpPage');
}

}


