import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams,Slides, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { UsermodelPage } from '../usermodel/usermodel';
import { FrincomePage } from '../frincome/frincome';

/**
 * Generated class for the FranchiseDashBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-franchise-dash-board',
  templateUrl: 'franchise-dash-board.html',
})
export class FranchiseDashBoardPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  
  userdetails:any;
  user_id:any;
  mobile: any;
  frdata: any;
  frtype: any;
  frname: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController, 
    private storage:Storage, private http:HttpClient) {
    
  }
  
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  
  usermodule(){
    this.navCtrl.push(UsermodelPage,{
      'frdata':this.frdata
    });
  }
  accounts(){
    this.navCtrl.push(FrincomePage);
  }


   ionViewDidLoad(){
    this.storage.get("userdetails").then((val)=>{
      this.userdetails =val;
      this.user_id = this.userdetails[0].id;
      this.mobile = this.userdetails[0].mobile;
      console.log("userMobile:",this.mobile);
      console.log("User_id:", this.user_id);
    this.http.get(MyApp.url+"franchise_profile.php?user_id="+this.user_id).subscribe((fdata)=>{
      this.frdata = fdata;
      this.frtype = this.frdata[0].franchise_type;
      console.log("Franchise Informations:", this.frdata);
      this.storage.set("frdata",this.frdata);
    })
    
  });
}
  
}

