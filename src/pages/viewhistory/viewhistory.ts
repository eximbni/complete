import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';


@Component({
  selector: 'page-viewhistory',
  templateUrl: 'viewhistory.html',
})
export class ViewhistoryPage {
  lead_id: any;
  history: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private menuCtrl : MenuController) {
    this.lead_id=this.navParams.get("lead_id");
    this.http.get(MyApp.url+"leadupdatehistory.php?lead_id="+this.lead_id).subscribe((data)=>{
      this.history = data;
      console.log("lead History: ",this.history);
    })
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewhistoryPage');
  }

}
