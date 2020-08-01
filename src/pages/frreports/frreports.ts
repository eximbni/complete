import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, MenuController, AlertController } from 'ionic-angular';
import { FrincomePage } from '../frincome/frincome';
import { FrbuyleadsPage } from '../frbuyleads/frbuyleads';
import { FrsellleadsPage } from '../frsellleads/frsellleads';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the FrreportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-frreports',
  templateUrl: 'frreports.html',
})
export class FrreportsPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  frusercount:any;
  usercount:any;
  frcount:any;
  frincome:any;
  leadsincome:any;
  franchiseincome:any;
  bannerincome:any;
  grosstotal:any;
  expenditure:any;
  nettotal:any;
  subscriptionincome:any;
  buyleadcount:any;
  sellleadcount:any;
  user_id:any;
  frleadcount:any;
  userdetails:any;
  country_id:any;
  countryuserslist:any;
  users:any;
  franchiseusers:any;
  franchise_id:any;
  frincometotal:any;
  frbannerincometotal:any;
  frleadsincometotal:any;
  frsubscriptionincometotal:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private storage:Storage,public menuCtrl:MenuController,
    public alertCtrl:AlertController) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  home(){
    this.navCtrl.push(FranchiseDashBoardPage);
    }
   
    selllist(){
      this.navCtrl.push(FrsellleadsPage);
    } 
    
    buylist(){
      this.navCtrl.push(FrbuyleadsPage);
    } 
    income(){
      this.navCtrl.push(FrincomePage);
    }
    
    reports(){
      this.navCtrl.push(FrreportsPage);
    } 
    printpl(){
      this.http.get(`${MyApp.url+'profitloss.php'}`).subscribe(response => this.downLoadFile(response, "application/ms-excel"));
      const alert = this.alertCtrl.create({
        subTitle: 'Sorry No data available',
        buttons: ['OK']
      });
      alert.present();
    }
    downLoadFile(data: any, type: string) {
      let blob = new Blob([data], { type: type});
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert( 'Please disable your Pop-up blocker and try again.');
      }
  }
// Initialize slider
ionViewDidEnter(){
  this.slideChanged();
}

// On segment click
selectedTab(index) {
  this.slider.slideTo(index);
  console.log("selectedTab",index)
}


// On slide changed
slideChanged() {
  let currentIndex = this.slider.getActiveIndex();
  let slides_count = this.segments.nativeElement.childElementCount;

  this.page = currentIndex.toString();
  if(this.page >= slides_count)
    this.page = (slides_count-1).toString();

  console.log("slides_count",slides_count)
  console.log("this.page",this.page)
  this.centerScroll();
}

// Center current scroll
centerScroll(){
  if(!this.segments || !this.segments.nativeElement)
    return;

  let sizeLeft = this.sizeLeft();
  let sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
  let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent/2) ;

  result = (result > 0) ? result : 0;
  this.smoothScrollTo(result);
}

// Get size start to current
sizeLeft(){
  let size = 0;
  for(let i = 0; i < this.page; i++){
    size+= this.segments.nativeElement.children[i].clientWidth;
  }
  return size;
}

// Easing function
easeInOutQuart(time, from, distance, duration) {
  if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
  return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
}

// Animate scroll
smoothScrollTo(endX){
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
    this.storage.get("userdetails").then((val)=>{
      this.userdetails = val;
      this.franchise_id = this.userdetails[0].franchise_id;
      console.log('userdetails',this.userdetails,'user_id',this.franchise_id);
      this.http.get(MyApp.url+"getfrincome.php?franchise_id="+this.franchise_id).subscribe((data)=>{
        this.frincometotal=data;
        console.log('fr total  income', this.frincometotal);
      })
      this.http.get(MyApp.url+"getfrbannersincome.php?franchise_id="+this.franchise_id).subscribe((bannerdata)=>{
        this.frbannerincometotal=bannerdata;
        console.log('fr total  bannerincome', this.frbannerincometotal);
      })
      this.http.get(MyApp.url+"getfrleadsincome.php?franchise_id="+this.franchise_id).subscribe((leadsdata)=>{
        this.frleadsincometotal=leadsdata;
        console.log('fr total lead income', this.frleadsincometotal);
      })
      this.http.get(MyApp.url+"getfrsubscriptionincome.php?franchise_id="+this.franchise_id).subscribe((subscriptiondata)=>{
        this.frsubscriptionincometotal=subscriptiondata;
        console.log('fr totalsub income', this.frsubscriptionincometotal);
      })

    })
  }

}
