import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  ViewController,
  NavParams,
  AlertController,
  MenuController
} from "ionic-angular";
import { Camera } from "@ionic-native/camera";
import { CategoriesPage } from "../categories/categories";
import { LeadsPage } from "../leads/leads";
import { ChatPage } from "../chat/chat";
import { RfqPage } from "../rfq/rfq";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { MyApp } from "../../app/app.component";
import { VideologinPage } from "../videologin/videologin";

/**
 * Generated class for the ItemCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-item-create",
  templateUrl: "item-create.html"
})
export class ItemCreatePage {
  @ViewChild("groupname") groupname;
  @ViewChild("chapters") chapters;
  @ViewChild("users") users;
  chapter_id: any;
  chat_id: any;
  userdata: any;
  user_id: any;
  chapterslist: any;
  userslist: any;
  createdgroup: any;
  selectedchapter = {};
  selectedusers = [];
  dropdownSettings = {};
  chaptername: any;
  walletcredits: any;
  credits: any;

  subscription: any;
  profiledata: any;
  subscription_id: any;
  chat: any;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public camera: Camera,
    public viewCtrl: ViewController,
    private storage: Storage,
    private http: HttpClient,
    public alertCtrl: AlertController
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

  create() {
    if (this.chat == 1) {
      const confirm = this.alertCtrl.create({
        title: "Confirm",
        message:
          "Are You Sure You want to create this Group? ",
        buttons: [
          {
            text: "Disagree",
            handler: () => {
              console.log("Disagree clicked");
            }
          },
          {
            text: "Agree",
            handler: () => {
              console.log("Agree clicked");

              console.log(this.groupname.value);
              if (this.groupname.value != "" && this.user_id != "") {
                var link = MyApp.url + "creategroupchat.php";
                var jsondata = JSON.stringify({
                  user_id: this.user_id,
                  other_id: this.selectedchapter,
                  group_name: this.groupname.value
                });
                console.log("group json", jsondata);
                this.http.post(link, jsondata).subscribe(data => {
                  this.createdgroup = data;
                  console.log("group creted=", this.createdgroup);
                  if (data) {
                    const alert = this.alertCtrl.create({
                      title: "Success",
                      subTitle: "Group created",
                      buttons: ["OK"]
                    });
                    alert.present();
                    this.navCtrl.push(ChatPage);
                  } else {
                    const alert = this.alertCtrl.create({
                      title: "sorry!",
                      subTitle: "Something Went Wrong unable to create group",
                      buttons: ["OK"]
                    });
                    alert.present();
                  }
                });
              } else {
                const alert = this.alertCtrl.create({
                  title: "Oops!",
                  subTitle: "Please Fill All fields",
                  buttons: ["OK"]
                });
                alert.present();
              }
            }
          }
        ]
      });
      confirm.present();
    } else {
      const alert = this.alertCtrl.create({
        title: "Sorry!",
        subTitle:
          "You not allowed to chat with your package please upgrade your package",
        buttons: ["OK"]
      });
      alert.present();
    }
  }
  ngOnInit() {
    this.storage.get("userdetails").then(val => {
      this.userdata = val;
      console.log("userdata:", this.userdata)
      this.user_id = this.userdata[0].id;
      console.log("user_id=", this.user_id);
      this.http
        .get(MyApp.url + "getgroupchatusers.php?user_id=" + this.user_id)
        .subscribe(data => {
          this.userslist = data;
          console.log("chapters listdropdownlist", this.userslist);

          this.selectedchapter = {};
          this.dropdownSettings = {
            singleSelection: false,
            idField: "id",
            textField: "business_name",
           /*  selectAllText: "Select All",
            unSelectAllText: "UnSelect All", */
            allowSearchFilter: true,
            closeDropDownOnSelection: true,
          };
        });
    });
  }
  getusers(chapid: any) {
    console.log("selected chapters", chapid);
    console.log("chapdata", chapid);
    this.chaptername = chapid;
    console.log("chap", chapid.id);
  }
  onusersslected(items: any) {
    console.log(items);
  }
  ionViewDidLoad() {
    this.storage.get("userdetails").then(val => {
      this.userdata = val;
      this.user_id = this.userdata[0].id;
      console.log("userdata", this.userdata);
      console.log("userdata id", this.user_id);
      this.http
        .get(MyApp.url + "getcredits.php?user_id=" + this.user_id)
        .subscribe(edata => {
          this.walletcredits = edata;
          this.credits = this.walletcredits[0].credits;
          console.log(this.walletcredits, "credits");
        });
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
      this.http
        .get(MyApp.url + "getuserchapters.php?user_id=" + this.user_id)
        .subscribe(data => {
          this.chapterslist = data;
          console.log("chapters list", this.chapterslist);
        });
    });
  }
}
