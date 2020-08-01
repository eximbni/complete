import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  ToastController,
  MenuController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { MyApp } from "../../app/app.component";
import { SigninPage } from "../signin/signin";
import { CategoriesPage } from "../categories/categories";
import { Storage } from "@ionic/storage";


@Component({
  selector: "page-logout",
  templateUrl: "logout.html"
})
export class LogoutPage {
  userdata: any;
  logoutdata: any;
  user_id: any;
  email: any;
  userdetails: any;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private http: HttpClient,
    private storage: Storage
  ) {}
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  ionViewDidLoad() {
    const confirm = this.alertCtrl.create({
      title: "LOG OUT",
      message: "Do you want to Logout?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            this.navCtrl.push(CategoriesPage);
          }
        },
        {
          text: "OK",
          handler: () => {
            this.storage.get("userdetails").then(data => {
              this.userdetails = data;
              this.user_id = this.userdetails[0].id;
              this.http.get(MyApp.url+"update_userchatstatus.php?user_id="+this.user_id+"&status=offline").subscribe((cudata)=>{
                console.log('groups',cudata );
              });
              this.http
                .get(MyApp.url + "profile.php?user_id=" + this.user_id)
                .subscribe(pdata => {
                  this.userdata = pdata;
                  this.email = this.userdata[0].email;
                  console.log("userdata", this.userdata);
                  var link = MyApp.url + "logout.php";
                  var jdata = JSON.stringify({
                    email: this.email
                  });
                  console.log(jdata);
                  this.http.post(link, jdata).subscribe(edata => {
                    this.logoutdata = edata;
                    console.log(edata);
                    if (edata == 1) {
                      this.storage.remove("userdetails");
                      this.navCtrl.push(SigninPage);
                    } else {
                      const toast = this.toastCtrl.create({
                        message: "Can't logout",
                        duration: 3000
                      });
                      toast.present();
                    }
                  });
                });
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
