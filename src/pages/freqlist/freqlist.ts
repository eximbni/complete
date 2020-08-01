import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FreqlistdetailsPage } from '../freqlistdetails/freqlistdetails';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { FrlistPage } from '../frlist/frlist';
import { FrsellleadsPage } from '../frsellleads/frsellleads';
import { FrincomePage } from '../frincome/frincome';
import { FrreportsPage } from '../frreports/frreports';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { FrbuyleadsPage } from '../frbuyleads/frbuyleads';

/**
 * Generated class for the FreqlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-freqlist',
  templateUrl: 'freqlist.html',
})
export class FreqlistPage {

  userdetails: any;
  country_id: any;
  reqlist: any;
  fr_id: any;
  user_id: any;
  mobile: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: HttpClient, public menuCtrl:MenuController) { }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
 
  carddetails(i) {
    this.navCtrl.push(FreqlistdetailsPage, {
      'fr_id': this.reqlist[i].id,
      'name': this.reqlist[i].name,
      'chapter': this.reqlist[i].chapter,
      'business_name': this.reqlist[i].business_name,
      'description': this.reqlist[i].description,

      'user_id': this.reqlist[i].user_id,
      'franchise_type_id': this.reqlist[i].franchise_type_id,
    }
    );
  }

  home() {
    this.navCtrl.push(FranchiseDashBoardPage);
  }

  flist() {
    this.navCtrl.push(FrlistPage);
  }
  buylist(){
this.navCtrl.push(FrbuyleadsPage);
  }
  selllist() {
    this.navCtrl.push(FrsellleadsPage);
  }
  income() {
    this.navCtrl.push(FrincomePage);
  }
  reports() {
    this.navCtrl.push(FrreportsPage);
  }

  ionViewDidLoad() {
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
