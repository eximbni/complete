import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { UsermodelPage } from "../usermodel/usermodel";
import { FrincomePage } from '../frincome/frincome';
import { FrreportsPage } from '../frreports/frreports';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';


@Component({
  selector: 'page-forecasting',
  templateUrl: 'forecasting.html',
})
export class ForecastingPage {
  @ViewChild("sdate") sdate;
  @ViewChild("edate") edate;

  userdetails: any;
  country_id: any;
  userid: any;
  mobile: any;
  frprofile: Object;
  franchise_id: any;
  userslist: Object;
  month: string;
  forcast: string;
  totaldata: string;
  postdata: string;
  formdata: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: HttpClient,public toastCtrl: ToastController, public menuCtrl:MenuController) {}
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
    this.navCtrl.push(UsermodelPage);
  }
  
  submit(){
  
    this.month = this.sdate.value.year+"-"+this.sdate.value.month+"-01";
    console.log("Month ",this.month);
    if(this.month == null){
      alert("Please select month");
      return false;
    }
    if(this.edate.value == 0){
      alert("Please enter forcasting value");
      return false;
    }    

    this.forcast = this.edate.value;
    console.log("Forcasting",this.forcast);  

    var link = MyApp.url + "postforcasting.php";
      this.postdata = JSON.stringify({
        'user_id': this.userid, 
        'franchise_id': this.franchise_id,
        'month': this.month,
        'forcast': this.forcast
      });

      console.log("Forcasting data",this.postdata);  
      
    this.http.post(link, this.postdata).subscribe((data) => {
      this.formdata = data;
      console.log("response : ",this.formdata);

      if(data==1){
       alert('Forcasting Added Successfully.');     
        this.navCtrl.push(UsermodelPage, {  userdetails: this.userdetails  });            
      }
      else{
        const toast = this.toastCtrl.create({
          message: ' Something went wrong. Please try again after sometime, or contact the support team',
          duration: 3000
        });
        toast.present();
      } 
     

    });


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscribersPage');

      this.storage.get("userdetails").then((val) => {
      this.userdetails = val;
      this.country_id = this.userdetails[0].country_id;
      this.userid = this.userdetails[0].id;
      this.mobile = this.userdetails[0].mobile;
      console.log("mobile number", this.mobile);
     
      this.http.get(MyApp.url+"franchise_profile.php?user_id="+this.userid).subscribe((data) => {
        this.frprofile = data;
        this.franchise_id = this.frprofile[0].id;
        console.log('franchise id profile',this.franchise_id);

      });
     

      
    });


  }


}