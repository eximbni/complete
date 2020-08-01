import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'page-termsconditions',
  templateUrl: 'termsconditions.html',
})
export class TermsconditionsPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public http: HttpClient, public menuCtrl: MenuController) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsconditionsPage');
  }

}
