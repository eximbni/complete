import { NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { MpinPage } from '../mpin/mpin'; 


@Component({
  selector: 'page-changempin',
  templateUrl: 'changempin.html',
})
export class ChangempinPage {
  userdata: any;
  user_id: any;
  @ViewChild("mpin") mpin;
  @ViewChild("cmpin") cmpin;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, private http:HttpClient) {
  }

  creatempin(){
    if(this.mpin.value !=this.cmpin.value){
      alert("Login PIN and Confirm PIN should be Same");
    }
    else{
      var link= MyApp.url+"create_mpin.php";
      var mydata= JSON.stringify({
        'user_id':this.user_id,
        'mpin':this.mpin.value
      });
      this.http.post(link,mydata).subscribe(data=>{
        if(data==1){
          alert("Login PIN Updated Successfully");
          this.navCtrl.push(MpinPage);
        }
        else{
          alert("Something went Wrong");
        }
      })
    
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatempinPage');
    this.storage.get('userdetails').then((val) => {
      this.userdata = val;
      this.user_id = this.userdata[0].id;
    });
  }

}
