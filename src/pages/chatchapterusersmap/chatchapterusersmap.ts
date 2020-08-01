import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { RfqPage } from '../rfq/rfq';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { VideologinPage } from '../videologin/videologin';
import { CreditpointsPage } from '../creditpoints/creditpoints';

declare var google;

@Component({
  selector: 'page-chatchapterusersmap',
  templateUrl: 'chatchapterusersmap.html',
})

export class ChatchapterusersmapPage {
  [x: string]: any;
  //map:GoogleMap;
  map: any;
  markers: any;
  start = 'chicago, il';
  end = 'chicago, il';
  @ViewChild('map') mapElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  @ViewChild("country") country;
  @ViewChild("product") product;
  locations:any;
  mapusers:any=[];
  name:any;
  total: any;
  Mlocations:any=[];
  usernames:any;
  balcredits:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,
    private http:HttpClient, public storage:Storage,public alertCtrl: AlertController) {
   
  }

  mychatpg(i){
    
    if(this.chat==1 && this.credits>= 1){
      //console.log("credits : ",this.credits);
      this.balcredits = this.credits-1;
      const confirm = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Adding this user to Chat option will cost you 1 Credit, would you like to continue? You credit balance after this purchase will be'+this.balcredits,
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
            console.log('Agree clicked');
            var link= MyApp.url+"create_chat.php";
            var chatjsondata=JSON.stringify({
              'other_id':this.locations[i].id,
              'user_id':this.user_id,
            });

            console.log("sending data",chatjsondata);
            this.http.post(link,chatjsondata).subscribe((data)=>{
            this.chatroomdata = data;
            console.log("ChatroomData",data)
            if(data){
              const alert = this.alertCtrl.create({
                  title: 'Success!',
                  subTitle: 'Successfully added Chat',
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.push(ChatPage);
              }
              else{
                const alert = this.alertCtrl.create({
                  title: 'Oops!',
                  subTitle: 'some thing went wrong!',
                  buttons: ['OK']
                });
                alert.present();
              }
            });
    
          }

        }
      
      ]
        
      }); 
      confirm.present();
     
    }else{
      const alert = this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: 'Insufficient Credit balance, please recharge your wallet',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(CreditpointsPage);
    } 

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
                
    rfqpost(){
      this.navCtrl.push( RfqPage );
    }

        



  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatchapterusersmapPage');
    this.loadmap();
  }

loadmap(){
  this.storage.get("userdetails").then((val)=>{
      this.userdata=val;
      console.log("userdata=",this.userdata);
      this.user_id=this.userdata[0].id
      console.log(this.userdata[0].longitude,'Logintude')
      console.log(this.userdata[0].latitude,'Latitude');

      console.log('userid',this.userdata,'userid',this.user_id);
      this.http.get(MyApp.url + "profile.php?user_id=" + this.user_id).subscribe((pdata) => {
        this.profiledata = pdata;
        console.log("userprofile data", this.profiledata);
        this.subscription_id = this.profiledata[0].subscription_id;
        console.log("my subscription pack id is=", this.subscription_id);
      
        this.http.get(MyApp.url + "mysubscription.php?subscription_id=" + this.subscription_id).subscribe((pdata) => {
          this.subscription = pdata;
          this.chat = this.subscription[0].chat;
          console.log("chat option is", this.chat);
          console.log("userprofile data", this.profiledata);
         });
      });

        this.http.get(MyApp.url+"getcredits.php?user_id=" + this.user_id).subscribe((edata) => {
          this.walletcredits = edata;
          this.credits = this.walletcredits[0].credits;
          console.log(this.walletcredits, 'credits');
        });

    
    var marker, i;
    let latLng = new google.maps.LatLng(this.userdata[0].latitude,this.userdata[0].longitude);  
    //let latLng = new google.maps.LatLng(48.8513735, 2.3861292);
    let mapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       
    var infowindow = new google.maps.InfoWindow();

    this.hsn_id=this.navParams.get("hsnid");
    console.log("HSN COde:",this.hsn_id);
    this.http.get(MyApp.url+"chapter_users.php?chapter_id="+this.hsn_id+"&user_id="+this.user_id).subscribe((data)=>{
      this.locations=data;
      console.log("locations details : ",this.locations);

      
      for (i = 0; i < this.locations.length; i++) {  

        if(this.locations[i].user_type=='Buyer'){
          this.imgs = "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        }else{
          if(this.locations[i].user_type=='Seller'){
            this.imgs = "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
          }else{
           
            if(this.locations[i].user_type=='Both'){
              this.imgs = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            }else{
              this.imgs = "https://maps.google.com/mapfiles/ms/icons/purple-dot.png"
            }            

          }
        }
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.locations[i].latitude, this.locations[i].longitude),
          map:this.map,
          icon: {
            url: this.imgs
          },
          title:this.locations[i].name 
        });
        var that = this;
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            that.mychatpg(i);
            infowindow.setContent(that.locations[i].user_type);
            infowindow.open(this.map, marker,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
          }
          
        })(marker, i));
      } 

    });

  });

} 



}
