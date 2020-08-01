import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { RfqPage } from '../rfq/rfq';
import { HttpClient } from '@angular/common/http';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { MyApp } from '../../app/app.component';
import { Storage } from '@ionic/storage';
import { VideologinPage } from '../videologin/videologin';

declare var google;
@Component({
  selector: 'page-franchisemap',
  templateUrl: 'franchisemap.html',
})
export class FranchisemapPage {

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
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,
    private http:HttpClient, public storage:Storage) {
   
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

        

    ionViewDidLoad(){
     
      this.loadmap();
    }
   loadmap(){
    this.storage.get("userdetails").then((val)=>{
      this.userdata=val;
      console.log("userdata=",this.userdata);
      console.log(this.userdata[0].longitude,'Logintude')
   console.log(this.userdata[0].latitude,'Latitude')
    
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
    this.http.get(MyApp.url+"mapfranchiseusers.php").subscribe((data)=>{
      this.locations=data;
     console.log(" :",this.locations);

    var marker, i;

    for (i = 0; i < this.locations.length; i++) {  
     /* if(this.locations[i].ftype=='CNTF'){
        this.imgs = "https://maps.google.com/mapfiles/ms/icons/gray-dot.png"
      }else{
        if(this.locations[i].ftype=='RF'){
          this.imgs = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }else{
         
          if(this.locations[i].ftype=='CF'){
            this.imgs = "https://maps.google.com/mapfiles/ms/icons/brown-dot.png"
          }else{
         
            if(this.locations[i].ftype=='CCF'){
              this.imgs = "https://maps.google.com/mapfiles/ms/icons/pink-dot.png"
            }else{
         
              if(this.locations[i].ftype=='ZF'){
                this.imgs = "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }else{
         
                if(this.locations[i].ftype=='ZCF'){
                  this.imgs = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                }else{
         
                  if(this.locations[i].ftype=='SF'){
                    this.imgs = "https://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                  }else{
         
                    if(this.locations[i].ftype=='SCF'){
                      this.imgs = "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    }else{
                      this.imgs = "https://maps.google.com/mapfiles/ms/icons/red-dot.png" 
                    }            
          
                  }            
        
                }            
      
              }            
    
            }            
  
          }            

        }
      } */

      if(this.locations[i].ftype==1){
        this.imgs = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }else{
        if(this.locations[i].ftype==2){
          this.imgs = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }else{
         
          if(this.locations[i].ftype==3){
            this.imgs = "https://maps.google.com/mapfiles/ms/icons/pink-dot.png"
          }else{
         
            if(this.locations[i].ftype==4){
              this.imgs = "https://maps.google.com/mapfiles/ms/icons/pink-dot.png"
            }else{
         
              if(this.locations[i].ftype==5){
                this.imgs = "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }else{
         
                if(this.locations[i].ftype==6){
                  this.imgs = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                }else{
         
                  if(this.locations[i].ftype==7){
                    this.imgs = "https://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                  }else{
         
                    if(this.locations[i].ftype==8){
                      this.imgs = "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    }else{
                      this.imgs = "https://maps.google.com/mapfiles/ms/icons/red-dot.png" 
                    }            
          
                  }            
        
                }            
      
              }            
    
            }            
  
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
    
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent("users");
          infowindow.open(this.map, marker);
        }
      })(marker, i));
    } 
});
});
  } 

}
