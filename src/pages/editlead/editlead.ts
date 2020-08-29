import { MyLeadsPage } from './../my-leads/my-leads';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HttpClient } from '@angular/common/http';
import { ViewhistoryPage } from '../viewhistory/viewhistory';

@Component({
  selector: 'page-editlead',
  templateUrl: 'editlead.html',
})
export class EditleadPage {
  leaddetails: any;
  categories_id: any;
  chapter_id: any;
  id: any;
  description: any;
  currency: any;
  destination_port: any;
  expiry_date: any;
  hsn_id: any;
  inspection_auth: any;
  loading_port: any;
  port_type: any;
  price_inusd: any;
  price_option: any;
  quantity: any;
  special_instruc: any;
  uom: any;
  leadref_id: any;
  lead_type: any;
  dropdownList: { id: string; name: string; }[];
  dropdownSettings6: {
    singleSelection: boolean; idField: string; textField: string;
    //selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  priceModel: { id: string; name: string; }[];
  dropdownSettings7: {
    singleSelection: boolean; idField: string; textField: string;
    //selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  countries: any;
  selectedcountry: any[];
  dropdownSettings5: {
    singleSelection: boolean; idField: string; textField: string;
    // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  lodingportcountry: any[];
  dropdownSettings8: {
    singleSelection: boolean; idField: string; textField: string;
    // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  destiportcountry: any[];
  dropdownSettings9: {
    singleSelection: boolean; idField: string; textField: string;
    // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  selectedphonecode: any[];
  dropdownSettings11: {
    singleSelection: boolean; idField: string; textField: string;
    // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  selectedport: any[];
  dropdownSettings10: {
    singleSelection: boolean; idField: string; textField: string;
    // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  
  categories: Object;
  selectedItems: {};
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; allowSearchFilter: boolean; closeDropDownOnSelection: boolean; };
  Mcurrency: any;
  category_name: any;
  allcountry_id: any;
  country_id: any;
  lcountry: any;
  dcountry: any;
  lport: string;
  lports: Object;
  lodingport: any[];
  dropdownSettings12: {
    singleSelection: boolean; idField: string; textField: string;
    // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  dport: string;
  dports: Object;
  destiport: any[];
  dropdownSettings13: {
    singleSelection: boolean; idField: string; textField: string;
    // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  cslot: Date;
  @ViewChild("uMyDate") uMyDate;
  @ViewChild("uMyAuth") uMyAuth;
  @ViewChild("uMyRemark") uMyRemark;
  @ViewChild("uMyInst") uMyInst;
  @ViewChild("uqty") uqty;
  @ViewChild("uprice") uprice;
  @ViewChild("udescription") udescription;
  @ViewChild("edate") edate;
  load_port: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private menuCtrl : MenuController) {
    this.categories_id=this.navParams.get('categories_id');
    this.chapter_id=this.navParams.get('chapter_id');
    this.id= this.navParams.get('id');
    this.description= this.navParams.get('description');
    this.currency=this.navParams.get('currency');
    this.destination_port=this.navParams.get('destination_port');
    this.expiry_date=this.navParams.get('expiry_date');
    this.hsn_id=this.navParams.get('hsn_id');
    this.inspection_auth=this.navParams.get('inspection_auth');
    this.load_port=this.navParams.get('loading_port');
    this.port_type=this.navParams.get('port_type');
    this.price_inusd=this.navParams.get('price_inusd');
    this.price_option=this.navParams.get('price_option');
    this.quantity=this.navParams.get('quantity');
    this.special_instruc=this.navParams.get('special_instruc');
    this.uom=this.navParams.get('uom');
    this.leadref_id=this.navParams.get('leadref_id');
    this.lead_type=this.navParams.get('lead_type');
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  Back(){
    this.navCtrl.push(MyLeadsPage);
  }

  update(){
    if(this.uMyAuth.value!='' ||this.uMyRemark.value!='' ||this.uMyInst.value!='' ||this.uqty.value!='' ||this.uprice.value!='' ||this.udescription.value!='' ){

    var link = MyApp.url+"updateleads.php";
    var Mydata = JSON.stringify({
    'id':this.id,
    'description':this.description,
    'currency':this.currency,
    'destination_port':this.destination_port,
    'expiry_date':this.expiry_date,
    'inspection_auth':this.inspection_auth,
    'loading_port':this.load_port,
    'port_type':this.port_type,
    'price_inusd':this.price_inusd,
    'price_option':this.price_option,
    'quantity':this.quantity,
    'special_instruc':this.special_instruc,
    'uom':this.uom,
    'leadref_id':this.leadref_id,
    'uMyDate':this.edate.value.year+"-"+this.edate.value.month+"-"+this.edate.value.day,
    'uMyAuth':this.uMyAuth.value,
    'uMyRemark':this.uMyRemark.value,
    'uMyInst':this.uMyInst.value,
    'uqty':this.uqty.value,
    'uprice':this.uprice.value,
    'udescription':this.udescription.value,
    'uloading_country':this.lcountry,
    'uloading_port':this.loading_port,
    'udestination_country':this.dcountry,
    'udestination_port':this.destination_port,

    });
    console.log("Update Data: ", Mydata);
    this.http.post(link,Mydata).subscribe((data)=>{
      console.log(data);
      if(data==1){
        alert("Lead Updated Sucessfully. Please wait untill it gets apporved by EximBNI.");
        this.navCtrl.push(MyLeadsPage);
      }
      else{
        alert("Something went wrong please try after sometime");
      }
    });

  }
  else{
    alert("You have not made any updates. Please update and resubmit");
  }
  }
  ngOnInit() {
    this.dropdownList = [
      { id: 'Sell', name: 'Sell' },
      { id: 'Buy', name: 'Buy' },
    ];
    this.dropdownSettings6 = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      //selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    this.priceModel = [
      { id: 'FOB', name: 'FOB' },
      { id: 'CIF', name: 'CIF' },
      { id: 'CNF', name: 'CNF' },
    ];
    this.dropdownSettings7 = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      //selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };


    this.http.get(MyApp.url + "getcountries.php").subscribe((countrydata) => {
      this.countries = countrydata;
      console.log(this.countries, 'countries');
    });
    this.selectedcountry = [];
    console.log(this.selectedcountry, 'all countrie here');
    this.dropdownSettings5 = {
      singleSelection: false,
      idField: 'country_id',
      textField: 'name',
     // selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    this.lodingportcountry = [];
    console.log(this.lodingportcountry, 'all loading port countries here');
    this.dropdownSettings8 = {
      singleSelection: true,
      idField: 'country_id',
      textField: 'name',
     // selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    this.destiportcountry = [];
    console.log(this.destiportcountry, 'all destignation port countries here');
    this.dropdownSettings9 = {
      singleSelection: true,
      idField: 'country_id',
      textField: 'name',
     // selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };


    this.selectedphonecode = [];
    this.dropdownSettings11 = {
      singleSelection: true,
      idField: 'phonecode',
      textField: 'phonecode',
     // selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };



  this.selectedport = [];
  console.log(this.selectedport, 'all ports here');
  this.dropdownSettings10 = {
    singleSelection: true,
    idField: 'port_code',
    textField: 'port',
   // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };
 this.http.get(MyApp.url + "getcategories.php").subscribe((data) => {
      this.categories = data;
      console.log(this.categories, 'categories');
    });
    this.selectedItems = {};
    console.log(this.selectedItems, 'selected list');
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'category_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }
  onSelectAll(items: any, ) {
    console.log(this.selectedItems, 'selected _items total');
    console.log(items, 'selected _items total');
    this.category_name=items.category_name;
    console.log('cat name',this.category_name);
  }
  onSelectAllcountries(countries: any) {

    console.log(countries, 'countries');
    this.allcountry_id = countries;
  }
  onselectcountry(country: any) {
    console.log(country, 'country ');
    this.country_id = country;
  }

  onselectcountry8(country: any) {
   // console.log(country, 'loading port country ');
    this.lcountry = country.country_id;
    //console.log(this.lcountry, 'lcountry port country ');

  }

  onselectcountry9(country: any) {
   // console.log(country, 'destingnation port country ');
    this.dcountry = country.country_id; 
    //console.log(this.dcountry, 'dcountry port country ');
  }

  onselectcountry12(port: any) {
    //console.log(port, 'loading port ');
    this.loading_port = port;
    //console.log(this.loading_port, 'lcountry port ');

  }

  onselectcountry13(dports: any) {
    //console.log(dports, 'destingnation port ');
    this.destination_port = dports.port; 
    console.log(this.destination_port, 'dcountry port ');
  }

  onselectcountry14(mcurrency: any) {
     console.log(mcurrency, 'mcurrency  ');
     this.Mcurrency = mcurrency; 
    // console.log(this.destination_port, 'dcountry port ');
   }


   getlPort(){
    console.log("Selected lcountry Country:",this.lcountry)
    this.http.get(MyApp.url+"getleadport.php?country_id="+this.lcountry+"&port_type="+this.lport).subscribe((lportdata)=>{
      this.lports = lportdata;
      console.log('port data',lportdata);
    });
    this.lodingport = [];
    console.log(this.lodingport, 'all loading port countries here');
    this.dropdownSettings12 = {
      singleSelection: true,
      idField: 'port',
      textField: 'port',
     // selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };



  }
  getdPort(){
      
    this.http.get(MyApp.url+"getleadport.php?country_id="+this.dcountry+"&port_type="+this.dport).subscribe((dportdata)=>{
      this.dports = dportdata;
      console.log('port data',dportdata);
      this.destiport = [];
      console.log(this.destiport, 'all loading port countries here');
      this.dropdownSettings13 = {
        singleSelection: true,
        idField: 'port_code',
        textField: 'port',
       // selectAllText: 'Select All',
        //unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        closeDropDownOnSelection: true,
      };



    });
  }
  viewHistory(){
    this.navCtrl.push(ViewhistoryPage,{
      'lead_id':this.id
    })
  }

  ionViewDidLoad() {
    this.cslot=new Date();
    console.log('ionViewDidLoad EditleadPage');
  }

}
