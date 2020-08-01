import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, Slides, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-frlist',
  templateUrl: 'frlist.html',
})
export class FrlistPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  userdetails:any;
  country_id:any;
  userslist:any;
  inactiveuserslist:any;
  mobile: any;
  frprofile: Object;
  fr_id: any;
  franchise_id: string;
  userid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: HttpClient, public menuCtrl:MenuController) {}
  toggleMenu() {

    this.menuCtrl.toggle();
  }
  

// On slide changed

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrlistPage');

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

         this.http.get(MyApp.url+"get_franchiseusers.php?franchise_id="+this.franchise_id+"&user_id="+this.userid).subscribe((data) => {
          this.userslist = data;
          console.log('get_franchiseusers',this.userslist);
        });

      });
     

      
    });


  }


}
