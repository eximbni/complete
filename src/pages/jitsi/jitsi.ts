import { Component } from '@angular/core';
import {  NavController, NavParams, Platform, } from 'ionic-angular';
//import { Plugins } from '@capacitor/core';

//declare let window: any;

@Component({
  selector: 'page-jitsi',
  templateUrl: 'jitsi.html',
})
export class JitsiPage {
  //JitsiPlugin:any;
  domain:any;
  options:any;
  api:any
  roomname:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
   /*  platform.ready().then(async () => {
      const { Jitsi } = Plugins;
const result = await Jitsi.joinConference({
   roomName: 'kiran', // room identifier for the conference
   url: 'https://meet.jit.si', // endpoint of the Jitsi Meet video bridge,
   startWithAudioMuted: true, // start with audio muted
   startWithVideoMuted: false // start with video muted
});

window.addEventListener('onConferenceJoined', () => {
    // do things here
});
window.addEventListener('onConferenceLeft', () => {
    // do things here
});
    });
   */
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad JitsiPage');
    
  }

}
