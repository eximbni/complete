import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { RfqPage } from '../rfq/rfq';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
//import { GoogleMaps, GoogleMap, Environment, Marker, BaseArrayClass} from '@ionic-native/google-maps'


declare var google;
@Component({
  selector: 'page-hsnmaps',
  templateUrl: 'hsnmaps.html',
})
export class HsnmapsPage {

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
 locations:any=[];
 mapusers:any=[];
 name:any;
  total: any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams ) {
    this.locations=this.navParams.get('mapusers');
    this.total = this.locations.length
    console.log(this.locations);
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
                
    rfqpost(){
      this.navCtrl.push( RfqPage );
    }

        

    ionViewDidLoad(){
      this.loadmap();
    }
   loadmap(){
    var marker, i;
    let latLng = new google.maps.LatLng(this.locations[0].latitude,this.locations[0].longitude);  
    //let latLng = new google.maps.LatLng(48.8513735, 2.3861292);
    let mapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       
    var infowindow = new google.maps.InfoWindow();
    
    for (i = 0; i < this.locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.locations[i].latitude, this.locations[i].longitude),
        map: this.map
        });
    
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(this.locations[i].business_name);
          infowindow.open(this.map, marker);
        }
      })(marker, i));
    }
  }
}
