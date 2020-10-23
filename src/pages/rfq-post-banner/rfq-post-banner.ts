import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { CategoriesPage } from '../categories/categories';
import { LeadsPage } from '../leads/leads';
import { ChatPage } from '../chat/chat';
import { WebinarPage } from '../webinar/webinar';
import { RfqPage } from '../rfq/rfq';
import { MyApp } from '../../app/app.component';
import { MyaccountPage } from '../myaccount/myaccount';



@Component({
  selector: 'page-rfq-post-banner',
  templateUrl: 'rfq-post-banner.html',
})
export class RfqPostBannerPage {
  @ViewChild("category") category;
  @ViewChild("chapter") chapter;
  @ViewChild("country") country;
   countryname: any; companyname: any;
  sellername: any; product_name: any;
  qty: any;
  unitmeasure: any;
  logindata: any;
  leadid: any;

  dropdownList = [];
  selectedItems = {};
  // selectedItems = [];
  dropdownSettings6 = {};
  ChapterList = [];
  selectedcategory = [];
  selectedcountry = {};

  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  dropdownSettings3 = {};
  dropdownSettings4 = {};
  dropdownSettings5 = {};
  category_id: any;
  selectedchapter = [];
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
  banner_image: any;
  uploaddata: any;
  contactadmin:any=false;
  @ViewChild("subject") subject;
  @ViewChild("message") message;
  feedbackdata: Object;
  messagecount: Object;
  showcount: any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,
    private http: HttpClient, private storage: Storage, public alertCtrl: AlertController,
    private camera: Camera, private transfer: FileTransfer ) { }


    toggleMenu() {
      this.menuCtrl.toggle();
    }
  /* upload document function */

  fileUpload() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.DPhoto = 'data:image/jpeg;base64,' + imageData;
      const fileTransfer: FileTransferObject = this.transfer.create();
      var random = Math.floor(Math.random() * 100);
      this.banner_image = 'banner' + random + '.jpg';
      let options3: FileUploadOptions = {
        fileKey: 'file',
        fileName: this.banner_image,
        headers: {}

      }
      fileTransfer.upload(this.DPhoto, MyApp.url+'uploads.php', options3)
        .then((data) => {
          this.uploaddata=data;
         if(this.uploaddata==1){
          alert("File Uploaded SuccessFully");
         }
        }, (err) => {
          // error
          console.log("error" + JSON.stringify(err));
        });
    });
  }


  gethsnlist(chapters: any) {
   
    this.chapter_id = chapters.id;
    console.log('chapter_id id', this.chapter_id);

  }

  /*send quote */
  rfqsend() {
    console.log('chapter_id', this.chapter_id);
    console.log('category_id', this.category_id);
    console.log('selectedItems  ', this.selectedItems);
    
    if(!this.category_id){
      const alert = this.alertCtrl.create({
        title: 'Notice',
        subTitle: 'Please select category',
        buttons: ['OK']
      });
      alert.present();

    }else{

      if(!this.chapter_id){
          const alert = this.alertCtrl.create({
            title: 'Notice',
            subTitle: 'Please select chapter',
            buttons: ['OK']
          });
          alert.present();
  
      }else{

        if(!this.banner_image){
          const alert = this.alertCtrl.create({
            title: 'Notice',
            subTitle: 'Please select chapter',
            buttons: ['OK']
          });
          alert.present();
  
          }else{


              const confirm = this.alertCtrl.create({
              title: 'Confirm',
              message: 'Do you agree to upload banner',
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

                    var link = MyApp.url+"postbanners.php";
                    var totaldata = JSON.stringify({
                      'posted_by': this.user_id,
                      'category_id': this.category_id,
                      'chapter_id': this.chapter_id,
                      'country': this.selectedItems,
                      'user_country': this.countryname,
                      'banner_image':this.banner_image
                    });
                    console.log('json updata', totaldata);
                    this.http.post(link, totaldata).subscribe((data) => {
                      this.formdata = data;
                      console.log(this.formdata);
                      if(this.formdata==1){
                        const alert = this.alertCtrl.create({
                          title: 'Success',
                          subTitle: 'Banner posted Succesfully',
                          buttons: ['OK']
                        });
                        alert.present();
                      // alert("Banner posted Succesfully our team will getback to you soon");
                        this.navCtrl.push(CategoriesPage);
                      }

                    }); 
                  }

                }
              ]
            });
            confirm.present();

          }
      }
  }

}

  showcontactform(){
    this.contactadmin=true;
  }

  addContact(){
    if(this.subject.vale !='' && this.message.value !=''){
      console.log("subject : ",this.subject.value);
    console.log("message : ",this.message.value);
    
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you agree to send contact to admin',
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
            var link = MyApp.url + "feedback.php";
            var jdata = JSON.stringify({
              user_id: this.user_id,
              subject: this.subject.value,
              message: this.message.value
            });
            console.log(jdata);
             this.http.post(link, jdata).subscribe(data => {
              this.feedbackdata = data;
              console.log("Feed Back Response", this.feedbackdata);
              if (this.feedbackdata == 1) {
                const alert = this.alertCtrl.create({
                  title: "Success",
                  subTitle: "Thank you for your feedback",
                  buttons: ["OK"]
                });
                alert.present();
                this.navCtrl.push(MyaccountPage);
              } else {
                const alert = this.alertCtrl.create({
                  title: "Oops",
                  subTitle: "Somthing went wrong! Please try after sometime",
                  buttons: ["OK"]
                });
                alert.present();
              }
            });
 
this.navCtrl.push(MyaccountPage);

          }
        }  
       ]
    });  
    confirm.present();  
    }  
    else{
      alert("Can't Send Empty Vlaues. Please Enter Message and then submit");
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
    this.navCtrl.push(WebinarPage);
  }
  quotes() {
    this.navCtrl.push(RfqPage);
  }
  Back(){
    this.navCtrl.push(MyaccountPage);
  }

  /*Categories multiselect list*/

  ngOnInit() {
    this.dropdownList = [
      { id: 1, name: 'Sell' },
      { id: 2, name: 'Buy' },
    ];
    this.dropdownSettings6 = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      //selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      // allowSearchFilter: true
      closeDropDownOnSelection: true,
    };


    this.http.get(MyApp.url+"getcountries.php").subscribe((countrydata) => {
      this.countries = countrydata;
      console.log(this.countries, 'countries');
    });
    this.selectedcountry = [];
    console.log(this.selectedcountry, 'all countrie here');
    this.dropdownSettings5 = {
      singleSelection: false,
      idField: 'country_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    this.http.get(MyApp.url+"getcategories.php").subscribe((data) => {
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
      closeDropDownOnSelection: true,
    };
  }
  onSelectAll(items: any, ) {
    console.log(this.selectedItems, 'selected _items total');
    console.log(items, 'selected _items total');
  }
  onSelectAllcountries(countries: any) {

    console.log(countries, 'countries');
    this.allcountry_id = countries;
  }
  onselectcountry(country: any) {
    console.log(country, 'country ');
    this.country_id = country;
  }
  getchapterslist(category: any) {
    console.log(category, 'selecteditem');
    console.log(category.id, 'selecteditem');
    this.category_id = category.id;
    console.log('cat id', this.category_id);
    this.http.get(MyApp.url+"getchapters.php?category_id=" + this.category_id).subscribe((data) => {
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
      closeDropDownOnSelection: true,
    };
  }
 
 
 
  
  shoecountry(country: any) {
    console.log(country, 'selecteduom');
    console.log(country.id, 'selecteduom');
  }
  ionViewDidLoad() {
    this.logindata = this.navParams.get('userdetails');
    this.storage.get('userdetails').then((val) => {
      this.userdetails = val;
      this.user_id = this.userdetails[0].id;
      this.referal_code = this.userdetails[0].referal_code;
      this.mobile = this.userdetails[0].mobile;
      this.countryname = this.userdetails[0].country_id;
      console.log('userdata', this.userdetails);
      console.log('user id', this.user_id);
      console.log('mobile', this.mobile);
      console.log('referal_code', this.referal_code);

      this.http.get(MyApp.url+"getunreadmessagecount.php?user_id="+this.user_id).subscribe((count)=>{
        this.messagecount=count;
        this.showcount = this.messagecount[0].unreadMsgs;
        console.log('Message Count:', this.messagecount);
      })
    });

    console.log('ionViewDidLoad RfqPage');
    
    this.storage.get("user_id").then((val) => {
      this.userid = val;
      console.log("user id=", this.userid);
    });


  }


}
