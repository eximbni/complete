import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  AlertController,
  MenuController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { CategoriesPage } from "../categories/categories";
import { LeadsPage } from "../leads/leads";
import { ChatPage } from "../chat/chat";
import { WebinarPage } from "../webinar/webinar";
import { RfqPage } from "../rfq/rfq";
import { MyApp } from "../../app/app.component";
import { MyaccountPage } from "../myaccount/myaccount";


@Component({
  selector: "page-feedback",
  templateUrl: "feedback.html"
})
export class FeedbackPage {
  userdetails: any;
  user_id: any;
  feedbackdata: any;
  @ViewChild("subject") subject;
  @ViewChild("message") message;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage,
    private http: HttpClient,
    public alertCtrl: AlertController
  ) {}
  feedback() {
    var link = MyApp.url + "feedback.php";
    var jdata = JSON.stringify({
      user_id: this.user_id,
      subject: this.subject.value,
      message: this.message.value
    });
    this.http.post(link, jdata).subscribe(data => {
      this.feedbackdata = data;
      console.log("Feed Back Response", this.feedbackdata);
      if (this.feedbackdata == 1) {
        const alert = this.alertCtrl.create({
          title: "Success",
          subTitle: "Thank you for your feedback",
          buttons: ["OK"]
        });
        alert.present();
        this.navCtrl.push(MyaccountPage);
      } else {
        const alert = this.alertCtrl.create({
          title: "Oops",
          subTitle: "There seems to be a technical problem. Please contact our admin team. Sorry for the inconvenience",
          buttons: ["OK"]
        });
        alert.present();
      }
    });
  }
  toggleMenu() {
    this.menuCtrl.toggle();
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
    this.navCtrl.push(WebinarPage);
  }
  quotes() {
    this.navCtrl.push(RfqPage);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    this.storage.get("userdetails").then(val => {
      this.userdetails = val;
      this.user_id = this.userdetails[0].id;
      console.log("user id", this.user_id);
    });

    console.log("ionViewDidLoad FeedbackPage");
  }
}
