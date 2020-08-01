import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { FreqlistPage } from '../freqlist/freqlist';
import { FrsellleadsPage } from '../frsellleads/frsellleads';
import { FrbuyleadsPage } from '../frbuyleads/frbuyleads';
import { FrincomePage } from '../frincome/frincome';
import { FrreportsPage } from '../frreports/frreports';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the FreqlistdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-freqlistdetails',
  templateUrl: 'freqlistdetails.html',
})
export class FreqlistdetailsPage {
@ViewChild("commission") commission;
@ViewChild("reason") reason;
percent=false;
description=false;
fr_id:any;
name:any;
chapter:any;
business_name:any;
desc:any;
response:any;
user_id:any;
franchise_type_id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private alertCtrl:AlertController,public menuCtrl:MenuController) {
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
  accept(){
    this.percent=true;
    this.description=false;
  }
  reject(){
    this.description=true;
    this.percent=false;
  }
  submitApprove(){
    //var percentoffer = document.getElementById('percentoffer').nodeValue;
    console.log("commision value", this.commission.value);
    var link= MyApp.url+"approvefranchise.php";
    var jdata=JSON.stringify({
      'id':this.fr_id,
      'user_id':this.user_id,
      'frt_id':this.franchise_type_id,
      'commission':this.commission.value
    });
    console.log("jdata", jdata);
   this.http.post(link,jdata).subscribe((data)=>{
      this.response= data;
      console.log(data);
      if(data==1){
        const alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Thank you for accepting the terms',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(FranchiseDashBoardPage);
      }
      else{
        const alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'Somthing went wrong! Please try after sometime',
          buttons: ['OK']
        });
        alert.present();
      }
    }); 



  }

  submitReject()
  {
    //var reason = document.getElementById('reasonreject').nodeValue;

    var link= MyApp.url+"rejectfranchise.php";
    var jdata=JSON.stringify({
      'id':this.fr_id,
      'reason':this.reason.value
    });
    this.http.post(link,jdata).subscribe((data)=>{
      this.response= data;
      console.log(data);
      if(data==1){
        const alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Thnakyou for your feedback',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(FranchiseDashBoardPage);
      }
      else{
        const alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'Somthing went wrong! Please try after sometime',
          buttons: ['OK']
        });
        alert.present();
      }
    }); 


  }
  
 
    request(){
      this.navCtrl.push(FreqlistPage);
    }
    /*flist(){
      this.navCtrl.push(FrlistPage);
    } */
  

  ionViewDidLoad() {
    this.fr_id = this.navParams.get('fr_id');
    this.name = this.navParams.get('name');
    this.business_name = this.navParams.get('business_name');
    this.desc = this.navParams.get('description');
    this.chapter = this.navParams.get('chapter');

    this.user_id = this.navParams.get('user_id');
    this.franchise_type_id = this.navParams.get('franchise_type_id');

    //console.log('this is id',this.fr_id );

    console.log('ionViewDidLoad FreqlistdetailsPage');
  }

}
