import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, Content, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChapterchatPage } from '../chapterchat/chapterchat';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { CallNumber } from '@ionic-native/call-number';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ChatPage } from '../chat/chat';
import {Observable} from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";
import { GroupchatusersPage } from '../groupchatusers/groupchatusers';

@Component({
  selector: 'page-groupchatmsg',
  templateUrl: 'groupchatmsg.html',
})
export class GroupchatmsgPage {
  @ViewChild('scrollElement') content: Content;
  userdetails:any;
  username: any = '';
  message: string="";
  chatroom:any;
 user_id:any;
 datenow:any;
  chatuser_id: any;
  sendername: any;
  nativepath: any;
  msgimg: any;
  callnumber: any;
  caller_id: any;
  furl: any;
  filename: any;
  chatdata: any;
  attachments:any=false;
  Image: any;
  ChatImage: string;
  file_path: any;
  Video: string;
  loaders: any;
  @ViewChild("inputmsg") inputmsg;
  selectedVideo: string; //= "https://res.cloudinary.com/demo/video/upload/w_640,h_640,c_pad/dog.mp4";
  uploadedVideo: string;

  isUploading: boolean = false;
  uploadPercent: number = 0;
  videoFileUpload: FileTransferObject;
  file_type: any;
  business_name: any;
  chatuserdata: any;
  interval: any;
  items: Observable<any[]>;
  observableVar: Subscription;
  imgUrl: string;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, 
    public navParams: NavParams,
     private storage:Storage, private http:HttpClient, 
      public loadingCtrl: LoadingController, private callNumber: CallNumber,
      private camera:Camera,private transfer: FileTransfer, public alertCtrl:AlertController, private file:File) {
    //call Chat
     //calling chat
     this.imgUrl = MyApp.url;
   this.observableVar = Observable.interval(1000).subscribe(()=>{
    this.callChat();
});
    //Other Code
    console.log("Chat Room name", this.chatroom = this.navParams.get('chatroom'));
    this.sendername = this.navParams.get("sendername");
    this. chatuser_id = this.navParams.get("chatuser_id");
    this.callnumber = this.navParams.get("callnumber");
    this.caller_id = this.navParams.get("caller_id");
    this.business_name = this.navParams.get("business_name");
    console.log("caller -id:", this.caller_id)
    this.datenow = Date.now();
    this.username = this.navParams.get("username");
    
  
  }

  async callChat(){
    
      this.http.get(MyApp.url+"getchatmessages.php?chatroom="+this.chatroom).subscribe((chatdata)=>{
        this.chatdata=chatdata;
        console.log(this.chatdata);
      });
      this.updateScroll();
    
  }

  async doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 3000);
  }


  updateScroll() {
    var objDiv = document.getElementById("condiv");
objDiv.scrollTop = objDiv.scrollHeight;
  }

  BackPage(){
    this.navCtrl.push(ChatPage);
  }
  
callUser(){
  let loader = this.loadingCtrl.create({
    content: 'checking availability'
  });
  loader.present();
  this.http.get(MyApp.url+"getusertime.php?user_id="+this.caller_id).subscribe((calldata)=>{
    console.log(calldata);
    loader.dismiss();
    if(calldata==1){
      this.callNumber.callNumber(this.callnumber,true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
    }
    else{
      alert("This user not available at this time for the call option.");
    }
  })
  
}
attachFile(){
  this.attachments=true;
}
closeDiv(){
  this.attachments=false;
}
showLoader() {
  this.loaders= this.loadingCtrl.create({
    content: 'Please wait...'
  });
  this.loaders.present();
}
dismissLoader() {
  this.loaders.dismiss();
}
presentAlert(title, message) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}

cancelSelection() {
  this.selectedVideo = null;
  this.uploadedVideo = null;
}
selectVideo() {
  const options: CameraOptions = {
    mediaType: this.camera.MediaType.VIDEO,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_MIME_TYPE = "video/mp4";
  this.camera.getPicture(options)
    .then( async (videoUrl) => {
      if (videoUrl) {
        this.showLoader();
        this.uploadedVideo = null;
        
        var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
        var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

        dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
        
        try {
          var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
          var retrievedFile = await this.file.getFile(dirUrl, filename, {});

        } catch(err) {
          this.dismissLoader();
          return this.presentAlert("Error","Something went wrong.");
        }
        
        retrievedFile.file( data => {
            this.dismissLoader();
            if (data.size > MAX_FILE_SIZE) return this.presentAlert("Error", "You cannot upload more than 5mb.");
            if (data.type !== ALLOWED_MIME_TYPE) return this.presentAlert("Error", "Incorrect file type.");

            this.selectedVideo = retrievedFile.nativeURL;
        });
      }
    },
    (err) => {
      console.log(err);
    });
}


uploadImage(){
  this.file_type="image";
  const options: CameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    this.Image = 'data:image/jpeg;base64,' + imageData;
   
  });
  if (this.Image){
    this.sendMessage();
  }
}
uploadFile(){
  this.file_type="file";

}
uploadVideo(){
  this.file_type="video"
  this.selectVideo();
   this.file_path = this.selectedVideo.substr(this.selectedVideo.lastIndexOf('/') + 1);
      
    var options: FileUploadOptions = {
      fileName: this.file_path,
      fileKey: "video",
      mimeType: "video/mp4"
    }

    this.videoFileUpload = this.transfer.create();

    this.isUploading = true;

    this.videoFileUpload.upload(this.selectedVideo, MyApp.url+"uploads.php", options)
      .then((data)=>{
        this.isUploading = false;
        this.uploadPercent = 0;
        return JSON.parse(data.response);
      })
      .then((data) => {        
        this.uploadedVideo = data.url;
        this.sendMessage();
        this.presentAlert("Success", "Video upload was successful.");
      })
      .catch((err)=>{
        this.isUploading = false;
        this.uploadPercent = 0;
        this.presentAlert("Error", "Error uploading video.");
      });

    this.videoFileUpload.onProgress((data) => {
      this.uploadPercent = Math.round((data.loaded/data.total) * 100);
    });

}
uploadAudio(){
  this.file_type="audio";

}
  
    
 sendMessage() {
   var link = MyApp.url+"chatmessages.php";
   var Mydata = JSON.stringify({
    'sender_id':this.user_id,
    'chatroom':this.chatroom,
    'message' : this.inputmsg.value,
    'other_id':this.chatuser_id,
    'file_path':this.Image,
    'file_type':this.file_type
   });
   console.log("chat data=",Mydata);
    this.http.post(link,Mydata).subscribe((data)=>{
     this.message = "";
      console.log("chatmessages :",data);
   //   .inputmsg.value = "";
   this.doRefresh;

    })
  // console.log(this.username)
  
}
  chatuserdetails(){
   
    this.navCtrl.push(ChapterchatPage,{'chatuser_id':this.chatuser_id,});
}
gropuUsers(){
  this.navCtrl.push(GroupchatusersPage,{
    'chatroom':this.chatroom
  })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatmsgPage');
    this.storage.get("userdetails").then((val)=>{
      this.userdetails=val;
      this.user_id = this.userdetails[0].id;
    })

  }
  ionViewDidLeave(){
    this.observableVar.unsubscribe();
 }

}
