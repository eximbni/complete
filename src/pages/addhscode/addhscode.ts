import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';

/**
 * Generated class for the AddhscodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-addhscode',
  templateUrl: 'addhscode.html',
})
export class AddhscodePage {
@ViewChild("category") category;
@ViewChild("chapter") chapter;
@ViewChild("product") product;
@ViewChild("details") details;
  userdetails: any;
  user_id: any;
  country_id: any;
  request_id: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private storage: Storage,private http: HttpClient, private menuCtrl:MenuController) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  addhscodesend(){
    this.request_id = "HSR"+this.country_id+this.user_id+this.category.value
    var link = MyApp.url+"addhscode.php";
    var Mydata = JSON.stringify({
      'category':this.category.value,
      'user_id':this.user_id,
      'chapter' : this.chapter.value,
      'country_id': this.country_id,
      "productdescription":this.product.value,
      "moreproductdetails" :this.details.value,
      "request_id":this.request_id
    })
    console.log(Mydata);
    this.http.post(link, Mydata).subscribe((cdata) => {
      console.log(cdata);
      alert("Your Request Submited Successfully. Your Request Id is :"+ this.request_id)
    });
  }
  home(){
    this.navCtrl.push(CategoriesPage);
  }
   
leads(){
  this.navCtrl.push(LeadsPage);
}
chatting(){
this.navCtrl.push(ChatPage);
}
webinar(){
this.navCtrl.push(WebinarPage);
}
quotes(){
this.navCtrl.push(RfqPage);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddhscodePage');
     
    this.storage.get('userdetails').then((val) => {
      this.userdetails = val;
      this.user_id = this.userdetails[0].id;
      this.country_id = this.userdetails[0].country_id
    });
  }


}
