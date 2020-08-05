import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { FrreportsPage } from '../frreports/frreports';
import { FrincomePage } from '../frincome/frincome';
import { UsermodelPage } from '../usermodel/usermodel';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';


@Component({
  selector: 'page-subscribers',
  templateUrl: 'subscribers.html',
})
export class SubscribersPage {
  @ViewChild("sdate") sdate;
  @ViewChild("edate") edate;

  userdetails: any;
  country_id: any;
  userid: any;
  mobile: any;
  frprofile: Object;
  franchise_id: any;
  userslist: Object;
  Sdate: string;
  Edate: string;
  totaldata: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: HttpClient, public menuCtrl:MenuController) {}
  toggleMenu() {

    this.menuCtrl.toggle();
  }
 
  Back() {
    this.navCtrl.push(UsermodelPage);
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

  submit(){
    if(this.sdate.value == null){
      alert("Please select start date");
      return false;
    }
    if(this.edate.value == null){
      alert("Please select to date");
      return false;
    }   
  if(this.sdate.value.day < 10){
    this.sdate.value.day = "0"+this.sdate.value.day;
  }
  console.log(this.sdate.value.month);
  if(this.sdate.value.month < 10){
    this.sdate.value.month = "0"+this.sdate.value.month;
  } 
  this.Sdate = this.sdate.value.year+"-"+this.sdate.value.month+"-"+this.sdate.value.day;
  console.log("Start Date",this.Sdate);

  console.log(this.edate.value);
  if(this.edate.value.day < 10){
    this.edate.value.day = "0"+this.edate.value.day;
  }
  console.log(this.edate.value.month);
  if(this.edate.value.month < 10){
    this.edate.value.month = "0"+this.edate.value.month;
  }  
  this.Edate = this.edate.value.year+"-"+this.edate.value.month+"-"+this.edate.value.day;
  console.log("End Date",this.Edate);  
console.log("App :",MyApp.url+"franchise_subscribeusers.php?franchise_id="+this.franchise_id+"&user_id="+this.userid+"&startdate="+this.Sdate+"&enddate="+this.Edate);

  this.http.get(MyApp.url+"franchise_subscribeusers.php?franchise_id="+this.franchise_id+"&user_id="+this.userid+"&startdate="+this.Sdate+"&enddate="+this.Edate).subscribe((data) => {
    this.userslist = data;
    console.log('get_franchiseusers',this.userslist);
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
        //console.log('franchise id profile',this.franchise_id);

      });
     

      
    });


  }


}
