import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-guesthscode',
  templateUrl: 'guesthscode.html',
})
export class GuesthscodePage {
  hsdetails:any;
  @ViewChild('product') product;
  searchresult: any;
  hsn_code: any;
  mapusers: Object;
  userdata: any;
  country_id: any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, 
    public navParams: NavParams, private http: HttpClient, public loadingCtrl: LoadingController) {
  }
 
  searchProduct(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.http.get(MyApp.url+'searchproduct.php?product='+this.product.value+'&country_id=101'). subscribe((data)=>{
      this.searchresult=data;
      console.log(this.searchresult)
    })
  }


Login(){
  alert("To do this Please Login to the App")
  this.navCtrl.push(SigninPage)
}
ionViewDidLoad() {
    console.log('ionViewDidLoad Guest HS Codes Page');
    
  }

}
