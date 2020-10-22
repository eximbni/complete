import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { InvitationPage } from '../invitation/invitation';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { VideologinPage } from '../videologin/videologin';


@Component({
  selector: 'page-webinar',
  templateUrl: 'webinar.html',
})
export class WebinarPage {
  @ViewChild("title")title;
  @ViewChild("description")description;
  @ViewChild("webdate")webdate;
  @ViewChild("webtime")webtime;
  @ViewChild("duration")duration;
  @ViewChild("cdate") cdate;
  isReadyToSave: boolean;
  item: any;
  createdweb:any;
  time:any;
  starttime:any;
  userdetails:any;
  user_id:any;
  weblink:any;
  schedules:any;
  calendars = [];
  link: any;
  datetoday: Date;
  startWithAudioMuted:any=true
  response: Object;
  share: any;
  meeting: any;
  messagecount: Object;
  showcount: any;
  
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,
    private http:HttpClient, private storage:Storage, public alertCtrl:AlertController,private socialSharing: SocialSharing) {
    
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  startwebinar(i){
    
    console.log("today date:",this.cdate.value);
    if(this.cdate.value != this.schedules[i].webinar_date){
      alert("This meeting is not scheduled For Now");

    }
    else{

      this.http.get(MyApp.url+"startendwebinars.php?user_id="+this.user_id+"&webinar_id="+this.schedules[i].id+"&status=1").subscribe((data)=>{
        this.response = data;
        console.log('start schedules',this.response);
        if(data==1){
          const alert = this.alertCtrl.create({
            title: 'success',
            subTitle: 'Meeting Started Successfuly',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(WebinarPage);
        }
        else{
          const alert = this.alertCtrl.create({
            title: 'Oops',
            subTitle: 'Something went wrong plaese try after some time',
            buttons: ['OK']
          });
          alert.present();
        }


      });

    }
  }

  endwebinar(i){
    console.log("today date:",this.cdate.value);
    if(this.cdate.value != this.schedules[i].webinar_date){
      alert("This meeting is not scheduled For Now");

    }
    else{

      this.http.get(MyApp.url+"startendwebinars.php?user_id="+this.user_id+"&webinar_id="+this.schedules[i].id+"&status=0").subscribe((data)=>{
        this.response = data;
        console.log('end schedules',this.response);
        if(data==1){
          const alert = this.alertCtrl.create({
            title: 'success',
            subTitle: 'Meeting Ended Successfuly',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(WebinarPage);
        }
        else{
          const alert = this.alertCtrl.create({
            title: 'Oops',
            subTitle: 'Something went wrong plaese try after some time',
            buttons: ['OK']
          });
          alert.present();
        }


      });

    }
  }


sharewebinar(i){
  var textbody = "<b> Webinar Title :        "+this.schedules[i].title+" </b> <br> <br> Webinar Date :        "+this.schedules[i].webinar_date+"  <br> Webinar Time :        "+this.schedules[i].webinar_time+" <br> <br> Meeting Id :        "+this.schedules[i].meeting_id+" <br> Password :        "+this.schedules[i].meeting_pass+" <br> <br> Description :        "+this.schedules[i].description+" <br> <br> Webinar Link : "+this.schedules[i].webinar_link+"<br> <br> <br> ~ MiiVision EXMIBNI. ";
  console.log("Mail Body :", textbody);
  this.socialSharing.shareViaEmail(textbody, 'Invitation to MiiVision Webinar', []).then(() => {
    // Success!
  }).catch(() => {
    // Error!
  });

}


  create()
  {
/*  console.log(this.title.value);
    console.log(this.description.value);
    console.log(this.webdate.value); 
     console.log("start time : ",this.starttime);
    console.log("time value :",this.webtime.value);
    console.log(" duration: ",this.duration.value); */
    this.time = this.webtime.value;
    if((this.time.minute) < 10){
      this.starttime = this.time.hour+":0"+this.time.minute;
    }else{
      this.starttime = this.time.hour+":"+this.time.minute;
    }


    if(this.title.value!=''&& this.description.value!=''&& this.webdate.value!=''&& this.webtime.value!=''&& this.duration.value!=''){
      
      var link=MyApp.url+"createwebinar.php";
      var cjsondata=JSON.stringify({
        'user_id':this.user_id,
        'title':this.title.value,
        'description':this.description.value,
        'webdate':this.webdate.value,
        'webtime':this.starttime,
        'duration':this.duration.value,
      });
      console.log("json data",cjsondata) ;

      this.http.post(link,cjsondata).subscribe((data)=>{
      this.createdweb = data;
      console.log('return data',data);
      if(data==1){
        const alert = this.alertCtrl.create({
          title: 'success',
          subTitle: 'Meeting Shedular Posted Successfuly',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(WebinarPage);
      }
      else{
        const alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'Something went wrong plaese try after some time',
          buttons: ['OK']
        });
        alert.present();
      }
    });

  }else{

    const alert = this.alertCtrl.create({
      title: 'Oops',
      subTitle: 'please fill all the fields to proceed',
      buttons: ['OK']
    });
    alert.present();
  }

}
delete(i){
  this.http.get(MyApp.url+"deletewebinar.php?webinar_id="+this.schedules[i].id).subscribe(data=>{
    if(data==1){
      alert("Webinar Deleted Successfully");
      this.navCtrl.push(WebinarPage);
    }
  })
}

  invite(){
    this.navCtrl.push(InvitationPage);
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
Back(){
  this.navCtrl.push(CategoriesPage)
}
  ionViewDidLoad() {
    this.datetoday= new Date();
    this.storage.get("userdetails").then((val)=>{
      this.userdetails = val;
      this.user_id = this.userdetails[0].id;
      console.log("userdetails",this.userdetails);
      this.http.get(MyApp.url+"getwebinars.php?user_id="+this.user_id).subscribe((data)=>{
        this.schedules = data;
        console.log('schedules',this.schedules);
      });
      
      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })


    })
    console.log('ionViewDidLoad WebinarPage');
  }

}
