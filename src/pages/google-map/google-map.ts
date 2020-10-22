import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';

declare var google;
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})

export class GoogleMapPage {
  userdetails:any;
  chapters:any;
    //map:GoogleMap;
    map: any;
    map1: any;
    map2: any;
    markers: any;
    start = 'chicago, il';
    end = 'chicago, il';
    @ViewChild('map') mapElement: ElementRef;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    @ViewChild("country") country;
    @ViewChild("product") product;
    
selectedItems = {};
dropdownSettings = {};

selectedusertype = [];
selectedusertypelist:{};
dropdownSettings2 ={};
user_id:any;
country_id:any;
chapterid:any;
buyerslist:any;
  onlinebuyerslist: any;
  leadpostbuyerslist: any;
  pet:any
  imgs: string;
  locations: any;
  otherinput: boolean;
  usertype: any;
  user_type: any;
  messagecount: Object;
  showcount: any;
  
  constructor(public navCtrl: NavController,public navParams: NavParams, private http:HttpClient, private storage :Storage,
    public menuCtrl:MenuController) {
      this.pet="kittens";
    }
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
  this.navCtrl.push(WebinarPage);
}
quotes(){
  this.navCtrl.push(RfqPage);
}

ngOnInit() {
  this.selectedusertypelist = [
    { id: 'Seller', name: 'Seller' },
    { id: 'Buyer', name: 'Buyer' },
    { id: 'Both', name: 'Both' },
    { id: 'Other', name: 'Other' }
  ];

  this.dropdownSettings2= {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    //selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

 
}



getusertype(utype){
  this.usertype = utype;
  console.log('usertype=',utype);
  if(utype == 'Other'){
    this.otherinput =true;
  }else{
    this.otherinput =false;
  }
}

onItemSelect(item: any) {

console.log(item,'selecteditem');
this.user_type =item;

   var marker, i;
  let latLng = new google.maps.LatLng(this.userdetails[0].latitude,this.userdetails[0].longitude);  
  //let latLng = new google.maps.LatLng(48.8513735, 2.3861292);
  let mapOptions = {
    center: latLng,
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
  }

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

     
  var infowindow = new google.maps.InfoWindow();
  this.http.get(MyApp.url+"mapusers.php").subscribe((data)=>{
    this.locations=data;
   console.log("mapusers : ",this.locations);

  var marker, i;

  for (i = 0; i < this.locations.length; i++) {  
    if(this.locations[i].user_type== this.user_type){
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
      position: new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng),
      map:this.map,
      icon: {
        url: this.imgs
      }, 
      title:this.locations[i].name 
    });
    var that = this;    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(that.locations[i].business_name);
        infowindow.open(this.map, marker);
      }
    })(marker, i));

     }

  } 
});

  
}
  ionViewDidLoad() {
    this.storage.get("userdetails").then((val)=>{
      this.userdetails =val;
      this.user_id = this.userdetails[0].id;
      this.country_id = this.userdetails[0].country_id;
      console.log('id',this.user_id); console.log('id',this.country_id);
      console.log('userdetails',val);

      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
      
    var marker, i;
    let latLng = new google.maps.LatLng(this.userdetails[0].latitude,this.userdetails[0].longitude);  
    //let latLng = new google.maps.LatLng(48.8513735, 2.3861292);
    let mapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    }
  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
       
    var infowindow = new google.maps.InfoWindow();
    this.http.get(MyApp.url+"mapusers.php").subscribe((data)=>{
      this.locations=data;
     console.log("mapusers : ",this.locations);
  
    var marker, i;
  
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
        position: new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng),
        map:this.map,
        icon: {
          url: this.imgs
        }, 
        title:this.locations[i].name 
      });
      var that = this;    
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(that.locations[i].business_name);
          infowindow.open(this.map, marker);
        }
      })(marker, i));
  
       
  
    } 
  });
});

  }

}



