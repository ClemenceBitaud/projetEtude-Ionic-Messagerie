import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAuthPageRoutingModule } from './user-auth-routing.module';

import { UserAuthPage } from './user-auth.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserAuthPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [UserAuthPage]
})
export class UserAuthPageModule {}
