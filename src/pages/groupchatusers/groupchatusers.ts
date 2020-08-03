import { Storage } from '@ionic/storage';
import { ChatPage } from './../chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the GroupchatusersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private storage:Storage, 
    public alertCtrl: AlertController ) {
    this.chatroom = this.navParams.get("chatroom");
  }

  BackPage(){
    this.navCtrl.push(ChatPage);
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
    });

    console.log('ionViewDidLoad GroupchatusersPage');
    this.http.get(MyApp.url+"getGroupChatMembers.php?chatroom="+this.chatroom).subscribe((groupusers)=>{
      this.groupusers=groupusers;
      console.log("Group users", this.groupusers);
    });
  }

}
