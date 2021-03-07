import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {DatePipe} from '@angular/common';
import {Message} from '../../modele/message';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent {
  @Input() idMessage: string;
  @Input() currentUser: string;
  @Input() userToTalk: string;
  @Input() date: string;
  private newMessageText: any;
  private message: Message;

  constructor(private firebaseService: FirebaseService, private datepipe: DatePipe, private modalController: ModalController) { }

  // Fonction pour refermer le modal
  dismiss(){
    this.modalController.dismiss({
      dismessed: true
    });
  }

  // Fonction pour modifier le message
  updateMessage(){
    this.message = {
      id: this.idMessage,
      senderId: this.currentUser,
      receiverId: this.userToTalk,
      messageText: this.newMessageText,
      date: this.date,
    };
    this.firebaseService.updateMessageText(this.idMessage, this.message).then(res => {
      this.newMessageText = '';
      console.log('le message à bien été modifié');
      this.dismiss();
    })
        .catch(error => {
          console.log(error);
        });
  }
}
