
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { TargetvsachievePage } from '../targetvsachieve/targetvsachieve';
import { TargetsPage } from '../targets/targets';
import { CouponsPage } from '../coupons/coupons';
import { ForecastingPage } from '../forecasting/forecasting';
import { PromotionsPage } from '../promotions/promotions';
import { PromotionrequestPage } from '../promotionrequest/promotionrequest';
import { RequesttrackingPage } from '../requesttracking/requesttracking';
import { FrlistPage } from '../frlist/frlist';
import { SubscribersPage } from '../subscribers/subscribers';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { FrincomePage } from '../frincome/frincome';
import { FrreportsPage } from '../frreports/frreports';


@Component({
  selector: 'page-usermodel',
  templateUrl: 'usermodel.html',
})
export class UsermodelPage {
  userdata: any;
  country_id: any;
  user_id: any;
  paymentoptions: Object;
  frdata: any;
  userdetails: any;

  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,
    private http:HttpClient, public storage:Storage, ) {
      this.frdata=this.navParams.get("frdata");
     }

    tvsa(){
      this.navCtrl.push(TargetvsachievePage,{
        'frdata':this.frdata
      })
    }
    frlist(){
      this.navCtrl.push(FrlistPage,{
        'frdata':this.frdata
      });
    }
    subscriber(){
      this.navCtrl.push(SubscribersPage,{
        'frdata':this.frdata
      });
    }
    Targets(){
      this.navCtrl.push(TargetsPage,{
        'frdata':this.frdata
      })
    }
    coupons(){
      this.navCtrl.push(CouponsPage,{
        'frdata':this.frdata
      })
    }
    forecasting(){
      this.navCtrl.push(ForecastingPage,{
        'frdata':this.frdata
      })
    }
    promotions(){
      this.navCtrl.push(PromotionsPage,{
        'frdata':this.frdata
      })
    }
    promorequest(){
      this.navCtrl.push(PromotionrequestPage,{
        'frdata':this.frdata
      })
     
    }
    track(){
      this.navCtrl.push(RequesttrackingPage,{
        'frdata':this.frdata
      });
    }
    
    Back() {
      this.navCtrl.push(FranchiseDashBoardPage);
    }

    home() {
      this.navCtrl.push(FranchiseDashBoardPage);
    }
    usermodule(){
      this.navCtrl.push(UsermodelPage,{
        'frdata':this.userdetails
      });
    }
    accounts(){
      this.navCtrl.push(FrincomePage);
    }
  
    reports(){
      this.navCtrl.push(FrreportsPage);
    }


  ionViewDidLoad() {
    this.storage.get('userdetails').then((val)=>{
      this.userdata=val;
      this.user_id=this.userdata[0].id;
      this.country_id = this.userdata[0].country_id;
      console.log('userdata',this.userdata);
      this.http
      .get(MyApp.url + "get_paymentgateway_list.php?country_id=" + this.country_id)
      .subscribe(paydata => {
        this.paymentoptions = paydata;
        console.log("paymentoptions",paydata);
      });

    });
    console.log('ionViewDidLoad UsermodelPage');
  }



}
