import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, MenuController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChatPage } from '../chat/chat';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { RfqPage } from '../rfq/rfq';
import { MypurchasedetailsPage } from '../mypurchasedetails/mypurchasedetails';
import { MypurchasebuydetailsPage } from '../mypurchasebuydetails/mypurchasebuydetails';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';

/**
 * Generated class for the MyLeadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-mypurchaseleads',
  templateUrl: 'mypurchaseleads.html',
})
export class MypurchaseleadsPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  sellleads: any;
  userdetails: any;
  show = false;
  chapter_id: any;
  buyleads: any;
  leaddetails: any;
  username: any; l
  ead_user: any;
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
  sellerrmsg:any;
  buyerrmsg:any;
  policy: Object;
  bxp_policy: any;
  bimp_policy: any;
  sexp_policy: any;
  simp_policy: any;
  messagecount: Object;
  showcount: any;

  constructor(public navCtrl: NavController,public navParams: NavParams, private http: HttpClient, public alertCtrl: AlertController,

    private storage: Storage, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, "sideMenu");
    this.logindata = navParams.get('userdetails');
    console.log('userdetails', this.logindata);
  }
 
  sellleaddetails(i) {
    console.log('sell lead id=', this.sellleads[i].id);
    this.navCtrl.push(MypurchasedetailsPage, { 'sid': this.sellleads[i].id, 'userdetails': this.logindata });
  }
  //to see lead details
  buyleaddetails(i) {
    console.log('buy lead id=',   this.buyleads[i].id);
    this.navCtrl.push(MypurchasebuydetailsPage, { 'bid':  this.buyleads[i].id, 'userdetails': this.logindata });
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
  
  Back() {
    this.navCtrl.push(CategoriesPage);
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

  // Initialize slider
  ionViewDidEnter() {
    this.slideChanged();
  }

  // On segment click
  selectedTab(index) {
    this.slider.slideTo(index);
    console.log("selectedTab", index)
  }


  // On slide changed
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    let slides_count = this.segments.nativeElement.childElementCount;

    this.page = currentIndex.toString();
    if (this.page >= slides_count)
      this.page = (slides_count - 1).toString();

    console.log("slides_count", slides_count)
    console.log("this.page", this.page)
    this.centerScroll();
  }

  // Center current scroll
  centerScroll() {
    if (!this.segments || !this.segments.nativeElement)
      return;

    let sizeLeft = this.sizeLeft();
    let sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent / 2);

    result = (result > 0) ? result : 0;
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
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
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
  ionViewDidLoad() {
    this.storage.get('userdetails').then((val) => {
      this.userdata = val;
      this.user_id = this.userdata[0].id;
      this.country_id = this.userdata[0].country_id;
      console.log('userdata', this.userdata);
      console.log('countryiid', this.country_id);

      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })

      this.http.get(MyApp.url+"purchasedbuyleads.php?user_id=" + this.user_id).subscribe((data) => {
        console.log("My Purchase buy leads",data);
      if(data==0){
        this.buyerrmsg="You have not purchased any leads yet"
      } else{
        this.buyleads = data;
        console.log(data, 'buyleads');
      } 
      });
      this.http.get(MyApp.url+"purchasedsellleads.php?user_id=" + this.user_id).subscribe((sdata) => {
        console.log("My Purchase sell leads",sdata);
        if(sdata==0){
          this.sellerrmsg="You have not purchased any leads yet"
                } else{
                  this.sellleads = sdata;
        console.log(sdata, 'sell leads');
                }  
      });
     /* this.http.get(MyApp.url + "getcredits.php?user_id=" + this.user_id).subscribe((edata) => {
        this.walletcredits = edata;
        this.credits = this.walletcredits[0].credits;
        console.log(this.walletcredits, 'credits');

      });*/
    });
    console.log('ionViewDidLoad LeadsPage');
  }

}
