import { Component } from "@angular/core";
import { NavController, NavParams, MenuController, AlertController, Platform } from "ionic-angular";
import { ChaptersPage } from "../chapters/chapters";
import { Storage } from "@ionic/storage";
import { LeadsPage } from "../leads/leads";
import { ChatPage } from "../chat/chat";
import { HttpClient } from "@angular/common/http";
import { RfqPage } from "../rfq/rfq";
//import { SigninPage } from "../signin/signin";
import { MyApp } from "../../app/app.component";
import { GlobalsearchPage } from "../globalsearch/globalsearch";
//import { OtpPage } from "../otp/otp";
//import { SubscriptionPage } from "../subscription/subscription";
//import { EmailverificationPage } from "../emailverification/emailverification";
import { VideologinPage } from "../videologin/videologin";
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-categories",
  templateUrl: "categories.html"
})
export class CategoriesPage {
  catdetails: any;
  cat_id: any;
  status: any;  
  logindata: any;
  userdetails: any;
  sellleads: any;
  buyleads: any;
  country_id: any;
  sellscrolling: any;
  buyscrolling: any;
  horizontalText: any;
  //user profile declaration
  user_id: any;
  userprofile: any;
  username: any;
  userdata: any;
  business: any;
  email: any;
  buyleadspermission: any;
  buy_id: any;
  sellleadspermission: any;
  sell_id: any;
  walletcredits: any;
  credits: any;
  banners: Object;
  user_status: any;
  subscription_id: any;
  email_check: any;
  messagecount: Object;
  showcount: any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    private http: HttpClient,
    private storage: Storage,
    public alertCtrl: AlertController,
    public platform:Platform
  ) {
    platform.registerBackButtonAction(() => {
    },1);
    this.menuCtrl.enable(true, "sideMenu");
    this.logindata = navParams.get("userdetails");

    this.http.get(MyApp.url + "getcategories.php").subscribe(data => {
      this.catdetails = data;
      console.log(this.catdetails);
      this.storage.set("catdata", this.catdetails);
    });
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  Chapters(i) {
    this.cat_id = this.catdetails[i].id;
    console.log("category_id=", this.cat_id);
    this.navCtrl.push(ChaptersPage, {
      cat_id: this.catdetails[i].id,
      userdetails: this.logindata
    });
  }

  home() {
    this.navCtrl.push(CategoriesPage);
  }
  leads() {
    this.navCtrl.push(LeadsPage,
      { 'user_id': this.user_id,
       
   });
  }
  chatting() {
    this.navCtrl.push(ChatPage, { user_id: this.user_id });
  }
  webinar() {
    this.navCtrl.push(VideologinPage);
  }
  quotes() {
    this.navCtrl.push(RfqPage, { user_id: this.user_id });
  }
  /*sell lead details */
  sellleaddetails(i) {
    /*this.navCtrl.push(LeadDetailsPage, {
      'userdetails': this.logindata,
      'sid': this.sellleads[i].id, 
      'user_id': this.user_id,
    });
    const confirm = this.alertCtrl.create({
      title: "Confirm to Proceed",
      message:
        "We charge one credit from your wallet to view lead details," +
        this.credits,
      buttons: [
        {
          text: "cancel",
          handler: () => {
            console.log("cancel clicked");
          }
        },
        {
          text: "OK",
          handler: () => {
            this.sell_id = this.sellleads[i].id;
            console.log(this.sellleads[i].chapter_id, "is  chapter id");
            var link = MyApp.url + "checkchapter.php";
            var jdata = JSON.stringify({
              user_id: this.user_id,
              chapter_id: this.sellleads[i].chapter_id,
              lead_id: this.sell_id,
              leadref_id: this.sellleads[i].leadref_id
            });
            console.log("selljsondata=", jdata);
            this.http.post(link, jdata).subscribe(data => {
              this.sellleadspermission = data;
              console.log("sell lead check chapter", data);
              if (data) {
                if (data == "insufficient Credits") {
                  console.log("Insufficient credits");
                  const alert = this.alertCtrl.create({
                    title: "Insufficient Credits",
                    message:
                      "You donot have sufficient credits to view this lead",
                    buttons: ["OK"]
                  });
                  alert.present();
                } else {
                  console.log("clicked OK");
                  console.log("sell lead id=", this.sell_id);
                  this.navCtrl.push(LeadDetailsPage, {
                    sid: this.sellleads[i].id
                  });
                }
              } else {
                const alert = this.alertCtrl.create({
                  message: "you are  not subscribed to this chapter",
                  buttons: ["OK"]
                });
                alert.present();
                //alert("you are  not subscribed! ");
              }
            });
          }
        }
      ]
    });
    confirm.present();
    */
   this.navCtrl.push(LeadsPage)
  }
  /*end selllead details */

  /*buy leaddetails cost deduction */
  buyleaddetails(i) {
    /*  this.navCtrl.push(BuyleaddetailsPage, {
      'userdetails': this.logindata,
      'bid': this.buyleads[i].id,
      'user_id': this.user_id,
    });
    const confirm = this.alertCtrl.create({
      title: "Confirm to Proceed",
      message:
        "We charge one credit from your wallet to view lead details and your credit balance is " +
        this.credits,
      buttons: [
        {
          text: "cancel",
          handler: () => {
            console.log("cancel clicked");
          }
        },
        {
          text: "OK",
          handler: () => {
            this.buy_id = this.buyleads[i].id;
            var link = MyApp.url + "checkchapter.php";
            var jdata = JSON.stringify({
              user_id: this.user_id,
              chapter_id: this.buyleads[i].chapter_id,
              lead_id: this.buyleads[i].id,
              leadref_id: this.buyleads[i].leadref_id
            });
            console.log("buydadat=", jdata);
            this.http.post(link, jdata).subscribe(data => {
              this.buyleadspermission = data;
              console.log("sell lead check chapter", data);
              if (data) {
                if (data == "insufficient Credits") {
                  console.log("insufficient Credits");
                  const alert = this.alertCtrl.create({
                    title: "Insufficient Credits!",
                    message:
                      "You donot have sufficient credits to view this lead",
                    buttons: ["OK"]
                  });
                  alert.present();
                } else {
                  console.log("clicked OK");

                  console.log("buy lead id=", this.buy_id);
                  this.navCtrl.push(BuyleaddetailsPage, {
                    bid: this.buyleads[i].id,
                    userdetails: this.userdata,
                    user_id: this.user_id
                  });
                }
              } else {
                const alert = this.alertCtrl.create({
                  message: "you are  not subscribed to this chapter",
                  buttons: ["OK"]
                });
                alert.present();
                //alert("you are  not subscribed! ");
              }
            });
          }
        }
      ]
    });
    confirm.present();
    */
   this.navCtrl.push(LeadsPage);
  }
  /* end buyleaddetails */
  globalSearch() {
    this.navCtrl.push(GlobalsearchPage);
  }
  ionViewDidLoad() {
    //  this.user_id=this.navParams.get("user_id");

    this.storage.get("userdetails").then(val => {
      this.userdetails = val;
      console.log("User Details", this.userdetails);
     /*  if (!this.userdetails || (this.userdetails>=0 && this.userdetails<10)) {
        this.navCtrl.push(SigninPage);
      }  */
        this.user_id = this.userdetails[0].id;
        this.country_id = this.userdetails[0].country_id;
        this.http.get(MyApp.url + "profile.php?user_id=" + this.user_id)
          .subscribe(edata => {
            this.userdata = edata;
            console.log("userdata", edata);
            this.username = this.userdata[0].name;
            this.business = this.userdata.business_name;
            this.email = this.userdata[0].email;
            this.user_status = this.userdata[0].status;
            this.subscription_id = this.userdata[0].subscription_id;
            this.email_check=this.userdata[0].email_check;
            
           
          });

        this.country_id = this.userdetails[0].country_id;
        console.log("countryiid", this.country_id);
        this.http
          .get(
            MyApp.url +
              "getbuyleadshome.php?country_id=" +this.country_id +"&user_id=" +this.user_id)
          .subscribe(data => {
            this.buyleads = data;

            console.log(this.buyleads, "buyleads");
          });
        this.http
          .get(
            MyApp.url +
              "getsellleadshome.php?country_id=" +
              this.country_id +
              "&user_id=" +
              this.user_id
          )
          .subscribe(data => {
            this.sellleads = data;
            console.log(this.sellleads, "sell leads");
          });

        this.http
          .get(MyApp.url + "getcredits.php?user_id=" + this.user_id)
          .subscribe(edata => {
            this.walletcredits = edata;
            this.credits = this.walletcredits[0].credits;
            console.log(this.walletcredits, "credits");
          });
         
          this.http.get(MyApp.url+"getbanners.php?user_id="+this.user_id+"&country_id="+this.country_id).subscribe((bdata) => {
            this.banners = bdata;
            console.log(this.banners, 'banners');
    
          });
      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
    });
    console.log("Categories Page");
   }
}
