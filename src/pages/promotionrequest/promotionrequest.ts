import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { UsermodelPage } from '../usermodel/usermodel';


@Component({
  selector: 'page-promotionrequest',
  templateUrl: 'promotionrequest.html',
})
export class PromotionrequestPage {
@ViewChild("event_name") event_name;
@ViewChild("budget") budget;
@ViewChild("participents") participents;
@ViewChild("guest") guest;
@ViewChild("edate") edate;
@ViewChild("venue") venue;
@ViewChild("conversions") conversions;
  request_id: number;
  franchise_id: any;
  frdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
    this.frdata = this.navParams.get("frdata");
    console.log("Constructor data : ", this.frdata);
     this.franchise_id = this.frdata[0].id;
     console.log("Constructor frdata : ", this.frdata[0]);
     console.log("Constructor franchise_id : ", this.franchise_id);
  }
 

  submit(){
    this.request_id=Math.floor(Math.random() * (999999 - 100000)) + 100000;
    var link = MyApp.url+"eventrequest.php";
    var mydata = JSON.stringify({
      'request_id':this.request_id,
      'franchise_id':this.franchise_id,
      'event_name':this.event_name.value,
      'budget':this.budget.value,
      'participents':this.participents.value,
      'guest':this.guest.value,
      'event_date':this.edate.value.year+"-"+this.edate.value.month+"-"+this.edate.value.day,
      'venue':this.venue.value,
      'conversions':this.conversions.value
    });
    console.log(mydata);
    this.http.post(link,mydata).subscribe(data=>{
      console.log(data);
      if(data==1){
        alert("Your request Submitted Successfully and your request ID is"+this.request_id);
        this.navCtrl.push(UsermodelPage);
      }
      else{
        alert("something went wrong");
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionrequestPage');
    console.log("Constructor  : ", this.frdata);
  }

}
