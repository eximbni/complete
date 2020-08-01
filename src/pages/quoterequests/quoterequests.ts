import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  MenuController,
  AlertController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { CategoriesPage } from "../categories/categories";
import { ChatPage } from "../chat/chat";
import { RfqPage } from "../rfq/rfq";
import { MyApp } from "../../app/app.component";
import { VideologinPage } from "../videologin/videologin";
import { LeadsPage } from "../leads/leads";

@Component({
  selector: 'page-quoterequests',
  templateUrl: 'quoterequests.html',
})
export class QuoterequestsPage {
  logindata: any;
  userdata: any;
  user_id: any;
  country_id: any;
  requestmsg: string;
  qrequest: Object;
  chatroomdata: any;
  details: any;
  chat: number;
  subscription: any;
  subscription_id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public alertCtrl: AlertController,
    private storage: Storage,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(true, "sideMenu");
    this.logindata = navParams.get("userdetails");
    console.log("userdetails", this.logindata); 
  }


  home() {
    this.navCtrl.push(CategoriesPage);
  }
  leads() {
    this.navCtrl.push(LeadsPage);
  }
  chatting() {
    this.navCtrl.push(ChatPage);
  }
  webinar() {
    this.navCtrl.push(VideologinPage);
  }
  quotes() {
    this.navCtrl.push(RfqPage);
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
  createchat(i) {
    if (this.chat == 1) {
      console.log("Agree clicked");
      var link = MyApp.url + "lead_chat.php";
      var chatjsondata = JSON.stringify({
        other_id: this.qrequest[i].posted_by,
        user_id: this.user_id
      });

      console.log("sending data", chatjsondata);
      this.http.post(link, chatjsondata).subscribe(data => {
        this.chatroomdata = data;
        console.log("data", data);
        if (data==1) {
          const alert = this.alertCtrl.create({
            title: "Success!",
            subTitle: "You just added to chat",
            buttons: ["OK"]
          });
          alert.present();
          this.navCtrl.push(ChatPage);
        }else if(data==2){
          const alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Your are alreday added..!',
            buttons: ['OK']
          });
          alert.present();
        }else if(data==3){
          const alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Your have insufficiant credits..!',
            buttons: ['OK']
          });
          alert.present();

        } else {
          const alert = this.alertCtrl.create({
            title: "Oops!",
            subTitle: "Your request for adding is not done!",
            buttons: ["OK"]
          });
          alert.present();
        }
      });
    } else {
      const alert = this.alertCtrl.create({
        title: "Sorry!",
        subTitle: "You are not eligible to chat, please check your package",
        buttons: ["OK"]
      });
      alert.present();
    }
  }
  
  ionViewDidLoad() {
    this.storage.get("userdetails").then(val => {
      this.userdata = val;
      this.user_id = this.userdata[0].id;
      this.country_id = this.userdata[0].country_id;
      this.subscription_id = this.userdata[0].subscription_id;
      console.log("userdata", this.userdata);
      console.log("countryiid", this.country_id);

      this.http
        .get( MyApp.url +
            "getrfqrequest.php?user_id=" +
            this.user_id)
        .subscribe(data => {
          if (data == null || data == 0) {
            console.log(data);
            this.requestmsg = "There are no quatation request";
            console.log("There are no buy leads");
          } else {
            this.qrequest = data;
            console.log("quatation request", data);
          }
        });

        this.http
            .get(
              MyApp.url +
                "mysubscription.php?subscription_id=" +
                this.subscription_id
            )
            .subscribe(pdata => {
              this.subscription = pdata;
              this.chat = this.subscription[0].chat;
              console.log("chat option is", this.chat); 
            });


    });


    console.log('ionViewDidLoad QuoterequestsPage');

  }

}
