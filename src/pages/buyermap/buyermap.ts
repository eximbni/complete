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
  selector: 'page-buyermap',
  templateUrl: 'buyermap.html',
})

export class BuyermapPage {
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
user_id:any;
country_id:any;
chapterid:any;
buyerslist:any;
  onlinebuyerslist: any;
  leadpostbuyerslist: any;
  pet:any
  imgs: string;
  locations: any;
  
  constructor(public navCtrl: NavController,public navParams: NavParams, private http:HttpClient, private storage :Storage,
    public menuCtrl:MenuController) {
      this.pet="kittens";
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
  this.navCtrl.push(WebinarPage);
}
quotes(){
  this.navCtrl.push(RfqPage);
}

ngOnInit() {
  this.storage.get("userdetails").then((val)=>{
    this.userdetails =val;
    this.user_id = this.userdetails[0].id;
    console.log('id',this.user_id);
    console.log('userdetails',val);
    
  this.http.get(MyApp.url+"getuserchapters.php?user_id="+this.user_id).subscribe((data)=>{
    this.chapters = data;
      console.log( this.chapters,'chapters');
    });
    console.log(this.chapters,'chapter names');
  });
 

 this.selectedItems = {};
 console.log(this.selectedItems ,'selected list');
  this.dropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'ch_description',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
   // itemsShowLimit: '3',
    //limitSelection:this.count,
    allowSearchFilter: false
  };
}


onItemSelect(item: any) {
  console.log(item,'selecteditem');
console.log(item.id,'id no');
this.chapterid =item.id;


this.http.get(MyApp.url+"getbuyerslist.php?country_id="+this.country_id+"&chapter_id="+this.chapterid).subscribe((data)=>{
  this.buyerslist = data;
  console.log("buyerslist data : ",this.buyerslist);

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

  for (i = 0; i < this.buyerslist.length; i++) {  
  
      if(this.buyerslist[i].chat_status=='online'){
        this.imgs = "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
      }else{
          this.imgs = "https://maps.google.com/mapfiles/ms/icons/red-dot.png"        
      }
 
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.buyerslist[i].latitude, this.buyerslist[i].longitude),
      map:this.map,
      icon: {
        url: this.imgs
      },
      title:this.buyerslist[i].name 
    });
  var that = this;
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(that.buyerslist[i].business_name);
        infowindow.open(this.map, marker);
      }
    })(marker, i));
  } 


});


}

Back(){
  this.navCtrl.push(CategoriesPage);
}
  ionViewDidLoad() {
    this.storage.get("userdetails").then((val)=>{
      this.userdetails =val;
      this.user_id = this.userdetails[0].id;
      this.country_id = this.userdetails[0].country_id;
      console.log('id',this.user_id); console.log('id',this.country_id);
      console.log('userdetails',val);

    });
   
  }
 

}