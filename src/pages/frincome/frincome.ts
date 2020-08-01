import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams, Slides, MenuController } from 'ionic-angular';
import { FranchiseDashBoardPage } from '../franchise-dash-board/franchise-dash-board';
import { FrsellleadsPage } from '../frsellleads/frsellleads';
import { FrbuyleadsPage } from '../frbuyleads/frbuyleads';
import { FrreportsPage } from '../frreports/frreports';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
/**
 * Generated class for the FrincomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-frincome',
  templateUrl: 'frincome.html',
})
export class FrincomePage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  @ViewChild('frstart_date') frstart_date;
  @ViewChild('frend_date') frend_date;
  @ViewChild('bannerstart_date') bannerstart_date;
  @ViewChild('bannerend_date') bannerend_date;
  @ViewChild('leadstart_date') leadstart_date;
  @ViewChild('leadend_date') leadend_date;
  @ViewChild('userstart_date') userstart_date;
  @ViewChild('userend_date') userend_date;
  page: any;
  frincometotal:any;
  userdetails:any;
  franchise_id:any;
  frbannerincometotal:any;
  frleadsincometotal:any;
  frsubscriptionincometotal:any;
  franciseincomes:any;
  subincome:any;
  bannerincome:any;
  leadsincome:any;
  franchiseincome:any;
  mobile: any;
  frdata: any;
  fr_id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private http:HttpClient, public menuCtrl:MenuController) {
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
franchiseIncome(){
  var link= MyApp.url+"franchiseincome.php";
  var frincomedata = JSON.stringify({
    'fr_id': this.fr_id,
    'start_date':this.frstart_date.value,
    'end_date':this.frend_date.value
  })
  console.log('json data',frincomedata);
  this.http.post(link,frincomedata).subscribe((data)=>{
    this.franchiseincome = data;
    console.log('franchiseincome ', this.franchiseincome);
  });

}
leadsIncome(){
  var link= MyApp.url+"frleadsincome.php";
  var leadsdata = JSON.stringify({
    'mobile': this.mobile,
    'start_date':this.leadstart_date.value,
    'end_date':this.leadend_date.value
  });
  console.log('json data',leadsdata);
  this.http.post(link,leadsdata).subscribe((data)=>{
    this.leadsincome = data;
    console.log('leads income', this.leadsincome);
  });

}
bannerIncome(){
  var link= MyApp.url+"frbannerincome.php";
  var bannerdata = JSON.stringify({
    'mobile': this.mobile,
    'start_date':this.bannerstart_date.value,
    'end_date':this.bannerend_date.value
  });
  console.log('json data',bannerdata);
  this.http.post(link,bannerdata).subscribe((data)=>{
    this.bannerincome = data;
    console.log('banner income', this.bannerincome);
  });

}
subscriptionIncome(){
  var link= MyApp.url+"frsubscription.php";
  var subdata = JSON.stringify({
    'fr_id': this.fr_id,
    'start_date':this.userstart_date.value,
    'end_date':this.userend_date.value
  });
  console.log('json data',subdata);
  this.http.post(link,subdata).subscribe((data)=>{
    this.subincome = data;
    console.log('subscriptrion income', this.subincome);
  });

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrincomePage');
    this.storage.get("frdata").then((val)=>{
      this.frdata=val;
      this.fr_id = this.frdata[0].id;
      console.log("Fracnhcise id:", this.fr_id);
      this.http.get(MyApp.url+"getfrincome.php?fr_id="+this.fr_id).subscribe((data)=>{
        this.frincometotal=data;
        console.log('fr total  income', this.frincometotal);
      })
      this.http.get(MyApp.url+"getfrbannersincome.php?fr_id="+this.fr_id).subscribe((bannerdata)=>{
        this.frbannerincometotal=bannerdata;
        console.log('fr total  bannerincome', this.frbannerincometotal);
      })
      this.http.get(MyApp.url+"getfrleadsincome.php?fr_id="+this.fr_id).subscribe((leadsdata)=>{
        this.frleadsincometotal=leadsdata;
        console.log('fr total lead income', this.frleadsincometotal);
      })
      this.http.get(MyApp.url+"getfrsubscriptionincome.php?fr_id="+this.fr_id).subscribe((subscriptiondata)=>{
        this.frsubscriptionincometotal=subscriptiondata;
        console.log('fr totalsub income', this.frsubscriptionincometotal);
      })
    })
   
    this.storage.get("userdetails").then((val)=>{
      this.userdetails = val;
      this.mobile = this.userdetails[0].mobile;
      console.log('userdetails',this.userdetails,'user_id',this.mobile);

      

    })
  }

}
