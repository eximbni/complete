import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  MenuController,
  AlertController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { CategoriesPage } from "../categories/categories";
import { LeadsPage } from "../leads/leads";
import { ChatPage } from "../chat/chat";
import { RfqPage } from "../rfq/rfq";
import { RequirementPage } from "../requirement/requirement";
import { Storage } from "@ionic/storage";
import { MyApp } from "../../app/app.component";
import { VideologinPage } from "../videologin/videologin";

/**
 * Generated class for the MypurchasedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-mypurchasedetails",
  templateUrl: "mypurchasedetails.html"
})
export class MypurchasedetailsPage {
  userdetails: any;
  username: any;
  email: any;
  s_id: any;
  details: any;
  chaptername: any;
  expiry_date: any;
  description: any;
  hsncode: any;
  quantity: any;
  uom: any;
  product: any;
  logindata: any;
  countryname: any;
  leadtype: any;
  lead_id: any;
  leadresponses: any;
  profiledata: any;
  subscription: any;
  subscription_id: any;
  chat: any;
  chatroomdata: any;
  user_id: any;
  posted_by: any;
  toastCtrl: any;
  leaddocuments: Object;
  posted_id: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private storage: Storage,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) {
    this.menuCtrl.enable(true, "sideMenu");
    this.logindata = navParams.get("userdetails");
    console.log("userdetails", this.logindata);
    console.log("sellleadid", this.s_id);
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
    this.navCtrl.push(VideologinPage);
  }
  quotes() {
    this.navCtrl.push(RfqPage);
  }
  respond() {
    console.log("userdetails", this.logindata);
    console.log("leadsdata", this.details);
    console.log("leads type", this.leadtype);
    this.navCtrl.push(RequirementPage, {
      userdetails: this.logindata,
      leaddetails: this.details,
      leadid: this.s_id
    });
  }
  later(){
    const toast = this.toastCtrl.create({
      message: 'Check it later',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
  chatpg(i) {
    if (this.chat == 1) {
      console.log("Agree clicked");
      var link = MyApp.url + "lead_chat.php";
      var chatjsondata = JSON.stringify({
        other_id: this.details[i].posted_by,
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
          this.navCtrl.push(ChatPage, {
            chatroom: this.chatroomdata[i].id
          });
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
    this.s_id = this.navParams.get("sid");
    console.log("ionViewDidLoad sellleaddetailsPage");
    console.log(this.s_id, "id here");

    var url = this.http
      .get(MyApp.url + "leaddetails.php?id=" + this.s_id)
      .subscribe(data => {
        console.log(url);
        this.details = data;
        this.leadtype = this.details[0].lead_type;
        this.lead_id = this.details[0].id;
        this.posted_id = this.details[0].posted_by;
        console.log(this.details, "leaddetails");
        console.log("lead-type=", this.leadtype);
        console.log("lead-id=", this.leadtype);

        this.http.get(MyApp.url+"getlead_documents.php?lead_id="+this.s_id+"&user_id="+this.posted_id).subscribe((data)=>{
          this.leaddocuments = data;
          console.log("leaddocuments data",data);
        });
  



      });
    this.http
      .get(MyApp.url + "users_responses.php?lead_id=" + this.s_id+"&user_id="+this.user_id)
      .subscribe(rdata => {
        this.leadresponses = rdata;
        console.log("response data", rdata);
      });

    this.storage.get("userdetails").then(val => {
      this.userdetails = val;
      this.username = this.userdetails[0].name;
      this.email = this.userdetails[0].email;
      this.posted_by = this.userdetails[0].posted_by;
      this.user_id = this.userdetails[0].id;
      console.log("userdata", this.userdetails);
      console.log("username", this.username);
      this.http
        .get(MyApp.url + "profile.php?user_id=" + this.user_id)
        .subscribe(pdata => {
          this.profiledata = pdata;
          console.log("userprofile data", this.profiledata);
          this.subscription_id = this.profiledata[0].subscription_id;
          console.log("my subscription pack id is=", this.subscription_id);
          console.log("subscription_id:", this.subscription_id);
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
    });
  }
}
