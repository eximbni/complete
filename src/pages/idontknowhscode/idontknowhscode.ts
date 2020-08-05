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
import { RfqPage } from '../rfq/rfq';

@Component({
  selector: 'page-idontknowhscode',
  templateUrl: 'idontknowhscode.html',
})
export class IdontknowhscodePage {
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
  @ViewChild("si") si;
  @ViewChild("ia") ia;
  @ViewChild("price") price;
  @ViewChild("discount") discount;
  @ViewChild("business_address") business_address

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

  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  dropdownSettings3 = {};
  dropdownSettings4 = {};
  dropdownSettings5 = {};
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
  hsncode : any;
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
  odiv:any=true;
  tdiv:any = false;
  uomname: any;
  totaldata: string;
  fslot: number;
  utype: any;
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
  hsndescription: any;
  txtmsg: string;
  messagecount: Object;
  showcount: any;
   constructor(public navCtrl: NavController,public navParams: NavParams,
    private http: HttpClient, private storage: Storage, public alertCtrl: AlertController,
    private camera: Camera, private transfer: FileTransfer, public menuCtrl: MenuController,public toastCtrl: ToastController ) {

      this.chapter_id = navParams.get("chapter_id");
      this.hsndescription = navParams.get("hsndescription");
      this.hsncode = navParams.get("hsncode");
      console.log("chap hsn", this.hsn_id, this.chapter_id);

     }

    toggleMenu() {
      this.menuCtrl.toggle();
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
            console.log("Imp Exp Name data : ", data);
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

    }else{
      this.impexpmob="";
    }

    console.log("Import Export Mob : ", this.impexpmob);
    console.log('leadtype', this.lead_type);
    console.log('category_id', this.category_id);
    console.log('chapter_id', this.chapter_id);
    console.log('hsn_id', this.hsn_id);
    console.log('product_id', this.product_id);
    console.log('all country_id', this.allcountry_id);
    console.log('uom_id', this.uom_id);
    console.log(this.quantity.value);
    console.log(this.edate.value);
    console.log(this.edate.value.year);
    this.Edate = this.edate.value.year+"-"+this.edate.value.month+"-"+this.edate.value.day
    console.log("final Date",this.Edate)
    console.log(this.description.value);
    if(this.lead_type!='' && this.product_id!='' && this.selectedItems!='' && this.quantity.value!='' && this.uom_id!='' && this.edate!='' && this.description.value!=''){
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you agree to send qoute',
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
              'lead_type': this.lead_type,
              'category_id': this.category_id,
              'chapter_id': this.chapter_id,
              'hsncode_id': this.hsncode,
              'product_id': this.product_id,
              'uom_id': this.uom_id,
              'uom':this.uomname,
              'quantity': this.quantity.value,
              'country': this.selectedItems,
              'last_date': this.Edate,
              'description': this.hsndescription,
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
              'port_id':this.port.port,
              'special_instruc':this.si.value,
              'impexpmobile':this.impexpmob
            });
            console.log('json updata', this.totaldata);
            this.navCtrl.push(LeadpreviewPage,{
              'pagedata':this.totaldata,
              'user_id': this.user_id,
              'lead_type': this.lead_type,
              'category_id': this.category_id,
              'chapter_id': this.chapter1_id,
              'hsncode_id': this.hsncode,
              'product_id': this.product_id,
              'uom_id': this.uom_id,
              'uom':this.uomname,
              'quantity': this.quantity.value,
              'country': this.selectedItems,
              'last_date': this.Edate,
              'description': this.hsndescription,
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
              'port_id':this.port.port,
              'special_instruc':this.si.value,
              'impexpmobile':this.impexpmob
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
      { id: 'ExFactory', name: 'Exfactory' },
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
  onItemSelect1(leadtype: any) {
    this.getimpexpname();
    this.lead_type = leadtype;
    console.log(this.lead_type, leadtype, leadtype.name, 'lead type');
    if(this.lead_type.name=="Sell"){
      this.odiv=true;
      this.tdiv=false;
    }
    if(this.lead_type.name=="Buy"){
      this.tdiv=true;
      this.odiv=false;
    }
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
              console.log("Imp Exp Name data : ", data);
              if(data !=0){
                this.txtmsg = "This phone number is associated with Business name ";
                this.impexpname = data;
                console.log("Imp Exp Name value : ", this.impexpname);
                const alert = this.alertCtrl.create({
                  title: 'Business Info',
                  subTitle: "This phone number is associated with Business name "+this.impexpname,
                  buttons: ['OK']
                });
                alert.present(); 

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
    this.http.get(MyApp.url + "getchapters.php?category_id=" + this.category_id).subscribe((data) => {
      this.chapters1 = data;
      console.log(this.chapters1, 'chapters');
    });
    this.selectedchapter = [];
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'id',
      textField: 'chapter_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }
  /* getlevel3(chapters: any) {
    console.log(chapters, 'selecteditem');
    console.log(chapters.id, 'selecteditem');
    this.chapter1_id = chapters.id;
    console.log('cat id', this.chapter_id);
    this.http.get(MyApp.url + "getlevel3.php?chapter_id=" + this.chapter1_id).subscribe((data) => {
      this.level3 = data;
      console.log(this.level3, 'Level3 Data');
    });
    this.selectedlevel3 = [];
    this.dropdownSettings6 = {
      singleSelection: true,
      idField: 'hscode',
      textField: 'english',
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
  */
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
    this.uomname=uom.name;
  }
  shoecountry(country: any) {
    console.log(country, 'selecteduom');
    console.log(country.id, 'selecteduom');
    this.uom_name=country.uom;
    console.log(this.uom_name,'uomname');
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
      console.log('userdata', this.userdetails);
      console.log('user id', this.user_id);
      console.log('mobile', this.mobile);
      console.log('referal_code', this.referal_code);
      console.log('user-county', this.user_country)
      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
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
      this.utype = this.userdata[0].other_check;
      //console.log("Other_check : ", this.utype);
      if(this.utype ==1){
        this.impexpdiv = true;
      }
      this.http.get(MyApp.url+"profile.php?user_id="+this.userid).subscribe((pdata)=>{
        this.userprofile = pdata;
        this.usermobileno =this.userdata[0].mobile;
        //console.log('userprofile data',this.userprofile);
      });
  
      this.http.get(MyApp.url+"getport.php?country_id="+this.country_id).subscribe((portdata)=>{
        this.ports = portdata;
        console.log('port data',this.portdata);
      });

      //console.log("user id=", this.userid);
    });

  console.log('ionViewDidLoad IdontknowhscodePage');

  }

}
