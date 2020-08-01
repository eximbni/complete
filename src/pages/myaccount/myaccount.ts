import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, MenuController } from 'ionic-angular';
import { MyLeadsPage } from '../my-leads/my-leads';
import { NotificationPage } from '../notification/notification';
import { RfqPostBannerPage } from '../rfq-post-banner/rfq-post-banner';
import { SubscriptionPage } from '../subscription/subscription';
//import { ForgrtPwdPage } from '../forgrt-pwd/forgrt-pwd';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { RfqPage } from '../rfq/rfq';
import { MypackagedetailsPage } from '../mypackagedetails/mypackagedetails';
import { CreditpointsPage } from '../creditpoints/creditpoints';
import { SettingsPage } from '../settings/settings';
import { EditprofilePage } from '../editprofile/editprofile';
import { MyApp } from '../../app/app.component';
import { SigninPage } from '../signin/signin';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer'; 
import { MyfavPage } from '../myfav/myfav';
import { VideologinPage } from '../videologin/videologin';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ChangepassPage } from '../changepass/changepass';



@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  arr:any;
  DPhoto: string;
  userdetails:any;
  username:any;
  userdata:any;
  business:any;
  user_id:any;
  email:any;
  packs:any=false;
  logoutdata:any;
  userimage: string;
  chapters: Object;
  hscodes: Object;
  refcode: any;
  sponcercount: Object;
  scount: any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,public platform:Platform,
    private storage: Storage, private http:HttpClient, private alertCtrl:AlertController, private camera:Camera, private SocialSharing:SocialSharing, private transfer: FileTransfer, ) {}
    settings(){
      this.navCtrl.push(SettingsPage);
    }
    
     
  cameraon(){
    /* const options: CameraOptions = {
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    } */
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
   this.camera.getPicture(options).then((imageData) => {
  // imageData is either a base64 encoded string or a file URI
  // If it's base64:
  this.DPhoto = 'data:image/jpeg;base64,' + imageData;
  const fileTransfer: FileTransferObject = this.transfer.create();
  var random = Math.floor(Math.random()*100);
  this.DPhoto= 'user'+random+'.jpg';
  let options3: FileUploadOptions = {
    fileKey: 'file',
    fileName: this.DPhoto,
    headers: {}
  
  }
  
  fileTransfer.upload(  this.DPhoto, MyApp.url+'uploads.php', options3)
  .then((data) => {
    console.log(data);
  // success
  alert("success");
  }, (err) => {
  // error
  alert("error"+JSON.stringify(err));
  });
  this.http.get(MyApp.url+"userimage.php?user_id="+this.user_id+"&user_image="+this.DPhoto).subscribe((data)=>{
    if(data==1){
      alert("Image Modified Successfully");
    }
  })
  
  });
  }

  /*start  edit profile*/
  /*exit(){
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to exit?',
      buttons: [{
        text: "exit?",
        handler: () => { this.exitApp() }
      }, {
        text
        : "Cancel",
        role: 'cancel'
      }]
    })
    alert.present();
}
exitApp(){
  this.platform.exitApp();
}*/

  edit(){
 
  this.navCtrl.push(EditprofilePage);
  }
  mypackage(){
    this.navCtrl.push(MypackagedetailsPage);
  }
  credit(){
    this.navCtrl.push(CreditpointsPage);
  }  
  mylead(){
    this.navCtrl.push(MyLeadsPage);
  }
  notification(){
    this.navCtrl.push( NotificationPage );
  }
  rfqbanner(){
    this.navCtrl.push( RfqPostBannerPage );
  }
  scbscrib(){
    this.navCtrl.push( SubscriptionPage );
  }
  
  fgtpwd(){
    this.navCtrl.push(ChangepassPage);
  }
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
  signout(){
  
    var link=MyApp.url+"logout.php";
    var mydata=JSON.stringify({
      'user_id':this.user_id,
    })
    this.http.post(link,mydata).subscribe((data)=>{
      this.logoutdata=data;
      console.log(data);
      if(data==1){
        this.storage.clear();
        this.navCtrl.push(SigninPage);
      }
      else{
        const alert=this.alertCtrl.create({
          subTitle:'Are you sure to logout',
          buttons:['ok'],
        });
        alert.present();
      }
    });
    console.log("userid",this.user_id);
    console.log('userdetails',this.userdetails);
   // this.navCtrl.push(CategoriesPage);
  }
  showpack(){
    this.packs=true;
    this.http.get(MyApp.url+"getuserchapters.php?user_id="+this.user_id).subscribe((data)=>{
      this.chapters = data;
      console.log('userdata',this.chapters);
     
    });
    this.http.get(MyApp.url+"getuserhscodes.php?user_id="+this.user_id).subscribe((hdata)=>{
      this.hscodes = hdata;
      console.log('userdata',this.chapters);
     
    });
    
  }
  myfav(){
    this.navCtrl.push(MyfavPage);
  }

  Share(){
    //console.log("user refferal code : ", this.userdata[0].ref_code);
    var msg = "https://eximbni.com/referal_downloads.php?referal_code="+this.userdata[0].ref_code;
    this.SocialSharing.share(msg, null, null, null);
  }
  Back(){
    this.navCtrl.push(CategoriesPage);
  }
  ionViewDidLoad(){
    this.storage.get("userdetails").then((val)=>{
      this.userdata= val;
      this.user_id= this.userdata[0].id;
      this.refcode = this.userdata[0].ref_code;
      this.http.get(MyApp.url+"getuserchapters.php?user_id="+this.user_id).subscribe((data)=>{
        this.chapters = data;
        console.log('userdata',this.chapters);
       
      });
      this.http.get(MyApp.url+"getsponcercount.php?ref_code="+this.refcode).subscribe((sdata)=>{
        this.sponcercount = sdata;
        this.scount = this.sponcercount[0].sponcer_count;
        console.log('sponcercount',this.scount);
       
      });
          
    })
  }
}
