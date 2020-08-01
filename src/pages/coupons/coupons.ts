import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';


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
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
    this.frdata = this.navParams.get("frdata");
    this.franchise_id = this.frdata[0].id;
    this.couponcount = this.frdata.coupons;
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

  }

}
