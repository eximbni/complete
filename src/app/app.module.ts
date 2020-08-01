import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileTransfer } from '@ionic-native/file-transfer';
import { NgOtpInputModule } from  'ng-otp-input';
import { IonicStorageModule } from '@ionic/storage';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NativeStorage } from '@ionic-native/native-storage';
//

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule,   } from '@angular/common/http';
import { CategoriesPage } from '../pages/categories/categories';
import { ChaptersPage } from '../pages/chapters/chapters';
import { HsCodesPage } from '../pages/hs-codes/hs-codes';
import { GoogleMapPage } from '../pages/google-map/google-map';
import { ChatPage } from '../pages/chat/chat';
import { GalleryPage } from '../pages/gallery/gallery';
import { ForgrtPwdPage } from '../pages/forgrt-pwd/forgrt-pwd';
import { LeadsPage } from '../pages/leads/leads';
import { LeadDetailsPage } from '../pages/lead-details/lead-details';
import { ProfilePage } from '../pages/profile/profile';
import { SellerPage } from '../pages/seller/seller';
import { BuyerPage } from '../pages/buyer/buyer';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { SplashPage } from '../pages/splash/splash';
import { RfqPage } from '../pages/rfq/rfq';
import { SendquotePage } from '../pages/sendquote/sendquote';
import { WebinarPage } from '../pages/webinar/webinar';
import { RfqPostBannerPage } from '../pages/rfq-post-banner/rfq-post-banner';
import { MyaccountPage } from '../pages/myaccount/myaccount';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { FranchiseDashBoardPage } from '../pages/franchise-dash-board/franchise-dash-board';
import { MyLeadsPage } from '../pages/my-leads/my-leads';
import { MyleadDetailsPage } from '../pages/mylead-details/mylead-details';
import { NotificationPage } from '../pages/notification/notification';
import { NotificationInfoPage } from '../pages/notification-info/notification-info';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { FranchiseloginPage } from '../pages/franchiselogin/franchiselogin';
import { PackagePage } from '../pages/package/package';
import { PaymentSuccessPage } from '../pages/payment-success/payment-success';
import { EnquiriesPage } from '../pages/enquiries/enquiries';
import { InvitationPage } from '../pages/invitation/invitation';
import { SchedulePage } from '../pages/schedule/schedule';
import { MyresponsesPage } from '../pages/myresponses/myresponses';
import { InboxPage } from '../pages/inbox/inbox';
import { ReqFranchisePage } from '../pages/req-franchise/req-franchise';
import { UpgradePage } from '../pages/upgrade/upgrade';
import { RequirementPage } from '../pages/requirement/requirement';
import { TemplatesPage } from '../pages/templates/templates';
import { BuyleaddetailsPage } from '../pages/buyleaddetails/buyleaddetails';
import { OtpPage } from '../pages/otp/otp';
import { CreditpointsPage } from '../pages/creditpoints/creditpoints';
import { FreqlistPage } from '../pages/freqlist/freqlist';
import { FreqlistdetailsPage } from '../pages/freqlistdetails/freqlistdetails';
import { FrreportsPage } from '../pages/frreports/frreports';
import { FrincomePage } from '../pages/frincome/frincome';
import { FrsellleadsPage } from '../pages/frsellleads/frsellleads';
import { FrbuyleadsPage } from '../pages/frbuyleads/frbuyleads';
import { FrlistPage } from '../pages/frlist/frlist';
import { SettingsPage } from '../pages/settings/settings';
import { FeedbackPage } from '../pages/feedback/feedback';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ChatmsgPage } from '../pages/chatmsg/chatmsg';
import { QuotationPage } from '../pages/quotation/quotation';
import { InboxdetailsPage } from '../pages/inboxdetails/inboxdetails';
import { LeadsearchPipe } from '../pipes/leadsearch/leadsearch';
import { BuyersearchPipe } from '../pipes/buyersearch/buyersearch';
import { HsnsearchPipe } from '../pipes/hsnsearch/hsnsearch';
import { PostingssearchPipe } from '../pipes/postingssearch/postingssearch';
import { ProductsearchPipe } from '../pipes/productsearch/productsearch';
import { LeadotpPage } from '../pages/leadotp/leadotp';
import { OtppostPage } from '../pages/otppost/otppost';
import { ChatchapterusersPage } from '../pages/chatchapterusers/chatchapterusers';
import { HsnleadsPage } from '../pages/hsnleads/hsnleads';
import { MypurchaseleadsPage } from '../pages/mypurchaseleads/mypurchaseleads';
import { MypurchasebuydetailsPage } from '../pages/mypurchasebuydetails/mypurchasebuydetails';
import { MypurchasedetailsPage } from '../pages/mypurchasedetails/mypurchasedetails';
import { MybuydetailsPage } from '../pages/mybuydetails/mybuydetails';
import { MychatPage } from '../pages/mychat/mychat';
import { GroupchatPage } from '../pages/groupchat/groupchat';
import { ChatgroupusersPage } from '../pages/chatgroupusers/chatgroupusers';
import { ChatusersPipe } from '../pipes/chatusers/chatusers';
import { GroupchatusersPipe } from '../pipes/groupchatusers/groupchatusers';
import { InviteusersPage } from '../pages/inviteusers/inviteusers';
import { WebstreamPage } from '../pages/webstream/webstream';
import { ChathsnusersPage } from '../pages/chathsnusers/chathsnusers';
import { LogoutPage } from '../pages/logout/logout';
import { GlobalsearchPage } from '../pages/globalsearch/globalsearch';
import { HssearchPage } from '../pages/hssearch/hssearch';
import { HspostleadPage } from '../pages/hspostlead/hspostlead';
import { ChapterchatPage } from '../pages/chapterchat/chapterchat';
import { HsnmapsPage } from '../pages/hsnmaps/hsnmaps';
import { Level3Page } from '../pages/level3/level3';
import { AddhscodesPage } from '../pages/addhscodes/addhscodes';
import { AddhscodePage } from '../pages/addhscode/addhscode';
import { JitsiPage } from '../pages/jitsi/jitsi';
import { IndividualchatPage } from '../pages/individualchat/individualchat';
import { MyresponsedetailsPage } from '../pages/myresponsedetails/myresponsedetails';
import { PaymentFailurePage } from '../pages/payment-failure/payment-failure';
import { BestpracticesPage } from '../pages/bestpractices/bestpractices';
import { DownloadsPage } from '../pages/downloads/downloads';
import { WorkshopsPage } from '../pages/workshops/workshops';
import { EmailverificationPage } from '../pages/emailverification/emailverification';
import { MypackagedetailsPage } from '../pages/mypackagedetails/mypackagedetails';
import { TermsconditionsPage } from '../pages/termsconditions/termsconditions';
import { MyfavPage } from '../pages/myfav/myfav';
import { GuesthscodePage } from '../pages/guesthscode/guesthscode';
import { LeadpreviewPage } from '../pages/leadpreview/leadpreview';
import { VideologinPage } from '../pages/videologin/videologin';
import { CreatempinPage } from '../pages/creatempin/creatempin';
import { MpinPage } from '../pages/mpin/mpin';
import { ForgotmpinPage } from '../pages/forgotmpin/forgotmpin';
import { UsermodelPage } from '../pages/usermodel/usermodel';
import { TargetvsachievePage } from '../pages/targetvsachieve/targetvsachieve';
import { TargetsPage } from '../pages/targets/targets';
import { CouponsPage } from '../pages/coupons/coupons';
import { PromotionsPage } from '../pages/promotions/promotions';
import { PromotionrequestPage } from '../pages/promotionrequest/promotionrequest';
import { RequesttrackingPage } from '../pages/requesttracking/requesttracking';
import { ForecastingPage } from '../pages/forecasting/forecasting';
import { SubscribersPage } from '../pages/subscribers/subscribers';
import { LeadtermsPage } from '../pages/leadterms/leadterms';
import { ChatchapterusersmapPage } from '../pages/chatchapterusersmap/chatchapterusersmap';
import { BuyermapPage } from '../pages/buyermap/buyermap';
import { ChangepassPage } from '../pages/changepass/changepass';
import { ChangempinPage } from '../pages/changempin/changempin';
import { GroupchatmsgPage } from '../pages/groupchatmsg/groupchatmsg';
import { IdontknowhscodePage } from '../pages/idontknowhscode/idontknowhscode';
import { FranchisemapPage } from '../pages/franchisemap/franchisemap';
import { QuoterequestsPage } from '../pages/quoterequests/quoterequests';
import { RequestquotationPage } from '../pages/requestquotation/requestquotation';
import { FrrequestPage } from '../pages/frrequest/frrequest';
import { OrderByPipe } from '../pipes/order-by/order-by';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
     CategoriesPage,
     ChaptersPage,
     HsCodesPage,
     GoogleMapPage,
     ChatPage,
    GalleryPage,
    ForgrtPwdPage,
    LeadsPage,
    LeadDetailsPage,
    ProfilePage,
    SellerPage,
    BuyerPage,
    SigninPage,
    SignupPage,
    SplashPage,
    RfqPage,
    SendquotePage,
    WebinarPage,
    RfqPostBannerPage,
    MyaccountPage,
    SubscriptionPage,
    FranchiseDashBoardPage,
    GalleryPage,
    HsCodesPage,
    MyLeadsPage,
    MyleadDetailsPage,
    NotificationPage,
    NotificationInfoPage,
    ItemCreatePage,
    FranchiseloginPage,
    PackagePage,
    PaymentSuccessPage,
    EnquiriesPage,
    InvitationPage,
    SchedulePage,
    MyresponsesPage,
    InboxPage,
    ReqFranchisePage,
    UpgradePage,
    RequirementPage,
    TemplatesPage,
    BuyleaddetailsPage,
    OtpPage,
    CreditpointsPage,
    FreqlistPage,
    FreqlistdetailsPage,
    FrreportsPage,
    FrincomePage,
    FrsellleadsPage,
    FrbuyleadsPage,
    FrlistPage,
    SettingsPage,
    FeedbackPage,
    EditprofilePage,
    ChatmsgPage,
    QuotationPage,
    InboxdetailsPage,
    LeadsearchPipe,
    BuyersearchPipe,
    HsnsearchPipe,
    LeadsearchPipe,
    PostingssearchPipe,
    ProductsearchPipe,
    OrderByPipe, 
    LeadotpPage,
    OtppostPage,
    ChatchapterusersPage,
    HsnleadsPage,
    MypurchaseleadsPage,
     MypurchasebuydetailsPage,
    MypurchasedetailsPage,
    MybuydetailsPage,
    MychatPage,
    GroupchatPage,
    ChatgroupusersPage,
    ChatusersPipe,
    GroupchatusersPipe,
    InviteusersPage,
    WebstreamPage,
    ChathsnusersPage,
    LogoutPage,
    GlobalsearchPage,
    HssearchPage,
    HspostleadPage,
    ChapterchatPage,
    HsnmapsPage,
    Level3Page,
    AddhscodesPage,
    AddhscodePage,
    JitsiPage,
    IndividualchatPage,
    MyresponsedetailsPage,
    PaymentFailurePage,
    BestpracticesPage,
    DownloadsPage,
    WorkshopsPage,
    EmailverificationPage,
    MypackagedetailsPage,
    TermsconditionsPage,
    MyfavPage,
    GuesthscodePage,
    LeadpreviewPage,
    VideologinPage,
    CreatempinPage,
    MpinPage,
    ForgotmpinPage,
    UsermodelPage,
    TargetvsachievePage,
    TargetsPage,
    CouponsPage,
    PromotionsPage,
    PromotionrequestPage,
    RequesttrackingPage,
    ForecastingPage,
    SubscribersPage,
    LeadtermsPage,
    ChatchapterusersmapPage,
    BuyermapPage,
    ChangepassPage,
    ChangempinPage,
    GroupchatmsgPage,
    IdontknowhscodePage,
    FranchisemapPage,
    QuoterequestsPage,
    RequestquotationPage,
    FrrequestPage
  ],
  imports: [
    BrowserModule,
    NgOtpInputModule ,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
   IonicStorageModule.forRoot(),
   NgMultiSelectDropDownModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
     CategoriesPage,
     ChaptersPage,
     HsCodesPage,
     GoogleMapPage,
     ChatPage,
    GalleryPage,
    ForgrtPwdPage,
    LeadsPage,
    LeadDetailsPage,
    ProfilePage,
    SellerPage,
    BuyerPage,
    SigninPage,
    SignupPage,
    SplashPage,
    RfqPage,
    SendquotePage,
    WebinarPage,
    RfqPostBannerPage,
    MyaccountPage,
    SubscriptionPage,
    FranchiseDashBoardPage,
    GalleryPage,
    HsCodesPage,
    MyLeadsPage,
    MyleadDetailsPage,
    NotificationPage,
    NotificationInfoPage,
    ItemCreatePage,
    FranchiseloginPage,
    PackagePage,
    PaymentSuccessPage,
    EnquiriesPage,
    InvitationPage,
    SchedulePage,
    MyresponsesPage,
    InboxPage,
    ReqFranchisePage,
    UpgradePage,
    RequirementPage,
    TemplatesPage,
    BuyleaddetailsPage,
    OtpPage,
    CreditpointsPage,
    FreqlistPage,
    FreqlistdetailsPage,
    FrreportsPage,
    FrincomePage,
    FrsellleadsPage,
    FrbuyleadsPage,
    FrlistPage,
    SettingsPage,
    FeedbackPage,
    EditprofilePage,
    ChatmsgPage,
    QuotationPage,
    InboxdetailsPage,
   /*  LeadsearchPipe,
    BuyersearchPipe,
    HsnsearchPipe,
    LeadsearchPipe,
    PostingssearchPipe,
    ProductsearchPipe,  */
    LeadotpPage,
    OtppostPage,
    ChatchapterusersPage,
    HsnleadsPage,
    MypurchaseleadsPage,
     MypurchasebuydetailsPage,
    MypurchasedetailsPage,
    MybuydetailsPage,
    MychatPage,
    GroupchatPage,
    ChatgroupusersPage,
   /*  ChatusersPipe,
    GroupchatusersPipe, */
    InviteusersPage,
    WebstreamPage,
    ChathsnusersPage,
    LogoutPage,
    GlobalsearchPage,
    HssearchPage,
    HspostleadPage,
    ChapterchatPage,
    HsnmapsPage,
    Level3Page,
    AddhscodesPage,
    AddhscodePage,
    JitsiPage,
    IndividualchatPage,
    MyresponsedetailsPage,
    PaymentFailurePage,
    BestpracticesPage,
    DownloadsPage,
    WorkshopsPage,
    EmailverificationPage,
    MypackagedetailsPage,
    TermsconditionsPage,
    MyfavPage,
    GuesthscodePage,
    LeadpreviewPage,
    VideologinPage,
    CreatempinPage,
    MpinPage,
    ForgotmpinPage,
    UsermodelPage,
    TargetvsachievePage,
    TargetsPage,
    CouponsPage,
    PromotionsPage,
    PromotionrequestPage,
    RequesttrackingPage,
    ForecastingPage,
    SubscribersPage,
    LeadtermsPage,
    ChatchapterusersmapPage,
    BuyermapPage,
    ChangepassPage,
    ChangempinPage,
    GroupchatmsgPage,
    IdontknowhscodePage,
    FranchisemapPage,
    QuoterequestsPage,
    RequestquotationPage,
    FrrequestPage,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CallNumber,
    File,
    Geolocation,
    Device,
    SocialSharing,
    FileTransfer,
    NativeStorage ,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
