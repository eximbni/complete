import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { PackagePage } from '../package/package';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {
  subscriptions: any;
  packdetails: any;
  user_id: any;
  chapters: any;
  cost: any;
  desc: any;
  country_id: any;
  packid: any;
  duration: any;
  package1: any;
  package2: any;
  package3: any;
  subscription: any;
  state_id: any;
  signupdata: any;
  credits: any;
  userid: any;
  username: any;
  userprofile: any;
  annualcost: any;
  monthly_cost: any;
  constructor(public navCtrl: NavController,public navParams: NavParams, private http: HttpClient,
    private storage: Storage, public platform:Platform, public menuCtrl: MenuController, public alertCtrl: AlertController) {
      platform.registerBackButtonAction(() => {
      },1);
      this.menuCtrl.enable(false, "sideMenu");

    this.user_id = navParams.get('user_id');
    this.country_id = navParams.get('country_id');
    this.state_id = navParams.get('state_id');
    console.log('user_id=', this.user_id, 'state_id=', this.state_id, 'country_id=', this.country_id);
  }
  

  free(i) {
    
    const confirm = this.alertCtrl.create({
      title: 'Subscription Package',
      message: 'I have read all the feature details, and willing to buy this pack',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.push(PackagePage, {
              'user_id': this.user_id,
              'subscription_id': this.subscription[i].id,
              'credits': this.subscription[i].credits,
              'duration': this.subscription[i].plan_duration,
              'plan_cost':this.subscription[i].plan_cost,
              'monthly_cost':this.subscription[i].monthly_cost,
              'country_id': this.country_id,
              'chapters': this.subscription[i].chapters,
              'hscodes':this.subscription[i].hscodes,
              'state_id': this.state_id,
              'plan_name':this.subscription[i].plan_name,
              'coupons':this.subscription[i].coupons,
            });

          }
        }
      ]
    });
    confirm.present();
    console.log('user_id=', this.user_id, 'state_id=', this.state_id, 'country_id=', this.country_id);

    console.log('sub user id', this.user_id);
    console.log('sub plan_duration', this.subscription[i].plan_duration);
    console.log('sub id', this.subscription[i].id);
    console.log('sub country_id', 99);
    console.log('sub chapters', this.subscription[i].chapters);
  }


  ionViewDidLoad() {
    this.storage.get('userdetails').then((val) => {
      this.signupdata = val;
      console.log(this.signupdata, 'signupdata');
      this.country_id = this.signupdata[0].country_id;
      console.log('country_id', this.country_id);
      // this.user_id= this.signupdata[0].id;
      //console.log('userid', this.user_id);
      this.http.get(MyApp.url+"getsubscriptions.php?country_id="+this.country_id).subscribe((data) => {
        this.subscription = data;

        console.log('subscription packs', this.subscription);
      });
    });

    console.log('Subscription Page');
  }
}
