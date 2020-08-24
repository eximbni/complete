import { WebinarPage } from './../webinar/webinar';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Plugins } from '@capacitor/core';
import 'capacitor-jitsi-meet';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-videologin',
  templateUrl: 'videologin.html',
})
export class VideologinPage {
  @ViewChild("name") name;
  @ViewChild("meeting_id") meeting_id;
  @ViewChild("password") password;
  userdetails: any;
  user_id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient, private storage: Storage) {
    this.test();
  }

  login(){
    //alert("function called");
    var link =MyApp.url+ "videocheck.php";
    var mydata = JSON.stringify({
      'meeting_id':this.meeting_id.value,
      'password':this.password.value
    });
  this.http.post(link,mydata).subscribe((data)=>{
      console.log(data);
      if(data==1){
        this.test();
      }
      else{
        if(data==2){
          alert("Meeting ID or Password Not Matching. Please Contact Host");
        }
        else{
          alert("Host Yet to start Meeting. Please Login after some time");
        }
      }
    })
  }
 async test(){
   //alert("Video Conference is comming soon to IOS Version.");
  //alert("I am in");
   var roomname= this.meeting_id.value;
   if(! roomname){
     alert("Please Enter Your Meeting ID and Password");
   }
   console.log(roomname,'Room Name');
   var username = this.name.value;
   console.log(username, 'User Name');
  const { Jitsi } = Plugins;
  const options = {
    interfaceConfigOverwrite: {  
      DEFAULT_REMOTE_DISPLAY_NAME: 'MiiVision User',
    },
    userInfo: {
      email: 'user@eximbni.com',
      displayName: '<?php echo $nick_name;?>'
  },
  }
   await Jitsi.joinConference({
     roomName: roomname, // room identifier for the conference
     url: 'https://meet.jit.si', // endpoint of the Jitsi Meet video bridge
     startWithAudioMuted: false, // start with audio muted
     startWithVideoMuted: false,
     name:username // start with video muted
     }, options);
  
  window.addEventListener('onConferenceJoined', () => {
      // do things here
  });
  window.addEventListener('onConferenceLeft', () => {
      this.navCtrl.pop();
  }); 
  }
  gotoApp(){
    this.navCtrl.pop();
  }
  schedule(){
    this.navCtrl.push(WebinarPage);
  }
  ionViewDidLoad() {
    this.storage.get("userdetails").then((val)=>{
      this.userdetails =val;
      this.user_id = this.userdetails[0].id;
      console.log("Loged In User:" , this.user_id);
      console.log('userdetails',val);
      })
    console.log('ionViewDidLoad VideologinPage');
  }

}
