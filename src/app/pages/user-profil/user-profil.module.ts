import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilPageRoutingModule } from './user-profil-routing.module';

import { UserProfilPage } from './user-profil.page';
import {UserProfilItemComponent} from '../../components/user-profil-item/user-profil-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilPageRoutingModule
  ],
    declarations: [UserProfilPage, UserProfilItemComponent]
})
export class UserProfilPageModule {}
