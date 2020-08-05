import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { FrincomePage } from '../frincome/frincome';
import { FrreportsPage } from '../frreports/frreports';
import { UsermodelPage } from '../usermodel/usermodel';

@Component({
  selector: 'page-coupons',
  templateUrl: 'coupons.html',
})
export class CouponsPage {
  frdata: any;
  couponcount: any;
  cou:any=false;
  coupon_code: any;
  expires: string;
  plan_name: number;
  franchise_id: any;
  userdetails: any;
  country_id: any;
  mobile: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,private storage: Storage, private http:HttpClient) {
    this.frdata = this.navParams.get("frdata");
    this.franchise_id = this.frdata[0].id;
    this.couponcount = this.frdata.coupons;
  }
    
  
  toggleMenu() {

    this.menuCtrl.toggle();
  }

  home() {
    this.navCtrl.push(FranchiseDashBoardPage);
  }
  usermodule(){
    this.navCtrl.push(UsermodelPage,{
      'frdata':this.userdetails
    });
  }
  accounts(){
    this.navCtrl.push(FrincomePage);
  }

  reports(){
    this.navCtrl.push(FrreportsPage);
  }

  Back() {
     this.navCtrl.push(UsermodelPage,{
      'frdata':this.userdetails
    });
  }
  
  gcoupon(){
      this.cou=true;
      this.coupon_code=Math.floor(Math.random() * (999999 - 100000)) + 100000;
      this.plan_name = 299;
      this.expires = "3days";
    }
    useCoupon(){
      alert("I am in");
      var link = MyApp.url+"usecoupon.php";
      var mydata = JSON.stringify({
        'coupon_code':this.coupon_code,
        'franchise_id':this.franchise_id,
        'pack_id':this.plan_name
      });
      console.log(mydata,"Mydata"); 
      this.http.post(link,mydata).subscribe(data=>{
        console.log(data);
        if(data==1){
          alert("coupon Activated Sucessfully. You can use this coupon with in 3 days");
        }
        else{
          alert("something went wrong");
        }
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponsPage');
    this.storage.get("userdetails").then((val) => {
      this.userdetails = val;
      this.country_id = this.userdetails[0].country_id;
      this.mobile = this.userdetails[0].mobile;
      //this.country_id = 99;
    });


  }

}
