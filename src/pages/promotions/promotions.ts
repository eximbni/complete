import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { FrincomePage } from '../frincome/frincome';
import { FrreportsPage } from '../frreports/frreports';
import { UsermodelPage } from '../usermodel/usermodel';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PromotionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {
  frdata: any;
  franchise_id: any;
  events: Object;
  userdetails: any;
  country_id: any;
  mobile: any; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController,private storage: Storage, private http:HttpClient) {
    this.frdata = this.navParams.get("frdata");
    this.franchise_id = this.frdata[0].id;
  }

  toggleMenu() {

    this.menuCtrl.toggle();
  }
  Back() {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionsPage');
    this.http.get(MyApp.url+"getevents.php?franchise_id="+this.franchise_id).subscribe(data=>{
      this.events = data;
      console.log("events:", this.events);
    });
 
    this.storage.get("userdetails").then((val) => {
      this.userdetails = val;
      this.country_id = this.userdetails[0].country_id;
      this.mobile = this.userdetails[0].mobile;
      //this.country_id = 99;
    });




  }

}
