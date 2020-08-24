import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MpinPage } from '../mpin/mpin';


@Component({
  selector: 'page-tslides',
  templateUrl: 'tslides.html',
})
export class TslidesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  Proceed(){
    this.navCtrl.push(MpinPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TslidesPage');
  }

}
