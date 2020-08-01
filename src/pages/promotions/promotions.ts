import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
    this.frdata = this.navParams.get("frdata");
    this.franchise_id = this.frdata[0].id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionsPage');
    this.http.get(MyApp.url+"getevents.php?franchise_id="+this.franchise_id).subscribe(data=>{
      this.events = data;
      console.log("events:", this.events);
    })
  }

}
