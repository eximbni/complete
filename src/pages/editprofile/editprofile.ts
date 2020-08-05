import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../settings/settings';
import { MyApp } from '../../app/app.component';
import { RfqPage } from '../rfq/rfq';
import { ChatPage } from '../chat/chat';
import { LeadsPage } from '../leads/leads';
import { CategoriesPage } from '../categories/categories';
import { VideologinPage } from '../videologin/videologin';



@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  DPhoto:any;
  DriverPhoto:any;
  @ViewChild("firstname")firstname;
  @ViewChild("lastname")lastname;
  @ViewChild("company")company;
  updatedata:any;
  business:any;
  userdetails:any;
  mobile:any;
  fulname:any;
  user_id:any;
  userdata:any;
  username:any;
  messagecount: Object;
  showcount: any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,
    private camera :Camera, private transfer: FileTransfer, private http : HttpClient,
    private storage:Storage, public alertCtrl:AlertController) {
  }
  toggleMenu() {
    this.menuCtrl.toggle();
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

/*file uploadfunction */

fileUpload(){
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
encodingType: this.camera.EncodingType.JPEG,
sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
mediaType: this.camera.MediaType.PICTURE,
cameraDirection: this.camera.Direction.FRONT
  }
 this.camera.getPicture(options).then((imageData) => {
// imageData is either a base64 encoded string or a file URI
// If it's base64:
this.DPhoto = 'data:image/jpeg;base64,' + imageData;
const fileTransfer: FileTransferObject = this.transfer.create();
var random = Math.floor(Math.random()*100);
this.DriverPhoto= 'profile'+random+'.jpg';
let options3: FileUploadOptions = {
  fileKey: 'file',
  fileName: this.DriverPhoto,
  headers: {}

}

fileTransfer.upload(  this.DPhoto, MyApp.url+'uploads.php', options3)
.then((data) => {
  console.log(data);
// success
console.log("success");
}, (err) => {
// error
console.log("error"+JSON.stringify(err));
});
});
}

/*file upload end */
  update(){
    console.log(this.firstname.value);
    console.log(this.lastname.value);
    console.log(this.company.value);
    console.log(this.mobile);
    this.fulname = this.firstname.value+this.lastname.value;   
     console.log('fulanme',this.fulname)
    var link=MyApp.url+"updateuserprofile.php";
    var jdata=JSON.stringify({
      'mobile':this.mobile,
      'fullname':this.fulname,
      'business_name':this.company.value,
      'profile':this.DriverPhoto,
    })
    if(this.firstname.value!='' && this.lastname.value!='' && this.company.value!=''){

this.http.post(link,jdata).subscribe((data)=>{
  this.updatedata = data;
console.log('data',data);

if(this.updatedata=="Profile Updated Successfully"){
  const alert = this.alertCtrl.create({
    title: 'Information',
    subTitle: 'Your profile has been updated',
    buttons: ['OK']
  });
  alert.present();
this.navCtrl.push(SettingsPage);
}
else{
const alert = this.alertCtrl.create({
    title: 'Oops!',
    subTitle: 'There seems to be a technical problem. Please contact our admin team. Sorry for the inconvenience',
    buttons: ['OK']
  });
  alert.present();
}

});
    }
    else{
      const alert = this.alertCtrl.create({
        title: 'Confirmation',
        subTitle: 'Please fill all Fields',
        buttons: ['OK']
      });
      alert.present();
      
    }
  
  }
  ionViewDidLoad() {
    
    this.storage.get('userdetails').then((val)=>{
      this.userdetails = val;
      this.business = this.userdetails[0].business_name;
      this.mobile = this.userdetails[0].mobile;
      this.user_id = this.userdetails[0].id;
      console.log(val);
      console.log(this.mobile);

      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
      
     
    })
    console.log('ionViewDidLoad EditprofilePage');
  }

}
