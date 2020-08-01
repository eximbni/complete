import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SigninPage } from '../signin/signin';
import { OtpPage } from '../otp/otp';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from '../../app/app.component';
import { Device } from '@ionic-native/device';
//import { Plugins } from "@capacitor/core";
//const { PushNotifications } = Plugins;
/* import { FCM } from "capacitor-fcm";
const fcm = new FCM(); */
import { TermsconditionsPage } from '../termsconditions/termsconditions';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
@ViewChild("fullname") fullname;
@ViewChild("pwd") pwd;
@ViewChild("cpwd") cpwd;
@ViewChild("mobile") mobile;
@ViewChild("email") email;
@ViewChild("address") address;
@ViewChild("company") company;
@ViewChild("country") country;
@ViewChild("state") state;
@ViewChild("zipcode") zipcode;
@ViewChild("sponcerid") sponcerid;
@ViewChild("from_time") from_time;
@ViewChild("to_time") to_time;
@ViewChild("licenseno") licenseno;
ChapterList = [];
HscodesList=[];
selectedItems = [];
selectedstate = [];
selectedusertype = [];
selectedothertype=[];
selectedusertypelist:{};
selectedporttype = [];
selectedporttypelist = {};
selectedsalutations = [];
selectedsalutationslist:{};
dropdownSettings = {};
dropdownSettings1 = {};
dropdownSettings3 = {};
dropdownSettings4 = {};
dropdownSettings2 = {};
  countries: any;
  showpassword: boolean;
  stateid: any;
  states: any;
  signupdata:any;
  userid:any;exist:any;
  alertController: any;
  name:string;
  emailid:any;
  country_id:any;
  chkemailid:any;
  state_id:any;
  mobilecode:any;
  long :any;
  lat:any;
  countrycode:any;
  countrycode1:any;
  phonecode:any;
  usertype :any;
  porttype : any;
  salutation :any;
  deviceid:any;
  facebook: boolean;
@ViewChild("selother") selother;
otherinput:any=false;
fbinput:any=false;
@ViewChild("fblink") fblink;
twitter:boolean;
twinput:any=false;
@ViewChild("twlink") twlink;
linkdin:boolean;
liinput:any=false;
@ViewChild("lilink") lilink;
whatsapp:boolean;
whinput:any=false;
@ViewChild("whlink") whlink;
vchat:boolean;
vcinput:any=false;
@ViewChild("vclink") vclink;
skype:boolean;
skinput:any=false;
@ViewChild("sklink") sklink;
strinput:any=false;
expinput:any=false;
iec: boolean;
iecinput:any=false;
@ViewChild("ieccode") ieccode;
gst: boolean;
gstinput:any=false;
@ViewChild("gstno") gstno;
other: boolean;
otinput:any=false;
@ViewChild("otherspecify") otherspecify;
@ViewChild("otherno") otherno;
experience: boolean;
exinput:any=false;
@ViewChild("expyears") expyears;
starexporter: boolean;
stinput:any=false;
@ViewChild("stars") stars;
subscriben: boolean;
termscondition: boolean;
tcinput:any=false;
@ViewChild("termsc") termsc;
othertaxna: boolean;
isTaxnotpplicable : number;

fna:boolean=false;
lina:boolean=false;
twna:boolean=false;
whna:boolean=false;
vcna:boolean=false;
skna:boolean=false;
iecna:boolean=false;
gstna:boolean=false;
othna:boolean=false;
expna:boolean=false;
stana:boolean=false;
starclass=[];
notax: boolean;
salutationfullname: any;
issubscribtion: number;
cnfpass:any;
  cnfpass1: string;
  platform: string;
  manufacturer: string;
  model: string;
  version: string;
  serialno: string;
  fromtime: any;
  toTime:any;
  mobileno: any;
  referralcode: any;
  start: any;
  startaddress: any;
  myaddress: any;
  countryname: any;
  country_name: any;
  results : any;
  ports: Object;
  selectedport_codes = {};
  dropdownSettings10 = {};
  port: object;
  port_codes: object;
  othertype: any;
  other_type: any;
  SelctedPorts: any;
  internaational :any=false;
  getport_country_id: any;



  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams,
    private http:HttpClient, public alertCtrl: AlertController, private device:Device,
     private storage:Storage,  private geolocation: Geolocation , public loadingCtrl: LoadingController) {
      this.menuCtrl.enable(false, "sideMenu");

  }
 
  toggleMenu() {
    this.menuCtrl.toggle();
  }


chkemail(){
this.emailid=this.email.value;
}

getreferral(){
  this.mobileno= this.countrycode+this.mobile.value;
  //console.log("Entered Mobile Number :", this.mobileno);
  this.http.get(MyApp.url+"getreferral.php?mobile="+this.mobileno).subscribe((data)=>{
    this.referralcode = data;
    //console.log('referral code data =',data); 
    if(data !=0){
      this.sponcerid.value = this.referralcode; 
      //console.log('referral code=',this.referralcode);
    }
    //console.log('else referral code=',this.sponcerid.value); 
  });


}


str(){
  this.strinput=true
}
ntr(){
  this.strinput=false;
}
exp(){
  this.expinput=true;
}
nxp(){
  this.expinput=false;
}
terms(){
  this.navCtrl.push(TermsconditionsPage);
}

deals(){
  console.log('internaational state:', this.internaational);
  if(this.internaational==false){
    this.internaational=true;
    this.getport_country_id = '';
    this.getports();
  }
  else{
    this.getport_country_id = this.country_id;
    this.internaational=false;
    this.getports();
  }
  console.log('internaational state:', this.internaational);
}

fb(){
  console.log('CFacebook new state:', this.facebook);
  if(this.facebook==true){
    this.fna=false;
    this.fbinput=true;
  }
  else{
    this.fbinput=false;
    this.fblink.value="none";
  }
}
fbna(){
  console.log('Facebook NA', this.fna);
  if(this.fna==true){
    this.facebook=false;
    this.fblink.value="none";
    this.fb();
    
  }
}
li(){
  console.log('Linkdin new state:', this.linkdin);
  if(this.linkdin==true){
    this.lina=false;
    this.liinput=true;
  }
  else{
    this.liinput=false;
    this.lilink.value="none";
  }
}
lna(){
  console.log('Linked in NA', this.lina);
  if(this.lina==true){
    this.linkdin=false;
    this.lilink.value="none";
    this.li();
    
  }
}

tw(){
  console.log('Twitter new state:', this.twitter);
  if(this.twitter==true){
    this.twna=false;
    this.twinput=true;
  }
  else{
    this.twinput=false;
    this.twlink.value="none";
  }
}
tna(){
  console.log('Facebook NA', this.twna);
  if(this.twna==true){
    this.twitter=false;
    this.twlink.value="none";
    this.tw();
  }
}

wh(){
  console.log('whatsapp new state:', this.whatsapp);
  if(this.whatsapp==true){
    this.whna=false;
    this.whinput=true;
  }
  else{
    this.whinput=false;
    this.whlink.value="none";
  }
}
wna(){
  console.log('Facebook NA', this.whna);
  if(this.whna==true){
    this.whatsapp=false;
    this.whlink.value="none";
    this.wh();
  }
}

vc(){
  console.log('Vchat new state:', this.vchat);
  if(this.vchat==true){
    this.vcna=false;
    this.vcinput=true;
  }
  else{
    this.vcinput=false;
    this.vclink.value="none";
  }
}
vna(){
  console.log('Facebook NA', this.vcna);
  if(this.vcna==true){
    this.vchat=false;
    this.vclink.value="none";
    this.vc();
  }
}

sk(){
  console.log('CFacebook new state:', this.skype);
  if(this.skype==true){
    this.skna=false;
    this.skinput=true;
  }
  else{
    this.skinput=false;
    this.sklink.value="none";
  }
}
sna(){
  console.log('Facebook NA', this.skna);
  if(this.skna==true){
    this.skype=false;
    this.sklink.value="none";
    this.sk();
  //check now done sir
  }
}

ie(){
  
  if(this.iec==true){
    this.iecna=false;
    this.iecinput=true;
  }
  else{
    this.iecinput=false;
    this.ieccode.value="none";
  }
}
iena(){
  console.log('Facebook NA', this.iecna);
  if(this.iecna==true){
    this.iec=false;
    this.ieccode.value="none";
    this.ie();
  }
}

gs(){
  
  if(this.gst==true){
    this.gstna=false;
    this.gstinput=true;
  }
  else{
    this.gstinput=false;
    this.gstno.value="none";
  }
}
gsna(){
  console.log('Facebook NA', this.gstna);
  if(this.gstna==true){
    this.gst=false;
    this.gstno.value="none";
    this.gs();
  }
}

ot(){
  
  if(this.other==true){
    this.othna=false;
    this.otinput=true;
  }
  else{
    this.otinput=false;
    this.otherno.value="none";
    this.otherspecify.value="none";
  }
}
otna(){
  console.log('Facebook NA', this.othna);
  if(this.othna==true){
    this.other=false;
    this.otherno.value="none";
    this.otherspecify.value="none";
    this.ot();
  }
}

ex(){
  //console.log('CFacebook new state:', this.skype);
  if(this.experience==true){
    this.expna=false;
    this.exinput=true;
  }
  else{
    this.exinput=false;
    this.expyears.value="none";
  }
}
exna(){
  console.log('Facebook NA', this.expna);
  if(this.expna==true){
    this.experience=false;
    this.expyears.value="none";
    this.ex();
  }
}

st(){
  console.log('Cstars:', this.starexporter);
  if(this.starexporter==true){
    this.stana=false;
    this.stinput=true;
  }
  else{
    this.stinput=false;
    this.stars.value="none";
   for (let index = 1; index < 6; index++) {
         this.starclass[index] = "";
    }

  }
  
}
stna(){
  console.log('Stars NA', this.stana);
  if(this.stana==true){
    this.starexporter=false;
    this.stars.value="none";
    this.st();
  }
}

addRating(ids){
  this.stars.value= ids;
  
  for (let index = 1; index < 6; index++) {
    if(index == ids){
      this.starclass[index] = "highlight";
      this.stars.value=ids;
    }else{
      this.starclass[index] = "";
    }
    
  }
  console.log("Selected Star : ", this.stars.value);
}

othertna(){
  if(this.othertaxna ==true){
    this.isTaxnotpplicable = 1;
  }else{
    this.isTaxnotpplicable = 0;
  }
}


snews(){
  if(this.subscriben ==true){
   this.issubscribtion = 1;
  }else{
    this.issubscribtion = 0;
  }
}

tc(){
  console.log('Terms condition state:', this.termscondition);
  if(this.termscondition==true){
    this.tcinput=true;
  }
  else{
    this.tcinput=false;
  }
}


    showpwd(){
      this.showpassword = !this.showpassword;
    }
    signup(i){

      if(this.usertype !='Other'){
        this.other_type="0";
        this.porttype ="null";
        this.licenseno ="null";
        this.selectedport_codes =['null'];
      }



      if(!this.SelctedPorts && this.usertype=='Other'){
          const alert = this.alertCtrl.create({
            title: 'Notice!',
            subTitle: 'Please Select Ports',
            buttons: ['OK'],
            cssClass: 'buttoncss'
          });
          alert.present();
          return false;
      }
      console.log('country_id : ',this.country_id);
      console.log("state_id : ",this.state_id);

      console.log('usertype : ',this.usertype);
      console.log("selother : ",this.other_type);
      console.log('porttype : ',this.porttype);
      console.log("ports : ",this.ports);
      console.log("port : ",this.port);
      console.log("port_code : ",this.port_codes);
      console.log("selectedPort : ",this.selectedport_codes);

      console.log('licenseno : ',this.licenseno.value); 


      console.log("Salutation : ",this.salutation);
      console.log("Fullname : ",this.fullname.value);
      this.salutationfullname = this.salutation.id+this.fullname.value;
      console.log("Salutation Fullname : ",this.salutationfullname);
      console.log(this.pwd.value);
      console.log("countrycode : ",this.countrycode);
      this.mobilecode = this.countrycode+this.mobile.value;
      console.log('mobilecode',this.mobilecode);
      console.log("mobile : ",this.mobile.value);
      console.log("email : ",this.email.value);
      console.log("company : ",this.company.value);
      console.log("address : ",this.address.value);
      console.log("zipcode : ",this.zipcode.value);
      
    /* if(this.fbinput==false && this.fna==false){
      alert("Please select atleast one option for Facebook");
      return false;
    }else{
      if(!this.fblink.value){
        alert("Please enter facebook link");
        return false;
      }
    }

    if(this.liinput==false && this.lina==false){
      alert("Please select atleast one option for Linkedin");
      return false;
    }else{
      if(!this.lilink.value){
        alert("Please enter linkedin link");
        return false;
      }
    }

    if(this.twinput==false && this.twna==false){
      alert("Please select atleast one option for twitter");
      return false;
    }else{
      if(!this.twlink.value){
        alert("Please enter twitter link");
        return false;
      }
    }

    if(this.whinput==false && this.whna==false){
      alert("Please select atleast one option for Whataspp");
      return false;
    }else{
      if(!this.whlink.value){
        alert("Please enter Whataspp number");
        return false;
      }
    }

    if(this.vcinput==false && this.vcna==false){
      alert("Please select atleast one option for Wechat");
      return false;
    }else{
      if(!this.vclink.value){
        alert("Please enter Wechat number");
        return false;
      }
    }

    if(this.skinput==false && this.skna==false){
      alert("Please select atleast one option for Skype");
      return false;
    }else{
      if(!this.sklink.value){
        alert("Please enter Skype Id");
        return false;
      }
    }

    if(this.iecinput==false && this.iecna==false){
      alert("Please select atleast one option for IEC");
      return false;
    }else{
      if(!this.ieccode.value){
        alert("Please enter IEC Id");
        return false;
      }
    }

    if(this.gstinput==false && this.gstna==false){
      alert("Please select atleast one option for GST");
      return false;
    }else{
      if(!this.gstno.value){
        alert("Please enter GST Id");
        return false;
      }
    }

    if(this.otinput==false && this.othna==false){
      alert("Please select atleast one option for Other");
      return false;
    }else{      
      if(!this.otherspecify.value){
        alert("Please enter Other Specify");
        return false;
      }else if(!this.otherno.value){
        alert("Please enter Your Local Tax Number");
        return false;
      }

    } */

    if(this.exinput==false && this.expna==false){
      alert("Please select atleast one option for I have experience");
      return false;
    }else{
      if(!this.expyears.value){
        alert("Please enter I have experience");
        return false;
      }
    }
       

    if(this.stinput==false && this.stana==false){
      alert("Please select atleast one option for Stars");
      return false;
    }else{
      if(!this.stars.value){
        alert("Please enter number of Stars");
        return false;
      }
      console.log("Selected Stars ",this.stars.value);
    }
    
    if(this.tcinput==false){
      console.log("Selected Stars ",this.stars.value);
      alert("Please Confirm that You agree to our T&C");
      return false;
    }
    const loader = this.loadingCtrl.create({
      content: "Data Submitting, Please wait...",
    });

    loader.present();
      //console.log(this.countries[i].phonenum);
      //if(this.facebook==true)
      var link=MyApp.url+"signup.php";
      var mydata=JSON.stringify({
        'fullname':this.salutationfullname,
        'password':this.pwd.value,
        'mobile':this.mobile.value,
        'email':this.email.value,
        'company':this.company.value,
        'country':this.country_id,
        'country_code':this.countrycode,
        'state':this.state_id,
        'address':this.address.value,
        'zipcode':this.zipcode.value,
        'sponcerid':this.sponcerid.value,
        'user_type': this.usertype,
        'lat':this.lat,
        'long':this.long,
        'device_id':this.deviceid,
        'facebook':"none",
        'linkdin':"none",
        'twitter':"none",
        'whatapp':"none",
        'vchat':"none",
        'skype':"none",
        'ieccode':"none",
        'gstno':"none",
        'otherno':"none",
        'expyears':this.expyears.value,
        'stars':this.stars.value,
        'issubscribtion' : "none",
        'other_tax': "none",
        'isTaxnotpplicable':"none",
        'platform':this.platform,
        'manufacturer':this.manufacturer,
        'model':this.model,
        'version':this.version,
        'serialno':this.serialno,
        'from_time':"09:00",
        'to_time': "17:00",
        'othertpe' : this.other_type,
        'porttype' : this.selectedporttype,
        'port_codes' : this.SelctedPorts,
        'license_no' : this.licenseno.value

      });
      console.log("Signup data : ",mydata);

      this.http.post(link,mydata).subscribe((data)=>{
        this.signupdata = data;
       
        console.log('signupdata',data);
        this.storage.set('userdetails',this.signupdata);
        if(this.signupdata == 3 ){
          loader.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'This login email already exists. Please try a different email address to register',
            buttons: ['OK'],
            cssClass: 'buttoncss'
          });
          alert.present();
           
        }
        else{
          if(this.signupdata ==2){
            loader.dismiss();
            const alert = this.alertCtrl.create({
              title: 'Oops!',
              subTitle: 'This mobile number already exists. Please try a different number to register',
              buttons: ['OK'],
              cssClass: 'buttoncss'
            });
            alert.present();
             
          }
          else{
            if(this.signupdata==0){
              loader.dismiss();
            const alert = this.alertCtrl.create({
              title: 'Oops!',
              subTitle: 'There seems to be problem with Registration. please fill all fields and try again',
              buttons: ['OK'],
              cssClass: 'buttoncss'
            });
            alert.present();
            }
            else{
              loader.dismiss();
              this.storage.set('userdetails',this.signupdata);
              this.navCtrl.push(OtpPage ,{
              'number': this.mobilecode,
              'user_id':this.signupdata[0].id,
              'country_id':this.country_id,
              'state_id':this.state_id,
              'Mobile':this.mobile.value,
              'Country_code':this.countrycode
            });
            }
            
          }    
        }
      });

    }
  
    signin(){
      this.navCtrl.push(SigninPage);
    }
    
  //Countries multiselect list
ngOnInit() {
  this.selectedusertypelist = [
    { id: 'Seller', name: 'Seller' },
    { id: 'Buyer', name: 'Buyer' },
    { id: 'Both', name: 'Both' },
    { id: 'Other', name: 'Other' }
  ];

  this.selectedporttypelist = [
    { id: 'air', name: 'Air' },
    { id: 'sea', name: 'Sea' },
    { id: 'land', name: 'Land' },
    { id: 'others', name: 'Others' }  
  ];
  this.selectedporttype=[];

  this.dropdownSettings3= {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: true,
    //closeDropDownOnSelection: true,
  };


  this.selectedsalutationslist = [
    { id: 'Mr.', name: 'Mr.' },
    { id: 'Mrs.', name: 'Mrs.' },
    { id: 'Miss', name: 'Miss' },
    { id: 'M/S.', name: 'M/S.' }
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


  this.http.get(MyApp.url+"getcountries.php").subscribe((data)=>{
  this.countries = data;
    console.log( this.countries,'chapters');
  });
 this.selectedItems = [];
  this.dropdownSettings = {
    singleSelection: true,
    idField: 'country_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection:true
  };

  this.http.get(MyApp.url+"getusertypes.php").subscribe((data)=>{
    this.othertype = data;
      console.log( this.othertype,'other type list');
    });
   this.selectedothertype = [];
    this.dropdownSettings4 = {
      singleSelection: true,
      idField: 'id',
      textField: 'othername',
     // selectAllText: 'Select All',
    //  unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection:true
    };

 
}
onItemSelect(ptype : any){
  //this.selectedporttype = ptype.name;
  console.log('usertype=',  ptype);
  console.log(this.selectedporttype,"selcted types");
  console.log('usertype id=', this.selectedporttype);
  console.log("usertype total : ",this.getport_country_id);
  this.getports();
}

getports(){
  const loader = this.loadingCtrl.create({
    content: "Please wait...",
  });
  this.SelctedPorts ='';
  var link = MyApp.url+"getport_porttype.php";
  var MyportData = JSON.stringify({
    'country_id':this.getport_country_id,
    'port_type':this.selectedporttype
  });
  console.log("getports json : ",MyportData);
  this.http.post(link,MyportData)
  .subscribe(portdata=>{
    this.ports = portdata;
    loader.dismiss();  
    console.log(this.ports);
    this.selectedport_codes = [];
    //console.log(this.selectedport_codes, 'all ports here');
    this.dropdownSettings10 = {
    singleSelection: false,
    idField: 'port_code',
    textField: 'port',
  // selectAllText: 'Select All',
    //unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };
});


}


onSelectAllporttype(items :any) {
  console.log("selected All items : ", items);
  console.log("selected all port type  total : ",this.selectedporttype);
/*   this.port_codes= selectedports;
  console.log('port_code name',this.port_codes); */
}



onSelectAll(items :any) {
  console.log("selected All items total : ", items);
  console.log("Port _items total : ",this.selectedport_codes[items]);
/*   this.port_codes= selectedports;
  console.log('port_code name',this.port_codes); */
}

onselectport(items: any) {
  this.port = items;
 this.SelctedPorts= this.selectedport_codes;
 console.log(this.SelctedPorts, "Selected Ports");
}



getusertype(utype){
  this.usertype = utype.id;
  console.log('usertype=',utype.id);
  if(this.usertype == 'Other'){
    //this.otherinput =true;
    alert("This Option is not Enabled in the System For Faster Approval Please Chose any other Option");
  this.selectedothertype = [];

  }else{
    this.otherinput =false;
  }
}

getothertype(otype){
  console.log('othertype=',otype);
  this.other_type = otype.id;
 
}

getsalutation(stype){
  this.salutation = stype;
console.log('salutation=',stype);
}



checkpass(){

  if(this.pwd.value === this.cpwd.value){
    //console.log("Password Matched ");
    this.cnfpass = "Password and confirm Passwords are matching";
    this.cnfpass1 = "";
  }
  else{
    //console.log("Password Not Matched");
    this.cnfpass = "";
    this.cnfpass1 = "Password and confirm passwords are not matching. ";
  }
  
}

getstates(country: any) {
  console.log(country,'slectedcountry');
  this.country_id = country.country_id;
  this.country_name = country.name;
  this.getport_country_id = this.country_id;
  if(this.country_name != this.countryname){
    const confirm = this.alertCtrl.create({
      title: "Oops..!",
      message: 'Your current location and selected country is not matching. Would you still like to proceed ? ',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            this.selectedItems = [];
            this.states = [];
          }
        },
        {
          text: 'Agree',
        }
      ]
    });
    confirm.present();   

  }

  this.http.get(MyApp.url+"phonecode.php?country_id="+this.country_id).subscribe((phonecodedata)=>{
    this.phonecode = phonecodedata;
    this.countrycode=this.phonecode[0].phonecode;
    this.countrycode1="+"+this.phonecode[0].phonecode;
    console.log('country phone code=',this.phonecode);
    console.log('country phone code=',this.countrycode);
  });
  this.http.get(MyApp.url+"getstates.php?country_id="+this.country_id).subscribe((data)=>{
    this.states = data;
    console.log('states',this.states);
    this.selectedstate = [];
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'zone_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection:true
    };
  });

}



onselectstate(state: any) {
  console.log(state,'states');
 
  this.state_id = state.zone_id;
  console.log(this.state_id,'stateid');
}
ionViewDidLoad(){
  this.platform =this.device.platform;
  this.manufacturer =this.device.manufacturer;
  this.model =this.device.model;
  this.version=this.device.version;
  this.serialno=this.device.uuid
  this.geolocation.getCurrentPosition().then((resp) => {
    this.lat= resp.coords.latitude
     this.long = resp.coords.longitude

    this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.lat+","+this.long+"&result_type=country&key=AIzaSyCPuQadZpFuDF9KOWFrlthnPRdRJb-QlrI").subscribe((data)=>{
      this.start=data;
      console.log("Location :", this.start);
      this.countryname=this.start.results[0].formatted_address;
      console.log("My Current Country", this.countryname); 
    });   

     //console.log("Geolocation details : ", resp);
   }).catch((error) => {
     //console.log('Error getting location', error);
   });
  /* fcm
   .getToken()
   .then((r) =>{
     this.deviceid=r.token})
   .catch(err => console.log(err)); */

 }


}