import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { FrreportsPage } from '../frreports/frreports';
import { FrincomePage } from '../frincome/frincome';
import { UsermodelPage } from '../usermodel/usermodel';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';


@Component({
  selector: 'page-requesttracking',
  templateUrl: 'requesttracking.html',
})
export class RequesttrackingPage {
@ViewChild("request_id") request_id
  events: Object;
  showdiv: any=false;
  userdetails: any;
  country_id: any;
  mobile: any;
  reqlist: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController,private storage: Storage,  private http:HttpClient,public loadingCtrl:LoadingController) {
  }

  toggleMenu() {

    this.menuCtrl.toggle();
  }
  Back(){
    this.navCtrl.push(UsermodelPage,{
      'frdata':this.userdetails
    });
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


  track(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.http.get(MyApp.url+"trackid.php?request_id="+this.request_id.value).subscribe(data=>{
      console.log(data);
      this.events =data;
      if(this.events !=0){
        loader.dismiss();
        this.showdiv=true;

      }
      else{
         loader.dismiss();
        alert("No data available with requested ID Please check ID and try again");
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequesttrackingPage');
    this.storage.get("userdetails").then((val) => {
      this.userdetails = val;
      this.country_id = this.userdetails[0].country_id;
      this.mobile = this.userdetails[0].mobile;
      //this.country_id = 99;
      console.log("Country", this.country_id);
      this.http.get(MyApp.url+"franchise.php?country_id=" + this.country_id +"&mobile="+this.mobile).subscribe((data) => {
        this.reqlist = data;
        console.log(this.reqlist, 'reqlist');
      });
      console.log(this.reqlist, 'request list');
    });



  }

}
