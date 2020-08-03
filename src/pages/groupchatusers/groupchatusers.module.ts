import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupchatusersPage } from './groupchatusers';

@NgModule({
  declarations: [
    GroupchatusersPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupchatusersPage),
  ],
})
export class GroupchatusersPageModule {}
