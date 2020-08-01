import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  Slides,
  MenuController,
  AlertController
} from "ionic-angular";
import { LeadDetailsPage } from "../lead-details/lead-details";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { CategoriesPage } from "../categories/categories";
import { ChatPage } from "../chat/chat";
import { RfqPage } from "../rfq/rfq";
import { BuyleaddetailsPage } from "../buyleaddetails/buyleaddetails";
import { MyApp } from "../../app/app.component";
import { VideologinPage } from "../videologin/videologin";


@Component({
  selector: "page-leads",
  templateUrl: "leads.html"
})
export class LeadsPage {
  @ViewChild("slider") slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  sellleads: any;
  userdetails: any;
  show = false;
  chapter_id: any;
  buyleads: any;
  leaddetails: any;
  username: any;
  lead_user: any;
  details: any;
  chaptername: any;
  expiry_date: any;
  description: any;
  hsncode: any;
  quantity: any;
  uom: any;
  product: any;
  name: any;
  email: any;
  sellid: any;
  buyid: any;
  country_id: any;
  userdata: any;
  buy_id: any;
  sell_id: any;
  sellerleads: any;
  b_id: any;
  logindata: any;
  user_id: any;
  walletcredits: any;
  credits: any;
  sellleadchapter_id: any;
  buyleadchapter_id: any;
  sellleadspermission: any;
  buyleadspermission: any;
  skipbuylead: any;
  skipbselllead: any;
  buyermsg: any;
  sellermsg: any;
  hscode: any;
  cal: boolean=false;
  cslot: Date;
  todayDate: any;
  remindtoday: Date;
  reminddate: string;
  remindmonth: string;
  remindyear: number;
  remindtodaydate: string;
  policy: Object;
  bimp_policy: any;
  bxp_policy: any;
  simp_policy: any;
  sexp_policy: any;

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
    this.sellleads= this.navParams.get("Sellleads");
    this.buyleads= this.navParams.get("Buyleads");
  }

  simport(i){
    
    this.http.get(MyApp.url+"gethscodepolicybycountries.php?country_id="+this.country_id+"&hscodes="+this.sellleads[i].hsn_id).subscribe((data)=>{
      this.policy = data;
      this.simp_policy = this.policy[0].exp_policy;
    
    const alert = this.alertCtrl.create({
      title: 'Import Policy',
      subTitle: this.simp_policy,
      buttons: ['OK']
    });
    alert.present();
  })
  }
  sexport(i){
    this.http.get(MyApp.url+"gethscodepolicybycountries.php?country_id="+this.country_id+"&hscodes="+this.sellleads[i].hsn_id).subscribe((data)=>{
      this.policy = data;
      this.sexp_policy = this.policy[0].exp_policy;
    
    const alert = this.alertCtrl.create({
      title: 'Export Policy',
      subTitle: this.sexp_policy,
      buttons: ['OK']
    });
    alert.present();
  })
  }

  bimport(i){
    this.http.get(MyApp.url+"gethscodepolicybycountries.php?country_id="+this.country_id+"&hscodes="+this.buyleads[i].hsn_id).subscribe((data)=>{
      this.policy = data;
      this.bimp_policy = this.policy[0].imp_policy;
    
    const alert = this.alertCtrl.create({
      title: 'Import Policy',
      subTitle: this.bimp_policy,
      buttons: ['OK']
    });
    alert.present();
  })
  }
  bexport(i){
    this.http.get(MyApp.url+"gethscodepolicybycountries.php?country_id="+this.country_id+"&hscodes="+this.buyleads[i].hsn_id).subscribe((data)=>{
      this.policy = data;
      this.bxp_policy = this.policy[0].exp_policy;
    
    const alert = this.alertCtrl.create({
      title: 'Export Policy',
      subTitle: this.bxp_policy,
      buttons: ['OK']
    });
    alert.present();
  })
  }

  sellleaddetails(i) {
    const confirm = this.alertCtrl.create({
      title: "Confirm to Proceed",
      message:
        "This purchase will cost you 1 Credit. By accepting this purchase 1 Credit will be deducted from your balance credits",
      buttons: [
        {
          text: "cancel",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Agree",
          handler: () => {
            this.sell_id = this.sellleads[i].lead_id;
            console.log(this.sellleads[i].chapter_id, "is  chapter id");
            var link = MyApp.url + "checkchapter.php";
            var jdata = JSON.stringify({
              user_id: this.user_id,
              chapter_id: this.sellleads[i].chapter_id,
              lead_id: this.sellleads[i].lead_id,
              leadref_id: this.sellleads[i].leadref_id
            });
            console.log("selljsondata=", jdata);
            this.http.post(link, jdata).subscribe(data => {
              this.sellleadspermission = data;
              console.log("sell lead check chapter", data);
              if (data != "insufficient Credits") {
                console.log("Agree clicked");
                console.log("sell lead id=", this.sell_id);
                this.navCtrl.push(LeadDetailsPage, {
                  'sid': this.sellleads[i].lead_id
                });
              } else {
                const alert = this.alertCtrl.create({
                  title: "Oops!",
                  subTitle:
                    "You do not have sufficient funds to make this purchase. Please recharge your account to process further",
                  buttons: ["OK"]
                });
                alert.present();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
  //to see lead details
  buyleaddetails(i) {
    const confirm = this.alertCtrl.create({
      title: "Confirm to Proceed",
      message: "Buying this Leads will consume one credt from your wallet. Are you sure to buy this lead and you credits are " + this.credits,
      buttons: [
        {
          text: "cancel",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Agree",
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
              console.log("sell lead check chapter=", data);
              if (data != "insufficient Credits") {
                console.log("Agree clicked");

                console.log("buy lead id=", this.buy_id);
                this.navCtrl.push(BuyleaddetailsPage, {
                  bid: this.buyleads[i].id,
                  userdetails: this.userdata
                });
              } else {
                alert("You do not have sufficient funds to make this purchase. Please recharge your account to process further");
              }
            });
          }
        }
      ]
    });
    confirm.present();
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
  remindBuyLeads(i) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Reminder Date');

    alert.addInput({
      type: 'date',
      label: 'Remnder Date',
      value: '',
      name: 'remind_date'
      
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: (data) => {
        var link = MyApp.url + "leadremind.php";
        var jdata = JSON.stringify({
          user_id: this.user_id,
          lead_id: this.buyleads[i].id,
          remind_date:data.remind_date
        });
        console.log("buydadata remindmelater=", jdata);
        this.http.post(link, jdata).subscribe(sdata => {
          this.skipbuylead = sdata;
          this.navCtrl.push(LeadsPage);
        });
      }
    });
    alert.present();
  }
  


  remindSellLeads(i) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Reminder Date');

    alert.addInput({
      type: 'date',
      label: 'Remnder Date',
      value: '',
      name: 'remind_date'
      
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: (data) => {
        var link = MyApp.url + "leadremind.php";
        var jdata = JSON.stringify({
          user_id: this.user_id,
          lead_id: this.sellleads[i].id,
          remind_date:data.remind_date
        });
        console.log("selldata remindmelater =", jdata);
        this.http.post(link, jdata).subscribe(sdata => {
          this.skipbuylead = sdata;
          this.navCtrl.push(LeadsPage);
        });
      }
    });
    alert.present();
  }


  skipbuyleads(i) {
    const confirm = this.alertCtrl.create({
      title: "Skip this Lead?",
      message: "Skipped leads will not visible any more do you want to skip?",
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
            var link = MyApp.url + "skipleads.php";
            var jdata = JSON.stringify({
              user_id: this.user_id,
              lead_id: this.buyleads[i].id
            });
            console.log("buydadata skip=", jdata);
            this.http.post(link, jdata).subscribe(sdata => {
              this.skipbuylead = sdata;
              this.navCtrl.push(LeadsPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }
  skipsellleads(i) {
    const confirm = this.alertCtrl.create({
      title: "Use this lightsaber?",
      message: "Skipped leads will not visible any more do you want to skip?",
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
            var link = MyApp.url + "skipleads.php";
            var jdata = JSON.stringify({
              user_id: this.user_id,
              lead_id: this.sellleads[i].id
            });
            console.log("selljson skip=", jdata);
            this.http.post(link, jdata).subscribe(sdata => {
              this.skipbselllead = sdata;
              console.log(this.skipbselllead);
              this.navCtrl.push(LeadsPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }
  // Initialize slider
  ionViewDidEnter() {
    this.slideChanged();
  }

  // On segment click
  selectedTab(index) {
    this.slider.slideTo(index);
    console.log("selectedTab", index);
  }

  // On slide changed
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    let slides_count = this.segments.nativeElement.childElementCount;

    this.page = currentIndex.toString();
    if (this.page >= slides_count) this.page = (slides_count - 1).toString();

    console.log("slides_count", slides_count);
    console.log("this.page", this.page);
    this.centerScroll();
  }

  // Center current scroll
  centerScroll() {
    if (!this.segments || !this.segments.nativeElement) return;

    let sizeLeft = this.sizeLeft();
    let sizeCurrent = this.segments.nativeElement.children[this.page]
      .clientWidth;
    let result = sizeLeft - window.innerWidth / 2 + sizeCurrent / 2;

    result = result > 0 ? result : 0;
    this.smoothScrollTo(result);
  }

  // Get size start to current
  sizeLeft() {
    let size = 0;
    for (let i = 0; i < this.page; i++) {
      size += this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }

  // Easing function
  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  }

  // Animate scroll
  smoothScrollTo(endX) {
    let startTime = new Date().getTime();
    let startX = this.segments.nativeElement.scrollLeft;
    let distanceX = endX - startX;
    let duration = 400;

    let timer = setInterval(() => {
      var time = new Date().getTime() - startTime;
      var newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }

  mybfav(i){
    this.hscode = this.buyleads[i].hsn_id;
    this.http.get(MyApp.url+"addmyfavhscode.php?user_id="+this.user_id+"&hscode="+this.hscode).subscribe((data)=>{
      console.log("favcode:", data);
      if(data==1){
        alert("This HSCODE has been added to your favorites. You can view your favorite HSCODES in the top menu list");
        this.navCtrl.push(LeadsPage);
      }
      else{
        alert("seems to be a technical problem. Please contact our admin team. Sorry for the inconvenience");
      }
    })
  }
  mysfav(i){
    this.hscode = this.sellleads[i].hsn_id;
    this.http.get(MyApp.url+"addmyfavhscode.php?user_id="+this.user_id+"&hscode="+this.hscode).subscribe((data)=>{
      if(data==1){
        alert("This HSCODE has been added to your favorites. You can view your favorite HSCODES in the top menu list");
        this.navCtrl.push(LeadsPage);
      }
      else{
        alert("There seems to be a technical problem. Please contact our admin team. Sorry for the inconvenience");
      }
    })
  }
  postlead(){
    this.navCtrl.push(RfqPage);
  }
  ionViewDidLoad() {
    this.storage.get("userdetails").then(val => {
      this.userdata = val;
      this.user_id = this.userdata[0].id;
      this.country_id = this.userdata[0].country_id;
      console.log("userdata", this.userdata);
      console.log("countryiid", this.country_id);

      this.http
        .get(
          MyApp.url +
            "getbuyleads.php?country_id=" +
            this.country_id +
            "&user_id=" +
            this.user_id
        )
        .subscribe(data => {
          if (data == null || data == 0) {
            console.log(data);
            this.buyermsg = "There are no leads";
            console.log("There are no buy leads");
          } else {
            this.buyleads = data;
            console.log(data, "buyleads");
          }
        });
      this.http
        .get(
          MyApp.url + "getsellleads.php?country_id="+this.country_id +"&user_id=" +this.user_id)
        .subscribe(sdata => {
          if (sdata == null || sdata == 0) {
            this.sellermsg = "There are no leads";
            console.log("There are no sell leads");
          } else {
            this.sellleads = sdata;
            console.log(sdata, "sell leads");
          }
        });
      this.http
        .get(MyApp.url + "getcredits.php?user_id=" + this.user_id)
        .subscribe(edata => {
          this.walletcredits = edata;

          this.credits = this.walletcredits[0].credits;
          console.log(this.walletcredits, "credits");
        });
    });
    console.log("ionViewDidLoad LeadsPage");
    this.cslot=new Date();
    
  }
}
