import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserConversationPageRoutingModule } from './user-conversation-routing.module';

import { UserConversationPage } from './user-conversation.page';
import {ModalPageComponent} from '../../components/modal-page/modal-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserConversationPageRoutingModule
  ],
    declarations: [UserConversationPage, ModalPageComponent]
})
export class UserConversationPageModule {}
