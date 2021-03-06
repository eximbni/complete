import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  MenuController
} from "ionic-angular";
import { CategoriesPage } from "../categories/categories";
import { LeadsPage } from "../leads/leads";
import { ChatPage } from "../chat/chat";
import { RfqPage } from "../rfq/rfq";
import { HttpClient } from "@angular/common/http";
import { IndividualchatPage } from "../individualchat/individualchat";
import { MyApp } from "../../app/app.component";
import { Storage } from "@ionic/storage";
import { VideologinPage } from "../videologin/videologin";

/**
 * Generated class for the MyleadDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-mylead-details",
  templateUrl: "mylead-details.html"
})
export class MyleadDetailsPage {
  from: any;
  to: any;
  product: any;
  quantity: any;
  uom: any;
  lead_id: any;
  leadresponses: any;
  description: any;
  user_id: any;
  profiledata: any;
  subscription: any;
  subscription_id: any;
  chat: any;
  chatroomdata: any;
  userdetails: any;
  leadref_id: any;
  leaddocuments: Object;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    private http: HttpClient,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {}

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
    this.navCtrl.push(VideologinPage);
  }
  quotes() {
    this.navCtrl.push(RfqPage);
  }
  chatpg(i) {
    if (this.chat == "1") {
      console.log("Agree clicked");
      var link = MyApp.url + "lead_chat.php";
      var chatjsondata = JSON.stringify({
        other_id: this.leadresponses[i].response_posted_by,
        user_id: this.user_id
      });

      console.log("sending data", chatjsondata);
      this.http.post(link, chatjsondata).subscribe(rdata => {
        this.chatroomdata = rdata;
        console.log("data", rdata);
        if (rdata != 0) {
          const alert = this.alertCtrl.create({
            title: "Success!",
            subTitle: "You just added to chat",
            buttons: ["OK"]
          });
          alert.present();
          this.navCtrl.push(IndividualchatPage, {
            chatroom: this.chatroomdata[i].id
          });
        } 
        else {
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
    this.lead_id = this.navParams.get("id");
    this.from = this.navParams.get("from");
    this.to = this.navParams.get("to");
    this.product = this.navParams.get("product");
    this.quantity = this.navParams.get("quantity");
    this.uom = this.navParams.get("uom");
    this.description = this.navParams.get("description");
    this.leadref_id = this.navParams.get("leadref_id");

    this.storage.get("userdetails").then(val => {
      this.userdetails = val;

      this.user_id = this.userdetails[0].id;
      console.log("userdata", this.userdetails);
      this.http
        .get(MyApp.url + "profile.php?user_id=" + this.user_id)
        .subscribe(pdata => {
          this.profiledata = pdata;
          console.log("userprofile data", this.profiledata);
          this.subscription_id = this.profiledata[0].subscription_id;
          console.log("my subscription pack id is=", this.subscription_id);

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
              console.log("userprofile data", this.profiledata);
            });

        });
       // console.log(MyApp.url+"users_responses.php?lead_id="+this.lead_id+"&user_id="+this.user_id);
        this.http.get(MyApp.url+"users_responses.php?lead_id="+this.lead_id+"&user_id="+this.user_id).subscribe((data)=>{
          this.leadresponses = data;
          console.log("response data",data);
        });

        this.http.get(MyApp.url+"getlead_documents.php?lead_id="+this.lead_id+"&user_id="+this.user_id).subscribe((data)=>{
          this.leaddocuments = data;
          console.log("leaddocuments data",data);
        });
      

    });
    console.log("ionViewDidLoad MyleadDetailsPage");
  }
}
