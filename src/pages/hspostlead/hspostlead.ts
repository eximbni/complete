import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  MenuController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { ChatPage } from "../chat/chat";
import { CategoriesPage } from "../categories/categories";
import { LeadsPage } from "../leads/leads"; 
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { OtppostPage } from "../otppost/otppost";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { MyApp } from "../../app/app.component";
import { HssearchPage } from "../hssearch/hssearch";
import { RfqPage } from "../rfq/rfq";
import { VideologinPage } from "../videologin/videologin";


@Component({
  selector: "page-hspostlead",
  templateUrl: "hspostlead.html"
})
export class HspostleadPage {
  @ViewChild("uom") uom;
  @ViewChild("quantity") quantity;
  @ViewChild("country") country;
  @ViewChild("state") state;
  @ViewChild("edate") edate;
  @ViewChild("description") description;
  @ViewChild("chap") chap;
  countryname: any;
  companyname: any;
  sellername: any;
  product_name: any;
  qty: any;
  unitmeasure: any;
  logindata: any;
  leadid: any;

  dropdownList = [];
  selectedItems = {};
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
  userprofile: any;
  usermobileno: any;
  Doc1: any;
  Doc2: any;
  Doc3: any;
  Doc4: any;
  Document1: any;
  Document2: any;
  Document3: any;
  Document4: any;
  hsndescription: any;
  hsncode: any;
  Edate: string;
  cslot: Date;
  messagecount: Object;
  showcount: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private storage: Storage,
    public alertCtrl: AlertController,
    private camera: Camera,
    private transfer: FileTransfer,
    public menuCtrl: MenuController
  ) {
    this.chapter_id = navParams.get("chapter_id");
    this.hsndescription = navParams.get("hsndescription");
    this.hsncode = navParams.get("hsncode");
    console.log("chap hsn", this.hsn_id, this.chapter_id);
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  /* upload document function */

  doc1() {
    const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.Doc1 = "data:image/jpeg;base64," + imageData;
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      this.Document1 = "Doc1" + random;
      let options3: FileUploadOptions = {
        fileKey: "file",
        fileName: this.Document1,
        headers: {}
      };

      fileTransfer.upload(this.Doc1, MyApp.url + "uploads.php", options3).then(
        data => {
          console.log(data);
          // success
          alert("succes upload");
        },
        err => {
          // error
          console.log("error" + JSON.stringify(err));
        }
      );
    });
  }
  /* upload1 end */
  //doc2 upload starts
  doc2() {
    const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.Doc2 = "data:image/jpeg;base64," + imageData;
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      this.Document2 = "Doc2" + random + ".jpg";
      let options3: FileUploadOptions = {
        fileKey: "file",
        fileName: this.Document2,
        headers: {}
      };

      fileTransfer.upload(this.Doc2, MyApp.url + "uploads.php", options3).then(
        data => {
          console.log(data);
          // success
          alert("succes upload");
        },
        err => {
          // error
          console.log("error" + JSON.stringify(err));
        }
      );
    });
  }
  //Doc2 ends
  //doc3 start
  doc3() {
    const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.Doc3 = "data:image/jpeg;base64," + imageData;
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      this.Document3 = "Doc3" + random + ".jpg";
      let options3: FileUploadOptions = {
        fileKey: "file",
        fileName: this.Document3,
        headers: {}
      };

      fileTransfer.upload(this.Doc3, MyApp.url + "uploads.php", options3).then(
        data => {
          console.log(data);
          // success
          alert("succes upload");
        },
        err => {
          // error
          console.log("error" + JSON.stringify(err));
        }
      );
    });
  }
  //doc3 ends
  //doc4 start
  doc4() {
    const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.Doc4 = "data:image/jpeg;base64," + imageData;
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      this.Document4 = "Doc4" + random + ".jpg";
      let options3: FileUploadOptions = {
        fileKey: "file",
        fileName: this.Document4,
        headers: {}
      };

      fileTransfer.upload(this.Doc4, MyApp.url + "uploads.php", options3).then(
        data => {
          console.log(data);
          // success
          alert("succes upload");
        },
        err => {
          // error
          console.log("error" + JSON.stringify(err));
        }
      );
    });
  }
  //doc4 ends

  /*send quote */
  rfqsend() {
    console.log("leadtype", this.lead_type);
    console.log("category_id", this.category_id);
    console.log("chapter_id", this.chapter_id);
    console.log("hsn_id", this.hsn_id);
    console.log("all country_id", this.allcountry_id);
    console.log("uom_id", this.uom_id);
    console.log(this.quantity.value);
    console.log(this.edate.value);
    this.Edate =
      this.edate.value.year +
      "-" +
      this.edate.value.month +
      "-" +
      this.edate.value.day;
    console.log(this.description.value);
    if (
      this.lead_type != "" &&
      this.selectedItems != "" &&
      this.quantity.value != "" &&
      this.uom_id != "" &&
      this.edate != "" &&
      this.description.value != ""
    ) {
      const confirm = this.alertCtrl.create({
        title: "Confirm",
        message: "Do you agree to send qoute",
        cssClass: "buttoncss",
        buttons: [
          {
            text: "Disagree",
            handler: () => {
              console.log("Disagree clicked");
            }
          },
          {
            text: "Agree",
            handler: () => {
              console.log("Agree clicked");

              var link = MyApp.url + "postleads.php";
              var totaldata = JSON.stringify({
                user_id: this.user_id,
                lead_type: this.lead_type,
                chapter_id: this.chap.value,
                hsncode_id: this.hsncode,
                uom_id: this.uom_id,
                quantity: this.quantity.value,
                country: this.selectedItems,
                last_date: this.Edate,
                description: this.description.value,
                user_country: this.user_country,
                mobile: this.usermobileno
              });
              console.log("json updata", totaldata);
              console.log("user country", this.user_country);
               this.http.post(link, totaldata).subscribe(data => {
                this.formdata = data;
                console.log(this.formdata);
                this.navCtrl.push(OtppostPage, {
                  leadref_id: this.formdata
                });
              });
            }
          }
        ]
      });
      confirm.present();
    } else {
      const alert = this.alertCtrl.create({
        title: "Notice",
        subTitle: "* Fields are mandatory",
        buttons: ["OK"]
      });
     // alert.present();
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
      { id: "Sell", name: "Sell" },
      { id: "Buy", name: "Buy" }
    ];
    this.dropdownSettings6 = {
      singleSelection: true,
      idField: "id",
      textField: "name",
      //selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.http.get(MyApp.url + "getcountries.php").subscribe(countrydata => {
      this.countries = countrydata;
      console.log(this.countries, "countries");
    });
    this.selectedcountry = [];
    console.log(this.selectedcountry, "all countrie here");
    this.dropdownSettings5 = {
      singleSelection: false,
      idField: "country_id",
      textField: "name",
      // selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.http.get(MyApp.url + "getcategories.php").subscribe(data => {
      this.categories = data;
      console.log(this.categories, "categories");
    });
    this.selectedItems = {};
    console.log(this.selectedItems, "selected list");
    this.dropdownSettings = {
      singleSelection: true,
      idField: "id",
      textField: "category_name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }
  onSelectAll(items: any) {
    console.log(this.selectedItems, "selected _items total");
    console.log(items, "selected _items total");
  }
  onSelectAllcountries(countries: any) {
    console.log(countries, "countries");
    this.allcountry_id = countries;
  }
  onselectcountry(country: any) {
    console.log(country, "country ");
    this.country_id = country;
  }
  onItemSelect1(leadtype: any) {
    this.lead_type = leadtype;
    console.log(this.lead_type, leadtype, leadtype.name, "lead type");
  }
  /*
getchapterslist(category: any) {
  console.log(category, 'selecteditem');
  console.log(category.id, 'selecteditem');
  this.category_id = category.id;
  console.log('cat id', this.category_id);
  this.http.get(MyApp.url + "getchapters.php?category_id=" + this.category_id).subscribe((data) => {
    this.chapters = data;
    console.log(this.chapters, 'chapters');
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
gethsnlist(chapter: any) {
  console.log(chapter, 'selectedchapter');
  console.log(chapter.id, 'selectedchapter');
  this.chapter_id = chapter.id;
  console.log('cat id', this.chapter_id);
  this.http.get(MyApp.url + "gethsncodes.php?chapter_id=" + this.chapter_id).subscribe((data) => {
    this.hsdetails = data;
    console.log(this.hsdetails, 'hsncodes');
  });
  this.selectedhsncodes = [];
  this.dropdownSettings2 = {
    singleSelection: true,
    idField: 'id',
    textField: 'hsncode',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

}

productlist(hscode: any) {
  console.log(hscode, 'selectedhscode');
  console.log(hscode.id, 'selectedhscode');
  this.hsn_id = hscode.id;
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
}*/
  getuoms(prodct: any) {
    console.log(prodct, "selectedhscode");
    console.log(prodct.id, "selectedhscode");
    this.product_id = prodct.id;
  }
  showuom(uom: any) {
    console.log(uom, "selecteduom");
    console.log(uom.id, "selecteduom");
    this.uom_id = uom.id;
  }
  shoecountry(country: any) {
    console.log(country, "selecteduom");
    console.log(country.id, "selecteduom");
  }

  getsearch() {
    this.navCtrl.push(HssearchPage);
  }
  ionViewDidLoad() {
    this.cslot = new Date();
    this.logindata = this.navParams.get("userdetails");
    this.storage.get("userdetails").then(val => {
      this.userdetails = val;
      this.user_id = this.userdetails[0].id;
      this.referal_code = this.userdetails[0].referal_code;
      this.mobile = this.userdetails[0].mobile;
      this.user_country = this.userdetails[0].country_id;
      console.log("userdata", this.userdetails);
      console.log("user id", this.user_id);
      console.log("mobile", this.mobile);
      console.log("referal_code", this.referal_code);

      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
    });

    console.log("ionViewDidLoad RfqPage");
    this.http.get(MyApp.url + "getuoms.php").subscribe(uomdata => {
      this.uoms = uomdata;
      console.log(this.uoms, "uoms");
      this.selecteduom = [];
      this.dropdownSettings4 = {
        singleSelection: true,
        idField: "id",
        textField: "uom",
        selectAllText: "Select All",
        unSelectAllText: "UnSelect All",
        allowSearchFilter: true,
        closeDropDownOnSelection: true
      };
    });

    this.storage.get("user_id").then(val => {
      this.userid = val;
      this.http
        .get(MyApp.url + "profile.php?user_id=" + this.userid)
        .subscribe(pdata => {
          this.userprofile = pdata;
          this.usermobileno = this.userprofile[0].mobile;
          console.log("userprofile data", this.userprofile);
        });
      console.log("user id=", this.userid);
    });
  }
}
