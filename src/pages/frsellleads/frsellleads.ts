import { Component } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { FreqlistPage } from '../freqlist/freqlist';
import { FrlistPage } from '../frlist/frlist';
import { FrbuyleadsPage } from '../frbuyleads/frbuyleads';
import { FrincomePage } from '../frincome/frincome';
import { FrreportsPage } from '../frreports/frreports';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the FrsellleadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-frsellleads',
  templateUrl: 'frsellleads.html',
})
export class FrsellleadsPage {
  userdetails: any;
  country_id: any;
  mobile: any;
  sellleads: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,private storage:Storage, private http:HttpClient) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
 
  home(){
    this.navCtrl.push(FranchiseDashBoardPage);
    }
    request(){
      this.navCtrl.push(FreqlistPage);
    }
    flist(){
      this.navCtrl.push(FrlistPage);
    }
    selllist(){
      this.navCtrl.push(FrsellleadsPage);
    } 
    
    buylist(){
      this.navCtrl.push(FrbuyleadsPage);
    } 
    income(){
      this.navCtrl.push(FrincomePage);
    }
    reports(){
      this.navCtrl.push(FrreportsPage);
    }
  ionViewDidLoad() {
    this.storage.get("userdetails").then((val) => {
      this.userdetails = val;
      this.country_id = this.userdetails[0].country_id;
      this.mobile = this.userdetails[0].mobile;
      console.log("Country", this.country_id);
      this.http.get(MyApp.url+"franchise_sellleads.php?country_id=" + this.country_id+ "&mobile="+this.mobile).subscribe((data) => {
        this.sellleads = data;
        console.log(this.sellleads,'count');
      });
    });
    console.log('ionViewDidLoad FrsellleadsPage');
  }

}
