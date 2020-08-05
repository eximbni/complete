import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { UsermodelPage } from '../usermodel/usermodel';
import { FrincomePage } from '../frincome/frincome';
import { FrreportsPage } from '../frreports/frreports';

@Component({
  selector: 'page-targetvsachieve',
  templateUrl: 'targetvsachieve.html',
})

export class TargetvsachievePage {
  frdata: any;
  franchise_id: any;
  targetdata: Object;
  udata: any;
  ucount: any;
  pet: string;
  frprofile: any;
  userdetails: any;
  country_id: any;
  mobile: any;
  userid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, private http:HttpClient, public storage:Storage) {
/*     this.frdata = this.navParams.get("frdata");
    this.franchise_id = this.frdata.id; */
    this.pet="month";
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

monthreport() {
  
}

qreport() {
  
}

yreport() {
  
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad TargetvsachievePage');

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

        console.log("franchise id :", this.franchise_id);
        this.http.get(MyApp.url+"getfrachisetarget.php?franchise_id="+this.franchise_id).subscribe((tdata)=>{
          this.targetdata = tdata;
          console.log("data :",this.targetdata);
        });

      });

    });
  }


}
