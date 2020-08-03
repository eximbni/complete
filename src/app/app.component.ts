import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { HttpClient } from '@angular/common/http';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { InboxPage } from '../pages/inbox/inbox';
import { NotificationPage } from '../pages/notification/notification';
import { MyLeadsPage } from '../pages/my-leads/my-leads';
import { MypurchaseleadsPage } from '../pages/mypurchaseleads/mypurchaseleads';
import { BuyermapPage } from '../pages/buyermap/buyermap';
import { GalleryPage } from '../pages/gallery/gallery';
import { RequestquotationPage } from '../pages/requestquotation/requestquotation';
import { QuoterequestsPage } from '../pages/quoterequests/quoterequests';
import { DownloadsPage } from '../pages/downloads/downloads';
import { WorkshopsPage } from '../pages/workshops/workshops';
import { WebinarPage } from '../pages/webinar/webinar';
import { BestpracticesPage } from '../pages/bestpractices/bestpractices';
import { ReqFranchisePage } from '../pages/req-franchise/req-franchise';
import { GoogleMapPage } from '../pages/google-map/google-map';
import { UpgradePage } from '../pages/upgrade/upgrade';
import { LogoutPage } from '../pages/logout/logout';
import { FrlistPage } from '../pages/frlist/frlist';
import { FreqlistPage } from '../pages/freqlist/freqlist';
import { FranchiseDashBoardPage } from '../pages/franchise-dash-board/franchise-dash-board';
import { CategoriesPage } from '../pages/categories/categories';
import { SigninPage } from '../pages/signin/signin';
import { MpinPage } from '../pages/mpin/mpin';
import { FrrequestPage } from '../pages/frrequest/frrequest';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public static url = 'https://eximbin.com/api/';
  @ViewChild(Nav) nav: Nav;
  rootPage:any = MpinPage;
  userdb = true;
  franchisebtn=false;
  frdb = false;
  userdata: any;
  username: any;
  isfranchise:any;
  userdetails:any;
  pages: Array<{ title: string, component: any }>;
  fpages: Array<{ title: string, component: any }>;
  user_id: any;
  lastTimeBackPress: number;
  timePeriodToExit: number;
  userprofile:any;
  userid:any;
  userimage:string;
  franchise:any;
  mxe:any=0;
  submenus: Array<{title: string, component: any}>;
  mainmenus: Array<{title: string, component: any}>;
  shownGroup = null;
  keyboardHeight: any;
  platform: any;
  isFranchise: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage: Storage, public menuCtrl: MenuController, public http: HttpClient, public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
      this.mainmenus = [ 
        //main menu-list
   ];
   this.submenus = [ 
       //child menu-list
   ]
   
     
      this.storage.get('userdetails').then((val)=>{
        this.userdata = val;
        console.log('user franchise', this.isfranchise);
        this.http.get(MyApp.url+"profile.php?user_id="+this.userdata[0].id).subscribe((edata)=>{
          this.userprofile = edata;
          console.log("user data", this.userprofile);
        
          this.franchise=this.userprofile[0].isfranchise;
          console.log('franchise',this.franchise);
          if(this.franchise == 1){
            this.franchisebtn = true;
          }else{
            this.franchisebtn = true;
          }
          if(this.userdata[0].user_image== 0){
            this.userimage = "../assets/imgs/user.png";
          }
          else{
            this.userimage = MyApp.url+'uploads/'+this.userdata[0].user_image;
          }
        });
        console.log('name=',this.username);
        console.log(val,'userdata');
      });
      this.menuCtrl.enable(true, "sideMenu");
  
      // used for an example of ngFor and navigation
      this.pages = [
        { title: 'My Profile', component: MyaccountPage },
        { title: 'Inbox', component: InboxPage },
        { title: 'Admin Notifications', component: NotificationPage },
        { title: 'My Postings', component: MyLeadsPage },
        { title: 'My Purchase', component: MypurchaseleadsPage },
        { title: 'Upcoming Features', component: WorkshopsPage },
        { title: 'Buyers', component: BuyermapPage },
        { title: 'Gallery', component: GalleryPage },
        { title: 'RFQ', component: RequestquotationPage },
        { title: 'Downloads', component: DownloadsPage },
        { title: 'Workshops', component: WorkshopsPage },
        { title: 'Webinar Schedule', component: WebinarPage },
        { title: 'Best Practices', component: BestpracticesPage },
        { title: 'Request Franchise', component: ReqFranchisePage, },
        { title: 'Request Status', component: FrrequestPage, },
        { title: 'Show users in Map', component: GoogleMapPage },
        { title: 'Upgrade', component: UpgradePage },
        { title: 'Logout', component: LogoutPage }
        
      ];
      this.fpages = [
        { title: 'Users List', component: FrlistPage },
        { title: 'Request List', component: FreqlistPage },
        { title: 'Logout', component: LogoutPage }
      ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  registerBackButton(){
    this.platform.registerBackButtonAction(() => {
      var stackSize = this.nav.length();
      if(stackSize < 1)
        this.askForPressAgain();
      else
        this.nav.pop();  
    },1);
  
  }
  
  /*ASKING FOR PRESS BACK BUTTON AGAIN*/
  askForPressAgain(){
    let view = this.nav.getActive();
    if (view.component.name == 'CategoriesPage' || view.component.name == 'LoginPage') {
      if ((new Date().getTime() - this.lastTimeBackPress) < this.timePeriodToExit) {
        this.platform.exitApp(); //Exit from app
      } else {
        const toast = this.toastCtrl.create({
          message: 'Press again to go back',
          duration: 3000
        });
        toast.present();
        this.lastTimeBackPress = new Date().getTime();
      }
    }
  }
    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }
    openfrPage(frc) {
    
      this.nav.setRoot(frc.component);
    }
    franchisedb() {
      this.storage.get('userdetails').then((val)=>{
        this.userdata = val;
        this.isfranchise=this.userdata[0].isfranchise;
        console.log('isfranchise=',this.isfranchise);
        console.log(val,'userdata');
      
      if(this.isfranchise==1){
        this.userdb = false;
        this.frdb = true;
        this.nav.push(FranchiseDashBoardPage);
      }else{
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Your not a Franchise! please submit a request for franchise',
          buttons: ['OK']
        });
        alert.present();
        this.nav.push(ReqFranchisePage);
      }
    });
    }
    userdashboard() {
      this.userdb = true;
      this.frdb = false;
      this.nav.push(CategoriesPage);
    }
    profilepg() {
      this.nav.push(MyaccountPage);
    }
    postings(){
      this.nav.push(MyLeadsPage)
    }
    profile(){
      this.nav.push(MyaccountPage)
    }
    purchses(){
      this.nav.push(MypurchaseleadsPage)
    }
    inbox(){
      this.nav.push(InboxPage)
    }
   
    ionViewDidLoad(){
      this.storage.get('userdetails').then((val)=>{
        this.userdata = val;
        this.isFranchise = this.userdata[0].isfranchise;
        console.log(val,'userdata');
      });
      
    }
  }

