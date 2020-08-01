import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-requesttracking',
  templateUrl: 'requesttracking.html',
})
export class RequesttrackingPage {
@ViewChild("request_id") request_id
  events: Object;
  showdiv: any=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient,public loadingCtrl:LoadingController) {
  }

  track(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.http.get(MyApp.url+"trackid.php?request_id="+this.request_id.value).subscribe(data=>{
      console.log(data);
      this.events =data;
      if(this.events !=0){
        loader.dismiss();
        this.showdiv=true;

      }
      else{
         loader.dismiss();
        alert("No data available with requested ID Please check ID and try again");
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequesttrackingPage');
  }

}
