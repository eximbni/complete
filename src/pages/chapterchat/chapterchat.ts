import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the ChapterchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chapterchat',
  templateUrl: 'chapterchat.html',
})
export class ChapterchatPage {

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChapterchatPage');
  }

}
