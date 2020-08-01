import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { GoogleMapPage } from '../google-map/google-map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
  
})

export class HomePage {
 
  dropdownList = [];
  selectedcountries = [];
  selectedchapters = [];
  selectedtype=[];
  dropdownSettings = {};
  dropdownSettings1={};
  dropdownSettings2={};
  countries:any;
  chapters:any;
  country_id:any;
  chapter_id:any;
  resultmap:any;
  usertype:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController,private http:HttpClient) {
  
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  onItemSelect(item: any) {
    console.log(item);
    this.country_id = item.country_id;
    console.log("countryid",this.country_id);
  }
 
  onSelectchapter(chapter:any){
    console.log(chapter);
    this.chapter_id=chapter.id;
    console.log("country",this.chapter_id);
  }
  ontypeSelect(usertype: any) {
    console.log(usertype);
    this.usertype = usertype.id;
    console.log("type",this.usertype);
  }
  submit(){
    console.log("country_id",this.country_id);
    console.log("chapter_id",this.chapter_id);
    console.log("type",this.usertype);
    if(this.country_id!='' && this.chapter_id!='' && this.usertype!=''){
   var link=MyApp.url+"mapusers.php";
    var postjsondata=JSON.stringify({
      'country_id':this.country_id,
      'chapter_id':this.chapter_id,
      'user_type':this.usertype,
    });
this.http.post(link,postjsondata).subscribe((edata)=>{
  this.resultmap=edata;
  console.log('map data',edata);
  this.navCtrl.push(GoogleMapPage,{
    'mapusers':this.resultmap,
  });
});
}
  }
    ngOnInit() {
      this.http.get(MyApp.url+"getcountries.php").subscribe((data)=>{
        this.countries = data;
        console.log("countries",this.countries);
    this.selectedcountries = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'country_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection:true,
    };
  });
  this.http.get(MyApp.url+"getallchapters.php").subscribe((data)=>{
    this.chapters = data;
    console.log("chapters",this.chapters);
this.selectedchapters = [];
this.dropdownSettings1 = {
  singleSelection: true,
  idField: 'id',
  textField: 'chapter_name',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 3,
  allowSearchFilter: true,
  closeDropDownOnSelection:true,
};
});

this.dropdownList = [
  { id: 'seller', name: 'Seller' },
  { id: 'buyer', name: 'Buyer' }
];
this.selectedtype = [];
this.dropdownSettings2 = {
  singleSelection: true,
  idField: 'id',
  textField: 'name',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 3,
  allowSearchFilter: true
};
  }
  
  

}
