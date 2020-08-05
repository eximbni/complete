import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController, MenuController } from 'ionic-angular';
import { LeadDetailsPage } from '../lead-details/lead-details';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { CategoriesPage } from '../categories/categories';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { BuyleaddetailsPage } from '../buyleaddetails/buyleaddetails';
import { LeadsPage } from '../leads/leads';
import { MyApp } from '../../app/app.component';
import { VideologinPage } from '../videologin/videologin';

/**
 * Generated class for the HsnleadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hsnleads',
  templateUrl: 'hsnleads.html',
})
export class HsnleadsPage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  sellleads: any;
  userdetails: any;
  show = false;
  chapter_id: any;
  buyleads: any; leaddetails: any; username: any; lead_user: any; details: any;
  chaptername: any; expiry_date: any; description: any; hsncode: any; quantity: any; uom: any;
  product: any; name: any; email: any; sellid: any; buyid: any; country_id: any; userdata: any;
  buy_id: any; sell_id: any; sellerleads: any; b_id: any; logindata: any; user_id: any; walletcredits: any; credits: any;
  sellleadchapter_id: any;
  buyleadchapter_id: any;
  sellleadspermission: any;
  buyleadspermission: any;
  hsn_id: any;
  buyerrmsg:any;
  sellerrmsg:any;
  skipbselllead:any;
  skipbuylead:any;
  buycount: any;
  sellcount: any;
  hscode: any;
  messagecount: Object;
  showcount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public alertCtrl: AlertController,

    private storage: Storage, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, "sideMenu");
    
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  sellleaddetails(i) {
    const confirm = this.alertCtrl.create({
      title: 'Confirm to Proceed',
      message: "Buying this Leads will consume one credt from your wallet. Are you sure to buy this lead and you credits are " + this.credits,
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.sell_id = this.sellleads[i].id;

            console.log('selllead_id=',this.sell_id);
            console.log(this.sellleads[i].chapter_id, 'is');
            var link = MyApp.url+"checkchapter.php";
            var jdata = JSON.stringify({
              'user_id': this.user_id,
              'chapter_id': this.sellleads[i].chapter_id,
              'lead_id':this.sell_id,
            });
            console.log(jdata);
            this.http.post(link, jdata).subscribe((data) => {
              this.sellleadspermission = data;
              console.log('sell lead check chapter', data);
              if (data) {
                console.log('Agree clicked');

                console.log('sell lead id=', this.sell_id);
                this.navCtrl.push(LeadDetailsPage, { 'sid': this.sell_id, 'userdetails': this.userdetails });
              }
              else {
                alert('you are  not subscribed! ');
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
      title: 'Confirm to Proceed',
      message: "Buying this Leads will consume one credt from your wallet. Are you sure to buy this lead and you credits are " + this.credits,
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.buy_id = this.buyleads[i].id;
            console.log('buylead_id=',this.buy_id);
            var link = MyApp.url+"checkchapter.php";
            var jdata = JSON.stringify({
              'user_id': this.user_id,
              'chapter_id': this.buyleads[i].chapter_id,
              'lead_id':this.buy_id,
            });
            console.log(jdata);
            this.http.post(link, jdata).subscribe((data) => {
              this.buyleadspermission = data;
              console.log('sell lead check chapter', data);
              if (data) {

                console.log('Agree clicked');

                console.log('buy lead id=', this.buy_id);
                this.navCtrl.push(BuyleaddetailsPage, { 'bid': this.buy_id, 'userdetails': this.userdetails });
              }
              else {
                alert('you are  not subscribed! ');
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
  
/* 

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
   */
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


/* 
  remindSellLeads(i){
    const confirm = this.alertCtrl.create({
      title: 'Remind This Lead later?',
      message: 'Leads will be saved for future View and removed from current list',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            var link = MyApp.url+"skipleads.php";
            var jdata = JSON.stringify({
              'user_id': this.user_id,
              'lead_id': this.sellleads[i].id,
              
            });
            console.log('selljson skip=',jdata);
            this.http.post(link, jdata).subscribe((sdata) => {
              this.skipbselllead = sdata;
              this.navCtrl.push(HsnleadsPage)
          });
          }
        }
      ]
    });
    confirm.present();
  } */
  
skipbuyleads(i){
    const confirm = this.alertCtrl.create({
      title: 'Skip this Lead?',
      message: 'Skipped leads will not visible any more do you want to skip?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            var link = MyApp.url+"skipleads.php";
    var jdata = JSON.stringify({
      'user_id': this.user_id,
      'lead_id': this.buyleads[i].id,
    });
    console.log('buydadata skip=',jdata);
    this.http.post(link, jdata).subscribe((sdata) => {
      this.skipbuylead = sdata;
      this.navCtrl.push(HsnleadsPage)
  });
          }
        }
      ]
    });
    confirm.present();
    
}
skipsellleads(i){
  const confirm = this.alertCtrl.create({
    title: 'Skip This Lead?',
    message: 'Skipped leads will not visible any more do you want to skip?',
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          var link = MyApp.url+"skipleads.php";
          var jdata = JSON.stringify({
            'user_id': this.user_id,
            'lead_id': this.sellleads[i].id,
            
          });
          console.log('selljson skip=',jdata);
          this.http.post(link, jdata).subscribe((sdata) => {
            this.skipbselllead = sdata;
            this.navCtrl.push(HsnleadsPage)
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


  simport(i){
    const alert = this.alertCtrl.create({
      title: 'Import Policy',
      subTitle: this.sellleads[i].imp_policy,
      buttons: ['OK']
    });
    alert.present();
  }
  sexport(i){
    const alert = this.alertCtrl.create({
      title: 'Export Policy',
      subTitle: this.sellleads[i].exp_policy,
      buttons: ['OK']
    });
    alert.present();
  }

  bimport(i){
    const alert = this.alertCtrl.create({
      title: 'Import Policy',
      subTitle: this.buyleads[i].imp_policy,
      buttons: ['OK']
    });
    alert.present();
  }
  bexport(i){
    const alert = this.alertCtrl.create({
      title: 'Export Policy',
      subTitle: this.buyleads[i].exp_policy,
      buttons: ['OK']
    });
    alert.present();
  }


  mybfav(i){
    this.hscode = this.buyleads[i].hsn_id;
    this.http.get(MyApp.url+"addmyfavhscode.php?user_id="+this.user_id+"&hscode="+this.hscode).subscribe((data)=>{
      console.log("favcode:", data);
      if(data==1){
        alert("Sucessfully added HSCode to your favorites");
        this.http.get(MyApp.url+"gethsnbuyleads.php?hsn_id="+this.hsn_id+"&user_id="+this.user_id+"&country_id="+this.country_id).subscribe((data) => {
       
          if(data==0){
            this.buyerrmsg ="There are no leads"
         } else{
           this.buyleads = data;
           this.buycount = this.buyleads.length
           console.log(data, 'buyleads');
         }
         });
         this.http.get(MyApp.url+"gethsnsellleads.php?hsn_id="+this.hsn_id+"&user_id="+this.user_id+"&country_id="+this.country_id).subscribe((sdata) => {
           if(sdata==0){
             this.sellerrmsg ="There are no leads"
          } else{
           this.sellleads = sdata;
           this.sellcount = this.sellleads.length
           console.log(sdata, 'sell leads');
          }
          
         });
      }
      else{
        alert("something went wrong Please try later");
      }
    })
  }
  mysfav(i){
    this.hscode = this.sellleads[i].hsn_id;
    this.http.get(MyApp.url+"addmyfavhscode.php?user_id="+this.user_id+"&hscode="+this.hscode).subscribe((data)=>{
      if(data==1){
        alert("Sucessfully added HSCode to your favorites");
        this.http.get(MyApp.url+"gethsnbuyleads.php?hsn_id="+this.hsn_id+"&user_id="+this.user_id+"&country_id="+this.country_id).subscribe((data) => {
       
          if(data==0){
            this.buyerrmsg ="There are no leads"
         } else{
           this.buyleads = data;
           this.buycount = this.buyleads.length
           console.log(data, 'buyleads');
         }
         });
         this.http.get(MyApp.url+"gethsnsellleads.php?hsn_id="+this.hsn_id+"&user_id="+this.user_id+"&country_id="+this.country_id).subscribe((sdata) => {
           if(sdata==0){
             this.sellerrmsg ="There are no leads"
          } else{
           this.sellleads = sdata;
           this.sellcount = this.sellleads.length
           console.log(sdata, 'sell leads');
          }
          
         });
      }
      else{
        alert("something went wrong Please try later");
      }
    })
  }
  ionViewDidLoad() {
   
    this.hsn_id = this.navParams.get("hsncode");
    this.storage.get('userdetails').then((val) => {
      this.userdetails = val;
      this.country_id=this.userdetails[0].country_id;
      this.user_id=this.userdetails[0].id;  
      console.log("hsnid", this.hsn_id);

      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })

      this.http.get(MyApp.url+"gethsnbuyleads.php?hsn_id="+this.hsn_id+"&user_id="+this.user_id+"&country_id="+this.country_id).subscribe((data) => {
       
       if(data==0){
         this.buyerrmsg ="There are no leads"
      } else{
        this.buyleads = data;
        this.buycount = this.buyleads.length
        console.log(data, 'buyleads');
      }
      });
      this.http.get(MyApp.url+"gethsnsellleads.php?hsn_id="+this.hsn_id+"&user_id="+this.user_id+"&country_id="+this.country_id).subscribe((sdata) => {
        if(sdata==0){
          this.sellerrmsg ="There are no leads"
       } else{
        this.sellleads = sdata;
        this.sellcount = this.sellleads.length
        console.log(sdata, 'sell leads');
       }
       
      });
      this.http.get(MyApp.url+"getcredits.php?user_id=" + this.user_id).subscribe((edata) => {
        this.walletcredits = edata;
        this.credits = this.walletcredits[0].credits;
        console.log(this.walletcredits, 'credits');

      });
    });
    console.log('ionViewDidLoad HSNLeadsPage');
  }

}
