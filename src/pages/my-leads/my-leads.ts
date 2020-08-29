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
import { MyleadDetailsPage } from '../mylead-details/mylead-details';
import { MybuydetailsPage } from '../mybuydetails/mybuydetails';
import { EditleadPage } from '../editlead/editlead';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: "page-my-leads",
  templateUrl: "my-leads.html"
}) 
export class MyLeadsPage {
  @ViewChild('slider') slider  ;
   @ViewChild("segments") segments ; 
  page: any;
  userid:any;u_id:any;
  lead: any;rows:any;
  sellleads:any; count1:any;
  buyleads:any; count:any;
  buyerrmsg:any;
  sellerrmsg:any;
  messagecount: Object;
  showcount: any;
  policy: Object;
  bxp_policy: any;
  country_id: string;
  bimp_policy: any;
  sexp_policy: any;
  simp_policy: any;
  user_country: any;
  userdetails: any;
  constructor(public navCtrl: NavController,public navParams: NavParams, private http: HttpClient,
    private storage: Storage, private menuCtrl:MenuController, public alertCtrl: AlertController) {}
    toggleMenu() {
      this.menuCtrl.toggle();
    }
   
    Back(){
      this.navCtrl.push(CategoriesPage);
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

  simport(i){
    console.log("User Country", this.user_country);
    this.http.get(MyApp.url+"gethscodepolicybycountries.php?country_id="+this.user_country+"&hscodes="+this.sellleads[i].hsn_id).subscribe((data)=>{
      this.policy = data;
      console.log("policy", this.policy);
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
    this.http.get(MyApp.url+"gethscodepolicybycountries.php?country_id="+this.user_country+"&hscodes="+this.sellleads[i].hsn_id).subscribe((data)=>{
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
    this.http.get(MyApp.url+"gethscodepolicybycountries.php?country_id="+this.user_country+"&hscodes="+this.buyleads[i].hsn_id).subscribe((data)=>{
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
    this.http.get(MyApp.url+"gethscodepolicybycountries.php?country_id="+this.user_country+"&hscodes="+this.buyleads[i].hsn_id).subscribe((data)=>{
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
selledit(i){
 this.navCtrl.push(EditleadPage,{
'categories_id':this.sellleads[i].categories_id,
'chapter_id': this.sellleads[i].chapter_id,
'id' : this.sellleads[i].id,
'description':this.sellleads[i].description,
'currency':this.sellleads[i].currency,
'destination_port':this.sellleads[i].destination_port,
'expiry_date':this.sellleads[i].expiry_date,
'hsn_id':this.sellleads[i].hsn_id,
'inspection_auth':this.sellleads[i].inspection_auth,
'loading_port':this.sellleads[i].loading_port,
'port_type':this.sellleads[i].port_type,
'price_inusd':this.sellleads[i].price_inusd,
'price_option':this.sellleads[i].price_option,
'quantity':this.sellleads[i].quantity,
'special_instruc':this.sellleads[i].special_instruc,
'uom':this.sellleads[i].uom,
'leadref_id':this.sellleads[i].leadref_id,
'lead_type':this.sellleads[i].lead_type
 })
}
buyedit(i){
this.navCtrl.push(EditleadPage,{
  'categories_id':this.buyleads[i].categories_id,
  'chapter_id': this.buyleads[i].chapter_id,
  'id' : this.buyleads[i].id,
  'description':this.buyleads[i].description,
  'currency':this.buyleads[i].currency,
  'destination_port':this.buyleads[i].destination_port,
  'expiry_date':this.buyleads[i].expiry_date,
  'hsn_id':this.buyleads[i].hsn_id,
  'inspection_auth':this.buyleads[i].inspection_auth,
  'loading_port':this.buyleads[i].loading_port,
  'port_type':this.buyleads[i].port_type,
  'price_inusd':this.buyleads[i].price_inusd,
  'price_option':this.buyleads[i].price_option,
  'quantity':this.buyleads[i].quantity,
  'special_instruc':this.buyleads[i].special_instruc,
  'uom':this.buyleads[i].uom,
  'leadref_id':this.buyleads[i].leadref_id,
  'lead_type':this.buyleads[i].lead_type
})
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyLeadsPage');

    this.storage.get('userdetails').then((val) => {
      this.userdetails = val;
      this.user_country = this.userdetails[0].country_id;
      
      console.log('user-county', this.user_country)
    });

   this.storage.get('user_id').then((user_id) => {
      this.userid = user_id;
      console.log(this.userid,'uni id');

      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.userid).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
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
