import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ForgrtPwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-forgrt-pwd',
  templateUrl: 'forgrt-pwd.html',
})
export class ForgrtPwdPage {
@ViewChild("mobile") mobile;
@ViewChild("OldPwd") OldPwd;
@ViewChild("NewPwd") NewPwd;
@ViewChild("RePwd") RePwd;

Grid1:any=true;
Grid2:any= false;
Grid3:any= false;
pwddetails:any;
otpdata:any;
otp:any;
chkmobile:any;
countries:any;
resenddata:any;
  userdata: any;
  user_id: any;
  chapters: Object;
  mobileno_id: any;
  otpmethods : any;
  dropdownList: { item_id: number; item_text: string; }[];
  selectedItems: { item_id: number; item_text: string; }[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  phonecode: any;
  code: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http:HttpClient ,private storage: Storage, public menuCtrl:MenuController,public alertCtrl: AlertController, public toastCtrl :ToastController) {
      this.menuCtrl.enable(false, "sideMenu");
  }


  getmethod(){
    this.otpmethods = 'mobile';
    
  }

  getmailmethod(){
    this.otpmethods = 'email';
  }

  GetOtp(){
    console.log("Otp method ",this.otpmethods);
     console.log(this.mobile.value);

     if((this.mobile.value)==''){
      alert("Please enter mobile number");
      return false;
    }
    if(!(this.otpmethods)){
      alert("Please select OTP method");
      return false;
    }
    this.chkmobile = this.code+this.mobile.value;
    this.otpmethods = this.otpmethods;
     var link =MyApp.url+"forgotpassword.php";
     var jdata=JSON.stringify({
       'mobile':this.code+this.mobile.value,
       'otpmethod' :this.otpmethods
     });
     console.log('sending mobile no',this.chkmobile);
     this.http.post(link,jdata).subscribe((data)=>{
       this.otpdata = data;
       console.log('mobile no data',data);
       if(data ==1){
        this.Grid1=false;
        this.Grid2= true;
        this.Grid3= false;
       }
       else{
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Invalid mobile number!',
          buttons: ['OK']
        });
        alert.present();
       }
     });
    }

    resend(){
      console.log('mobile in otp tab',this.chkmobile);
      var link=MyApp.url+"resendotp.php";
      var rdata=JSON.stringify({
      'mobile':this.chkmobile,
      'otpmethod' :this.otpmethods 
      });
      console.log(" chkmobile ",rdata);
      this.http.post(link,rdata).subscribe((data)=>{
        this.resenddata =data;
        console.log('resend otp datac status',data);
        if(data==1){
          const toast = this.toastCtrl.create({
            message: 'OTP send Successfully',
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
  ResetPwd(){
    console.log('mobile in otp tab',this.chkmobile);
    var link =MyApp.url+"otp.php";
    var mdata=JSON.stringify({
       'mobile':this.chkmobile,
       'otp':this.otp,
     });
     console.log('sending mobile no',mdata);

     this.http.post(link,mdata).subscribe((data)=>{
       this.otpdata= data;
       console.log('mobile no data',data);
       if(data==1){
        this.Grid1=false;
        this.Grid2=false ;
        this.Grid3= true;
       }
       else{
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Invalid OTP!',
          buttons: ['OK']
        });
        alert.present();
       }
     });
  
  
  }
  ChangePwd(){
    console.log('mobile in otp tab',this.chkmobile);
if(this.NewPwd.value===this.RePwd.value && this.NewPwd.value!=''){
  var link=MyApp.url+"changepassword.php";
  //var link=MyApp.url+"updatepassword.php";
  var Data=JSON.stringify({
    //'oldpassword': this.OldPwd.value,
    'password': this.NewPwd.value,
    'mobile':this.chkmobile
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
  const alert = this.alertCtrl.create({
    title: 'Oops!',
    subTitle: 'Something went Wrong please try after some Time!',
    buttons: ['OK']
  });
  alert.present();
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

  ngOnInit() {
    this.http.get(MyApp.url+"getcountries.php").subscribe((mdata)=>{
      this.countries= mdata;
    console.log(mdata);
    
    this.dropdownList = this.countries;
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'phonecode',
      textField: 'phonecode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  })
}
  onItemSelect(item: any) {
    this.phonecode = item;
    this.code = this.phonecode.phonecode;
    console.log(this.code);
  }
  onSelectAll(items: any) {
    console.log(items);
  
  }
  
  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ForgrtPwdPage');

  }


}
