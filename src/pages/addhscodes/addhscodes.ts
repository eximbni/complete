import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddhscodesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addhscodes',
  templateUrl: 'addhscodes.html',
})
export class AddhscodesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
/*   call(){
    this.call ("8008009922");
  } */

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddhscodesPage');
  }

}
