import { UpgradePage } from './../upgrade/upgrade';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ChatPage } from '../chat/chat';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MyApp } from '../../app/app.component';
import { HssearchPage } from '../hssearch/hssearch';
import { AddhscodePage } from "../addhscode/addhscode";
import { LeadpreviewPage } from '../leadpreview/leadpreview';
import { VideologinPage } from '../videologin/videologin';
import { TitleCasePipe } from '@angular/common';
import { TargetvsachievePage } from '../targetvsachieve/targetvsachieve';


@Component({
  selector: 'page-rfq',
  templateUrl: 'rfq.html',
})
export class RfqPage {
  @ViewChild("impexpmobile") impexpmobile;
  @ViewChild("impexpname") impexpname;
  @ViewChild("type") type;
  @ViewChild("category") category;
  @ViewChild("chapter") chapter;
  @ViewChild("hscode") hscode;
  @ViewChild("product") product;
  @ViewChild("uom") uom;
  @ViewChild("quantity") quantity;
  @ViewChild("country") country;
  @ViewChild("state") state;
  @ViewChild("edate") edate;
  @ViewChild("description") description;
  @ViewChild("remarki") remarki;
  @ViewChild("si") si;
  @ViewChild("ia") ia;
  @ViewChild("price") price;
  //@ViewChild("discount") discount;
  @ViewChild("business_address") business_address;
  //@ViewChild("index") index;

  countryname: any; companyname: any;
  sellername: any; product_name: any;
  qty: any;
  unitmeasure: any;
  logindata: any;
  leadid: any;

  dropdownList = [];
  selectedItems = {};
  selectedPorts={};
  selectedPhonecode = {}
  // selectedItems = [];
  dropdownSettings6 = {};
  ChapterList = [];
  HscodesList = [];
  SelectedCountry = [];
  selectedcategory = [];
  selectedhsncodes = [];
  selectedproduct = [];
  selecteduom = [];
  selectedcountry = {};
  lodingportcountry =[];
  destiportcountry = [];
  lodingport =[];
  destiport = [];
  selectedcurrency = [];
  selectedregions = [];
  selectedregionss = {};
  lcountryItems = {};
  dcountryItems = {};
  lportsItems = {};
  dportsItems = {};
  currencyItems = {};
  regionalItems = {};

  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  dropdownSettings3 = {};
  dropdownSettings4 = {};
  dropdownSettings5 = {};
  dropdownSettings8 = {};
  dropdownSettings9 = {};
  dropdownSettings12 = {};
  dropdownSettings13 = {};
  dropdownSettings14 = {};
  dropdownSettings15 = {};

  category_id: any;
  selectedchapter = [];
  selectedlevel3=[];
  lead_type: any;
  product_id: any;
  uom_id: any;
  hsn_id: any;
  chapter_id: any;
  country_id: any;
  userid: any;
  formdata: any;
  categories: any;
  countries: any;
  chapters: any;
  hsdetails: any;
  products: any;
  uoms: any;
  allcountry_id: any;
  mobile: any;
  userdetails: any;
  referal_code: any;
  user_id: any;
  DPhoto: any;
  DriverPhoto: any;
  user_country: any;
  userprofile:any;
  usermobileno:any;
  Doc1:any;
  Doc2:any;
  Doc3:any;
  Doc4:any;
  Document1:any;
  Document2:any;
  Document3:any;
  Document4:any;
  category_name:any;
  chapter_name:any;
  hsncode_name:any;
  selectedpro_name:any;
  uom_name:any;
  Edate: string;
  level3: Object;
  chapters1: Object;
  chapter1_id: any;
  cslot: Date;
  userdata: any;
  dropdownSettings7: {
  singleSelection: boolean; idField: string; textField: string;
    //selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  priceModel: { id: string; name: string; }[];
  portdata: Object;
  selectedport: any[];
  dropdownSettings10: {
  singleSelection: boolean; idField: string; textField: string;
    // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  ports: Object;
  port: any;
  price_option: any;
  indexer:boolean;
  pdiv:any=false;
  impexpdiv = false;
  cartdiv = true;
  odiv:any=true;
  tdiv:any = false;
  div1 = true;
  div2 = false;
  div3 = false;
  uomname: any;
  totaldata: string;
  fslot: number;
  utype: any;
  myDesc:string = "";
  myQty:string = "";
  MyPrice:string = "";
  MyDate:string = "";
  MyAuth:string = "";
  MyRemark:string = "";
  MyInst:string = "";
  selectedphonecode: any[];
  dropdownSettings11: {
  singleSelection: boolean; idField: string; textField: string;
    // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: boolean; closeDropDownOnSelection: boolean;
  };
  phoncecode: any;
  impexpmob: string;
  impexpmobnumber: string;
  txtmsg: string;
  businessaddress: any;
  impexpmail: any;
  currency: any;
  continent: any;
  Continent: any;
  Region:any;
  regions: any;
  Mcurrency:any;
  lcountry:any;
  dcountry:any;
  lport:any;
  dport:any;
  lports: any;
  dports: any;
  destination_port:any;
  loading_port:any;
  selecteRegional: any;
  multicountries: any;
  showcount: any;
  messagecount: Object;
  user_subscription_id: any;
  plan_type: any;
  selectedItems1: any[];

  constructor(public navCtrl: NavController,public navParams: NavParams,
    private http: HttpClient, private storage: Storage, public alertCtrl: AlertController,
    private camera: Camera, private transfer: FileTransfer, public menuCtrl: MenuController,public toastCtrl: ToastController ) {
      this.http.get(MyApp.url+"getcurency.php").subscribe(data=>{
        this.currency = data;
        console.log("World Currency:", this.currency)
      });
      this.selectedcurrency = [];
      console.log(this.selectedcurrency, 'all currency here');
      this.dropdownSettings14 = {
        singleSelection: true,
        idField: 'code',
        textField: 'code',
       // selectAllText: 'Select All',
        //unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        closeDropDownOnSelection: true,
      };



      this.http.get(MyApp.url+"getcontinent.php").subscribe(gdata=>{
        this.continent = gdata;
        console.log("Continents:", this.continent)
      })
     }

    toggleMenu() {
      this.menuCtrl.toggle();
    }

    getRegions(items : any){
      console.log("items : ", items);
      this.Continent = items;
     
      var link=MyApp.url+"getMultipleRegional.php";
      var Jsondata=JSON.stringify({ 
        'continent_id': this.Continent
      });
      console.log('jsndata',Jsondata);
      this.http.post(link,Jsondata).subscribe((data)=>{
      this.regions=data;
      console.log('regions',this.regions);

      this.selectedregionss = {};
      console.log(this.selectedregionss, 'selected list');
      this.dropdownSettings15 = {
        singleSelection: false,
        idField: 'continent',
        textField: 'continent',
     // selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
            
      };

      });

    }

    getCountries(items : any){
      console.log("items : ", items);
      this.selecteRegional = items;
      console.log(' multi reginal data',this.selecteRegional);
      var link=MyApp.url+"getMultipleRegionalCountries.php";
      var Jsondata=JSON.stringify({ 
        'regional': this.selecteRegional
      });
      console.log('jsndata',Jsondata);
      this.http.post(link,Jsondata).subscribe((data)=>{
      this.multicountries=data;
      console.log('multi regional countries ',this.multicountries);


      });      

    }


    indexed(){
      console.log('CFacebook new state:', this.indexer);
      if(this.indexer==true){
        this.pdiv=true;
      }
      if(this.indexer==false){
        this.pdiv=false;
      }
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
  /* upload document function */

  Docu1() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.Doc1 = 'data:image/jpeg;base64,' + imageData;
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      this.Document1 = 'Doc1' + random + '.jpg' ;
      let options3: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.Document1,
        headers: {}

      }
      console.log("Image Doument:",this.Doc1);
      fileTransfer.upload(this.Doc1, MyApp.url+'uploads.php', options3)
        .then((data) => {
          console.log(data);
          // success
          alert("Document successfully added to system")
        }, (err) => {
          // error
          console.log("error" + JSON.stringify(err));
        });
    });
  }
  /* upload1 end */
  //doc2 upload starts
  Docu2() {
     const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.Doc2 = 'data:image/jpeg;base64,' + imageData;
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      this.Document2 = 'Doc2' + random + '.jpg';
      let options4: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.Document2,
        headers: {}

      }
      console.log("url Address is:",MyApp.url);
      fileTransfer.upload(this.Doc2, MyApp.url+'uploads.php', options4)
        .then((data) => {
          console.log(data);
          // success
          alert("succes upload")
        }, (err) => {
          // error
          console.log("error" + JSON.stringify(err));
        });
    });
  }
  //Doc2 ends
  //doc3 start
  Docu3() {
     const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.Doc3 = 'data:image/jpeg;base64,' + imageData;
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      this.Document3 = 'Doc3' + random + '.jpg';
      let options5: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.Document3,
        headers: {}

      }

      fileTransfer.upload(this.Doc3, MyApp.url+'uploads.php', options5)
        .then((data) => {
          console.log(data);
          // success
          alert("succes upload")
        }, (err) => {
          // error
          console.log("error" + JSON.stringify(err));
        });
    });
  }
  //doc3 ends
  //doc4 start
  Docu4() {
     const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.Doc4 = 'data:image/jpeg;base64,' + imageData;
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      this.Document4 = 'Doc4' + random + '.jpg';
      let options6: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.Document4,
        headers: {}

      }

      fileTransfer.upload(this.Doc4, MyApp.url+'uploads.php', options6)
        .then((data) => {
          console.log(data);
          // success
          alert("succes upload")
        }, (err) => {
          // error
          console.log("error" + JSON.stringify(err));
        });
    });
  }
  //doc4 ends


  /*send quote */
  rfqsend() {
    if(this.utype ==1){
      console.log('impexpmobile : ', this.impexpmobile.value);
      //this.impexpmob = this.phoncecode+""+this.impexpmobile.value;

      if(this.phoncecode==""){
        const alert = this.alertCtrl.create({
          title: 'Notice',
          subTitle: 'Please Select Phonecode',
          buttons: ['OK']
        });
        alert.present(); 
        return false;
      }else{
  
        if(this.impexpmobile.value==""){
          this.impexpname = "";
          const alert = this.alertCtrl.create({
            title: 'Notice',
            subTitle: 'Please Enter Importer/ Exporter Mobile Number',
            buttons: ['OK']
          });
          alert.present(); 
          return false;
        }else{
          this.impexpmob = this.phoncecode+""+this.impexpmobile.value;

          this.http.get(MyApp.url + "getimpexpname.php?mobile=" + this.impexpmob).subscribe((data) => {
            //console.log("Imp Exp Name data : ", data);
            if(data !=0){
              this.txtmsg = "This phone number is associated with Business name ";
              this.impexpname = data;
              this.impexpmail = this.impexpname.email;
            //  console.log("Imp Exp Name value : ", this.impexpname);

            }else{
              this.txtmsg = "";
              this.impexpname = "";
              this.impexpmobile = "";
              this.impexpmail = "";
              const alert = this.alertCtrl.create({
                title: 'Notice',
                subTitle: 'Invalid Importer/ Exporter Mobile Number',
                buttons: ['OK']
              });
              alert.present(); 
              return false;

            }
    
          });




        }
      
      }

    }else{
      this.impexpmob="";
      this.impexpmail = "";
    }

    console.log("Import Export Mob : ", this.impexpmob);
    console.log('leadtype', this.lead_type);
    console.log('category_id', this.category_id);
    console.log('chapter_id', this.chapter_id);
    console.log('hsn_id', this.hsn_id);
    console.log('product_id', this.product_id);
    console.log('all country_id', this.allcountry_id);
    console.log('uom_id', this.uom_id);
    console.log('edate value', this.edate.value);
    console.log('edate year value', this.edate.value.year);
    this.Edate = this.edate.value.year+"-"+this.edate.value.month+"-"+this.edate.value.day
    console.log("final Date",this.Edate)
    //console.log("Description Text Console", this.description.value);
    this.storage.get('myDesc').then((myDesc)=> {
      this.myDesc = myDesc;
    });
    this.storage.get('myQty').then((myQty)=> {
      this.myQty = myQty;
    });
   
    if(this.lead_type!=''){
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure to continue with information given in this page ?',
      cssClass: 'buttoncss',
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

            /* var link = MyApp.url + "postleads.php"; */
            this.totaldata = JSON.stringify({
              'user_id': this.user_id,
              'lead_type': this.lead_type.name,
              'category_id': this.category_id,
              'chapter_id': this.chapter_id,
              'hsncode_id': this.hsn_id,
              'product_id': this.product_id,
              'uom_id': this.uom_id,
              'uom':this.uomname,
              'quantity': this.myQty,
              'country': this.selectedItems,
              'continent': this.Continent,
              'region':this.Region,
              'loading_country':this.lcountry,
              'loading_port_type':this.lport,
              'loading_port':this.loading_port.port,
              'destination_country':this.dcountry,
              'destination_port_type':this.dport,
              'destination_port':this.destination_port,
              'index_name':'none',
              'last_date': this.Edate,
              'description': this.myDesc,
              'user_country': this.user_country,
              'mobile': this.mobile,
              'document1': this.Document1,
              'document2':this.Document2,
              'document3':this.Document3,
              'document4':this.Document4,
              'price_option':this.price_option,
              'price_inusd':this.price.value,
              'index_discount':0,
              'business_address':this.business_address.value,
              'inspection_auth':this.ia.value,
              'special_instruc':this.si.value,
              'remark':this.remarki.value,
              'impexpmail':this.impexpmail,
              'impexpmobile':this.impexpmob,
              'currency':this.Mcurrency.code
            });
            console.log('json updata', this.totaldata);
            this.navCtrl.push(LeadpreviewPage,{
              'pagedata':this.totaldata,
              'user_id': this.user_id,
              'lead_type': this.lead_type.name,
              'category_id': this.category_id,
              'chapter_id': this.chapter_id,
              'hsncode_id': this.hsn_id,
              'product_id': this.product_id,
              'uom_id': this.uom_id,
              'uom':this.uomname,
              'quantity': this.myQty,
              'country': this.selectedItems,
              'continent': this.Continent,
              'region':this.Region,
              'loading_country':this.lcountry,
              'loading_port_type':this.lport,
              'loading_port':this.loading_port.port,
              'destination_country':this.dcountry,
              'destination_port_type':this.dport,
              'destination_port':this.destination_port,
              'index_name':'none',
              'last_date': this.Edate,
              'description': this.myDesc,
              'user_country': this.user_country,
              'mobile': this.mobile,
              'document1': this.Document1,
              'document2':this.Document2,
              'document3':this.Document3,
              'document4':this.Document4,
              'price_option':this.price_option,
              'price_inusd':this.price.value,
              'index_discount':0,
              'business_address':this.business_address.value,
              'inspection_auth':this.ia.value,
              'special_instruc':this.si.value,
              'remark':this.remarki.value,
              'impexpmail':this.impexpmail,
              'impexpmobile':this.impexpmob,
              'currency':this.Mcurrency.code
            })
           
           /*  this.http.post(link, totaldata).subscribe((data) => {
              this.formdata = data;
              console.log(this.formdata);
              if(data==1){
                this.navCtrl.push(OtppostPage, {
                  'leadref_id': this.formdata,
                });
              }
              else{
                const toast = this.toastCtrl.create({
                  message: 'Some thing went wrong Plaese Try After some time',
                  duration: 3000
                });
                toast.present();
              } 
             ve

            });*/
          }

        }
      ]
    });
    confirm.present();
  }else{
    const alert = this.alertCtrl.create({
      title: 'Notice',
      subTitle: '* Fields are mandatory',
      buttons: ['OK']
    });
    alert.present();
  }
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


  /*Categories multiselect list*/

  ngOnInit() {
    this.dropdownList = [
      { id: 'sell', name: 'Sell' },
      { id: 'buy', name: 'Buy' },
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

   
  onItemSelect1(leadtype: any) {
    this.getimpexpname();
    this.lead_type = leadtype;
    console.log(this.lead_type, 'lead type')
    console.log(this.lead_type.name, 'lead type');
    if(this.lead_type.name =="Sell"){
      this.odiv=true;
      this.tdiv=false;
      console.log("Plan Type", this.plan_type);
      if(this.plan_type == "Demo"){
        this.http.get(MyApp.url+"mysellleads.php?u_id="+this.user_id).subscribe((data)=>{
          if(data !=0){
            const alert = this.alertCtrl.create({
              title: "Oops!",
              subTitle:
                "You have Already Posted 1 Sell Lead, To post more sell Leads Upgrade your plan",
              buttons: [
                {
                  text: "Cancel",
                   handler: () => {
                  console.log("Disagree clicked");
                  this.selectedItems1 = []; 
          }
        },
        {
          text: "Agree",
          handler: () => {
              this.navCtrl.push(UpgradePage);
                }
              }
              ]
              
            });
            alert.present();
            
          }
        });
        
      }
      else if(this.plan_type == "Free"){

        const alert = this.alertCtrl.create({
          title: "Oops!",
          subTitle:
            "Free Users can post only Buy Lead, To Post Sell Lead, Upgrade your Plan",
          buttons: [
            {
              text: "Cancel",
               handler: () => {
              console.log("Disagree clicked");
              this.navCtrl.push(RfqPage);
      }
    },
    {
      text: "Agree",
      handler: () => {
          this.navCtrl.push(UpgradePage);
            }
          }
          ]
          
        });
        alert.present();

      }
      
      
    }
    if(this.lead_type.name=="Buy"){
      this.tdiv=true;
      this.odiv=false;
      console.log("Plan Type", this.plan_type);
      if(this.plan_type == "Demo"){
        this.http.get(MyApp.url+"mybuyleads.php?u_id="+this.user_id).subscribe((data)=>{
          if(data !=0){
            const alert = this.alertCtrl.create({
              title: "Oops!",
              subTitle:
                "You have Already Posted 1 Buy Lead, to post more sell Leads Upgrade your plan",
              buttons: [
                {
                  text: "Cancel",
                   handler: () => {
                  console.log("Disagree clicked");
                  this.navCtrl.push(RfqPage);
          }
        },
        {
          text: "Agree",
          handler: () => {
              this.navCtrl.push(UpgradePage);
                }
              }
              ]
            });
            alert.present();
          }
        });
      }
      
    }
    }

  getImpExp() {
    this.getimpexpname();
  }

  getimpexpname(){
    if(this.utype ==1){
      this.impexpmobnumber = this.phoncecode+""+this.impexpmobile.value;
      //console.log("Imp/Exp Mobile Number :", this.impexpmobnumber);
      if(this.phoncecode==""){
        const alert = this.alertCtrl.create({
          title: 'Notice',
          subTitle: 'Please Select Phonecode',
          buttons: ['OK']
        });
        alert.present(); 
        return false;

      }else{

        if(this.impexpmobile.value==""){
          const alert = this.alertCtrl.create({
            title: 'Notice',
            subTitle: 'Please Enter Importer/ Exporter Mobile Number',
            buttons: ['OK']
          });
          alert.present(); 
          return false;
        }else{

          if(this.impexpmobnumber !=""){
            this.http.get(MyApp.url + "getimpexpname.php?mobile=" + this.impexpmobnumber).subscribe((data) => {
              //console.log("Imp Exp Name data : ", data);
              if(data !=0){
                this.txtmsg = "This phone number is associated with Business name ";
                this.impexpname = data;
                console.log("Imp Exp Name value : ", this.impexpname);

              }else{
                this.txtmsg = "";
                this.impexpname = "";
                this.impexpmobile = "";
                const alert = this.alertCtrl.create({
                  title: 'Notice',
                  subTitle: 'Invalid Importer/ Exporter Mobile Number',
                  buttons: ['OK']
                });
                alert.present(); 
                return false;

              }
      
            });
      
          } 

        }

      }

    }
  }

  impcart(){
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure to continue with information given in the mobile number ?',
      cssClass: 'buttoncss',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            this.cartdiv = false;
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.cartdiv = true;
          }
        }
      ]
    });
    confirm.present();
  }

  onItemSelectPort(port: any) {
    this.port = port;
    console.log(this.port,'Port');
  }

  onselectPhonecode(code: any) {
    this.phoncecode = code;
    console.log('phoncecode : ',this.phoncecode);
  }

  

  onItemSelectPM(pricemodel: any) {
    this.price_option = pricemodel;
    console.log(this.price_option,'Price Option');
  }

  getchapterslist(category: any) {
    console.log(category, 'selecteditem');
    console.log(category.id, 'selecteditem');
    this.category_id = category.id;
    console.log('cat id', this.category_id);
    this.http.get(MyApp.url + "getpackchapters.php?category_id=" + this.category_id).subscribe((data) => {
      this.chapters1 = data;
      console.log(this.chapters1, 'chapters');
    });
    this.selectedchapter = [];
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'id',
      textField: 'MyColumn',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  
  gethsnlist(chapters: any) {
   
    this.chapter_id = chapters.id;
    console.log('cat id', this.chapter_id);
    var link=MyApp.url+"getpackhsncodes.php";
    var Jsondata=JSON.stringify({
      'chapter_id':this.chapter_id,
      'country_id': this.country_id
    });
    console.log("data",Jsondata)
    this.http.post(link,Jsondata).subscribe((data) => {
      this.hsdetails = data;
      console.log(this.hsdetails, 'hsncodes');
    });
    this.selectedhsncodes = [];
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'hscode',
      textField: 'MyColumn',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

  }
  productlist(hscode: any) {
    console.log(hscode, 'selectedhscode');
    console.log(hscode.hscode, 'selectedhscode');
    this.hsn_id = hscode.hscode;
    this.hsncode_name = hscode.hsncode;
    console.log('hscode id', this.hsn_id);

    this.http.get(MyApp.url + "getproducts.php?hsn_id=" + this.hsn_id).subscribe((data) => {
      this.products = data;
      console.log(this.products, 'prodcts');
    });
    this.selectedproduct = [];
    this.dropdownSettings3 = {
      singleSelection: true,
      idField: 'id',
      textField: 'product',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }
  getuoms(prodct: any) {
    console.log(prodct, 'selectedprodct');
    console.log(prodct.id, 'selectedproduct');
    this.product_id = prodct.id;
    this.selectedpro_name = prodct.product;
    console.log(this.selectedpro_name , 'selectedproductname');
  }
  showuom(uom: any) {
    console.log(uom, 'selecteduom');
    console.log(uom.id, 'selecteduom');
    this.uom_id = uom.id;
    this.uomname=uom.uom;
  }
  shoecountry(country: any) {
    console.log(country, 'selecteduom');
    console.log(country.id, 'selecteduom');
    this.uom_name=country.uom;
    console.log(this.uom_name,'uomname');
  }

  div2nav()
  {
    let myDesc = this.description.value;
    this.storage.set("myDesc", myDesc);
    let myQty = this.quantity.value;
    this.storage.set("myQty", myQty);
    this.div2 = true;
    this.div1 = false;
  }

  div2pre(){
    this.storage.get('myDesc').then((myDesc)=> {
      this.myDesc = myDesc;
    });
    this.storage.get('myQty').then((myQty)=> {
      this.myQty = myQty;
    });
    this.div2 = false;
    this.div1 = true;
  }
  div3nav(){
    this.div2 = false;
    this.div3 = true;
    this.storage.get('MyPrice').then((MyPrice)=> {
      this.MyPrice = MyPrice;
    });
    this.storage.get('MyDate').then((MyDate)=> {
      this.MyDate = MyDate;
    });
    this.storage.get('MyAuth').then((MyAuth)=> {
      this.MyAuth = MyAuth;
    });
    this.storage.get('MyRemark').then((MyRemark)=> {
      this.MyRemark = MyRemark;
    });
    this.storage.get('MyInst').then((MyInst)=> {
      this.MyInst = MyInst;
    });
  }
div3pre(){
  let MyPrice = this.price.value;
  this.storage.set("MyPrice", MyPrice);
  let MyDate = this.edate.value.year+"-"+this.edate.value.month+"-"+this.edate.value.day;
  this.storage.set("MyDate", MyDate);
  let MyAuth = this.ia.value ;
  this.storage.set("MyAuth", MyAuth);
  let MyRemark = this.remarki;
  this.storage.set("MyRemark", MyRemark);
  let MyInst = this.si.value ;
  this.storage.set("MyInst", MyInst);
  this.div3 = false;
  this.div2 = true;
}
  getsearch(){
    this.navCtrl.push(HssearchPage);
  }
  addhscode(){
    this.navCtrl.push(AddhscodePage);
  }
  ionViewDidLoad() {
    this.cslot=new Date();
    this.fslot = this.cslot.getFullYear() +3;
    this.logindata = this.navParams.get('userdetails');
    this.storage.get('userdetails').then((val) => {
      this.userdetails = val;
      this.user_id = this.userdetails[0].id;
      this.referal_code = this.userdetails[0].referal_code;
      this.mobile = this.userdetails[0].mobile;
      this.user_country = this.userdetails[0].country_id;
      this.user_subscription_id = this.userdetails[0].subscription_id;
      this.plan_type = this.userdetails[0].plan_type;
      console.log('userdata', this.userdetails);
      console.log('user id', this.user_id);
      console.log('mobile', this.mobile);
      console.log('referal_code', this.referal_code);
      console.log('user-county', this.user_country);
      console.log('user Plan Type', this.plan_type);
    });



    console.log('ionViewDidLoad RfqPage');
    this.http.get(MyApp.url + "getuoms.php").subscribe((uomdata) => {
      this.uoms = uomdata;
      console.log(this.uoms, 'uoms');
      this.selecteduom = [];
      this.dropdownSettings4 = {
        singleSelection: true,
        idField: 'id',
        textField: 'uom',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        closeDropDownOnSelection: true
      };
    });

    this.storage.get("userdetails").then((val) => {
      this.userdata = val;
      this.country_id = this.userdata[0].country_id;
      this.user_id = this.userdata[0].id;
      this.mobile = this.userdata[0].mobile;
      this.businessaddress = this.userdata[0].business_address;
      this.utype = this.userdata[0].other_check;
      //console.log("Other_check : ", this.utype);
      if(this.utype ==1){
        this.impexpdiv = true;
        this.cartdiv = false;
      }
      this.http.get(MyApp.url+"profile.php?user_id="+this.user_id).subscribe((pdata)=>{
        this.userprofile = pdata;
        this.usermobileno =this.userdata[0].mobile;
        //console.log('userprofile data',this.userprofile);
      });
  
      this.http.get(MyApp.url+"getport.php?country_id="+this.country_id).subscribe((portdata)=>{
        this.ports = portdata;
        console.log('port data',this.portdata);
      });
      
      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
      //console.log("user id=", this.userid);
     
    });


  }
ionViewDidLeave(){
  this.storage.set("myDesc", '');
  this.storage.set("myQty", '');
  this.storage.set("MyPrice", '');
  this.storage.set("MyDate", '');
  this.storage.set("MyAuth", '');
  this.storage.set("MyRemark", '');
  this.storage.set("MyInst", '');
}

}
