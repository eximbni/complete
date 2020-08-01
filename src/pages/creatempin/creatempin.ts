import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the CreatempinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-creatempin',
  templateUrl: 'creatempin.html',
})
export class CreatempinPage {
  userdata: any;
  user_id: any;
  @ViewChild("mpin") mpin;
  @ViewChild("cmpin") cmpin;
  usertype: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, 
    private http:HttpClient, public loadingCtrl: LoadingController) {
  }

  creatempin(){
    if(this.mpin.value !=this.cmpin.value){
      alert("Login PIN and Confirm PIN should be Same");
    }
    else{
      const loader = this.loadingCtrl.create({
        content: "Creating Records in server, Please wait...",
      });

      loader.present();
      var link= MyApp.url+"create_mpin.php";
      var mydata= JSON.stringify({
        'user_id':this.user_id,
        'mpin':this.mpin.value
      });
      this.http.post(link,mydata).subscribe(data=>{
        loader.dismiss();
        if(data==1){

          if(this.usertype == "Other"){
            alert("You have successfully completed registration. Your account will be activated after validation from our backend team");
            this.navCtrl.push(SigninPage);
  
          }else{
            alert("Login PIN Created Successfully");
            this.navCtrl.push(CategoriesPage);
  
          }


         
        }
        else{
          alert("something went Wrong");
        }
      })
    
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatempinPage');
    this.storage.get('userdetails').then((val) => {
      this.userdata = val;
      this.user_id = this.userdata[0].id;
      this.user_id = this.userdata[0].id;
      this.usertype = this.userdata[0].user_type;
    });
  }

}
