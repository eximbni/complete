import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { FrsellleadsPage } from '../frsellleads/frsellleads';
import { FrincomePage } from '../frincome/frincome';
import { FrreportsPage } from '../frreports/frreports';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the FrbuyleadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-frbuyleads',
  templateUrl: 'frbuyleads.html',
})
export class FrbuyleadsPage {
  buyleads:any;
  country_id:any;
  userdetails:any;
  users:any;
  mobile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController,private storage:Storage, private http:HttpClient) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
 
home(){
this.navCtrl.push(FranchiseDashBoardPage);
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
carddetails(i){
  
}

  ionViewDidLoad() {
    this.storage.get("userdetails").then((val) => {
      this.userdetails = val;
      this.country_id = this.userdetails[0].country_id;
      this.mobile = this.userdetails[0].mobile;
      console.log("Country", this.country_id);
      this.http.get(MyApp.url+"franchise_buyleads.php?country_id=" + this.country_id+ "&mobile="+this.mobile).subscribe((data) => {
        this.buyleads = data;
        console.log(this.buyleads,'count');
      });
    });
    console.log('ionViewDidLoad FrbuyleadsPage');
  }
  

}
