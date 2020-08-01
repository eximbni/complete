import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';


@Component({
  selector: 'page-franchiselogin',
  templateUrl: 'franchiselogin.html',
})
export class FranchiseloginPage {

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FranchiseloginPage');
  }
}