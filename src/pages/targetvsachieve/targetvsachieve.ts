import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, public storage:Storage) {
/*     this.frdata = this.navParams.get("frdata");
    this.franchise_id = this.frdata.id; */
    this.pet="month";
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
