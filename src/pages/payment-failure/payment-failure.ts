import { Component } from '@angular/core';
import {  NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-payment-failure',
  templateUrl: 'payment-failure.html',
})
export class PaymentFailurePage {

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentFailurePage');
  }

}
