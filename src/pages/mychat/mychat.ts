import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { ChatmsgPage } from '../chatmsg/chatmsg';

@Component({
  selector: 'page-mychat',
  templateUrl: 'mychat.html',
})
export class MychatPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page:any;
  anotheruser_id:any;
  userdetails:any;
  user_id:any;
  singleroomlist:any;
  chatroom:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams, private http:HttpClient,
    private storage:Storage) {
    this.anotheruser_id = navParams.get('id');}
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
    this.navCtrl.push(WebinarPage);
    }
    quotes(){
    this.navCtrl.push(RfqPage);
    }
    
    individualchatpg(i){
      this.navCtrl.push(ChatmsgPage,{'chatroom':this.singleroomlist[i].chatroom,
    'chatname':this.singleroomlist[i].business_name});
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
      console.log("userdetails",val);
      this.user_id = this.userdetails[0].id;
            
    this.http.get(MyApp.url+"singlechatrooms.php?user_id="+this.user_id).subscribe((data)=>{
this.singleroomlist = data;
console.log("single chat list",this.singleroomlist);
    });
  });
        console.log('ionViewDidLoad MychatPage');
  }

}

