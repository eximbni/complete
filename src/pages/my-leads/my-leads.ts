import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyleadDetailsPage } from '../mylead-details/mylead-details';
import { ChatPage } from '../chat/chat';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';
import { MybuydetailsPage } from '../mybuydetails/mybuydetails';
import { VideologinPage } from '../videologin/videologin';

/**
 * Generated class for the MyLeadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-leads',
  templateUrl: 'my-leads.html',
})
export class MyLeadsPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  userid:any;u_id:any;
  lead: any;rows:any;
  sellleads:any; count1:any;
  buyleads:any; count:any;
  buyerrmsg:any;
  sellerrmsg:any;
  constructor(public navCtrl: NavController,public navParams: NavParams, private http: HttpClient,
    private storage: Storage, private menuCtrl:MenuController) {}
    toggleMenu() {
      this.menuCtrl.toggle();
    }
  home(){
    this.navCtrl.push(CategoriesPage);
  }
  leads(){
    this.navCtrl.push(LeadsPage);
  }
  chatting(){
    this.navCtrl.push(ChatPage);
  }
  webinar(){  
    this.navCtrl.push(VideologinPage);
  }
  quotes(){
    this.navCtrl.push(RfqPage);
  }
  sellerp(i){
    this.navCtrl.push(MyleadDetailsPage, {
      'id':this.sellleads[i].id,
'from':this.sellleads[i].posted_date,
'to':this.sellleads[i].expiry_date,
'product':this.sellleads[i].product,
'quantity':this.sellleads[i].quantity,
'uom':this.sellleads[i].uom,
'description':this.sellleads[i].description,
'leadref_id':this.sellleads[i].leadref_id,
      });
  }
buyersp(i){
    this.navCtrl.push(MybuydetailsPage,{
      'id':this.buyleads[i].id,
      'from':this.buyleads[i].posted_date,
      'to':this.buyleads[i].expiry_date,
      'product':this.buyleads[i].product,
      'quantity':this.buyleads[i].quantity,
      'uom':this.buyleads[i].uom,
      'description':this.buyleads[i].description,
      'leadref_id':this.buyleads[i].leadref_id,
    });
  }
 
  cht(){
    this.navCtrl.push(ChatPage);
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


Back(){
  this.navCtrl.push(CategoriesPage);
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
    console.log('ionViewDidLoad MyLeadsPage');
   this.storage.get('user_id').then((user_id) => {
      this.userid = user_id;
      console.log(this.userid,'uni id');
      this.http.get(MyApp.url+"mybuyleads.php?u_id="+this.userid).subscribe((data)=>{
     
     if(data==0){
      this.buyerrmsg="You have not posted any leads yet";
     }else{
      this.buyleads=data;
      console.log('buyleads',this.buyleads);
     }  
      });
      this.http.get(MyApp.url+"mysellleads.php?u_id="+this.userid).subscribe((edata)=>{
         
     if(edata==0){
      this.sellerrmsg="You have not posted any leads yet";
           }else{
            this.sellleads = edata;
            console.log('selleads',this.sellleads);
           }  
       
      });

    });
   
  }
 

}
