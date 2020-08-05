import { Storage } from '@ionic/storage';
import { ChatPage } from './../chat/chat';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';


@Component({
  selector: 'page-groupchatusers',
  templateUrl: 'groupchatusers.html',
})
export class GroupchatusersPage {
  chatroom: any;
  groupusers: any;
  userdata: any;
  user_id: any;
  deleteduser: any;
  created_by: any;
  userslist: Object;
  users:any;
  chaptername: any;
  chapterslist: Object;
  userDiv: any=false;
  chapter_id: any;
  chat_id: any;
  createdgroup: any;
  walletcredits: any;
  credits: any;

  subscription: any;
  profiledata: any;
  subscription_id: any;
  chat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private storage:Storage, 
    public alertCtrl: AlertController ) {
    this.chatroom = this.navParams.get("chatroom");
    console.log("my caht room :",this.chatroom);
  }

  BackPage(){
    this.navCtrl.push(ChatPage);
  }
  AddUser(){
    this.userDiv=true;
   
  }
  Creategroup(){
   var link= MyApp.url+"addNewGroupChatMembers.php";
   var MyData = JSON.stringify({
     'user_id':this.user_id,
     'other_id':this.users,
     'group_name':this.chatroom
   });
   console.log(MyData);
   this.http.post(link,MyData).subscribe((data)=>{
     console.log("data:" , data);
     if(data==1){
       alert("user Added Succesfully");
       this.navCtrl.push(GroupchatusersPage,{
         'chatroom':this.chatroom
       });
     }
   })
  
  }
 
  delete(i){
      let alert = this.alertCtrl.create({
        title: 'Confirm Delete',
        message: 'Do you want Delete User?',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.user_id = this.groupusers[i].id;
              this.chatroom = this.groupusers[i].chatroom;
              this.http.get(MyApp.url+"delGroupChatMember.php?chatroom="+this.chatroom+"&groupchat_id="+this.user_id).subscribe((deleteusers)=>{
              this.deleteduser=deleteusers;
              console.log("Deleted User", this.deleteduser);
              this.navCtrl.push(GroupchatusersPage,{
                'chatroom':this.chatroom
              })
              console.log('Buy clicked');
              })
            }
          }
        ]
      });
      alert.present();
    }
    // this.user_id = this.groupusers[i].id;
    // this.chatroom = this.groupusers[i].chatroom;
    // this.http.get(MyApp.url+"delGroupChatMember.php?chatroom="+this.chatroom+"&groupchat_id="+this.user_id).subscribe((deleteusers)=>{
    //   this.deleteduser=deleteusers;
    //   console.log("Deleted User", this.deleteduser);
    // });
  //}
  ionViewDidLoad() {
    this.storage.get('userdetails').then((val)=>{
      this.userdata = val;
      this.user_id=this.userdata[0].id;
      this.http
        .get(MyApp.url + "getgroupchatusers.php?user_id=" + this.user_id)
        .subscribe(data => {
          this.userslist = data;
          console.log("chapters listdropdownlist", this.userslist);
        });
    });

    console.log('ionViewDidLoad GroupchatusersPage');
    this.http.get(MyApp.url+"getGroupChatMembers.php?chatroom="+this.chatroom).subscribe((groupusers)=>{
      this.groupusers=groupusers;
      this.created_by = groupusers[0].created_by
      console.log("Group users", this.groupusers);
    });
  }

}
