import { Component } from '@angular/core';
import {NavController, NavParams, MenuController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-payment-success',
  templateUrl: 'payment-success.html',
})
export class PaymentSuccessPage {
  user_id:any;
  userdata:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
  }
  Login(){
    this.navCtrl.push(SigninPage);
} 
 ionViewDidLoad() {
   
    console.log('ionViewDidLoad PaymentSuccessPage');
  }

}
