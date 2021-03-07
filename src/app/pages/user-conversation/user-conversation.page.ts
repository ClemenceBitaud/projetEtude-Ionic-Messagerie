import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Message} from '../../modele/message';
import {AngularFireAuth} from '@angular/fire/auth';
import {DatePipe} from '@angular/common';
import {ModalController} from '@ionic/angular';
import {ModalPageComponent} from '../../components/modal-page/modal-page.component';

@Component({
  selector: 'app-user-conversation',
  templateUrl: './user-conversation.page.html',
  styleUrls: ['./user-conversation.page.scss'],
})
export class UserConversationPage implements OnInit {

  private currentUser: string;
  private idUserToTalk: string;
  private usernameUserToTalk: string;
  private connected: boolean;
  messageText: any;
  private message: Message;
  private messages = [];
  private isDateVisible: boolean;
  private idOfMessage: string;

  constructor(public afAuth: AngularFireAuth, private firebaseService: FirebaseService, private route: ActivatedRoute,
              private router: Router, private datepipe: DatePipe, public modalController: ModalController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idUserToTalk = this.router.getCurrentNavigation().extras.state.idUserToTalk;
        this.usernameUserToTalk = this.router.getCurrentNavigation().extras.state.usernameUserToTalk;
      }
    });
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.connected = false;
      }else {
        this.connected = true;
        this.currentUser = auth.uid;
        this.isDateVisible = false;
      }
    });
    // Récupération de tous les messages
    this.firebaseService.getMessages().subscribe(data => {
      this.messages = data.map(e => {
        return {
          id: e.payload.doc.data()['id'],
          senderId: e.payload.doc.data()['senderId'],
          receiverId: e.payload.doc.data()['receiverId'],
          messageText: e.payload.doc.data()['messageText'],
          date: e.payload.doc.data()['date'],
        };
      });
      // Tri des messages par date croissante
      this.messages.sort(function(a, b) {
        if (a.date > b.date){
          return 1;
        }else if (a.date < b.date){
          return -1;
        }else {
          return 0;
        }
      });
    });
  }

  ngOnInit() {
  }

  // Fonction de deconnexion
  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['user-auth']);
    this.connected = false;
  }

  // Fonction pour afficher le modal de modification du message
  // idMessage: id du message à modifié
  // currentUser: user qui envoi le message
  // userToTalk: user destinataire du message
  // date: ancienne date d'envoi du message pour garder la même à la modification
  async presentModal(idMessage: string, currentUser: string, userToTalk: string, date: string) {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      componentProps: {
        idMessage,
        currentUser,
        userToTalk,
        date
      }
    });
    return await modal.present();
  }

  // Fonction pour retourner en arrière
  back(): void {
    this.router.navigate(['home']);
  }

  // Fonction pour aller vers le profil utilisateur
  // id: id du user dont on veut voir le profil
  goToProfile(id: string): void{
    const navigationExtras: NavigationExtras = { state: {
        idUserProfil: id}};
    this.router.navigate(['user-profil'], navigationExtras);
  }

  // Fonction pour supprimer un message
  // id: id du message
  delete(idMessage: string){
    console.log(idMessage);
    this.firebaseService.delete_message(idMessage).then(res => {
      console.log('le message a bien été supprimer');
    })
        .catch(error => {
          console.log(error);
        });
  }
  // Fonction pour envoyer un message
  sendMessage() {
    // Génerer un id aléatoirement pour le message
    function getRandomNumber(max: number, min: number) {
      return Math.random() * (max - min) + min;
    }
    this.idOfMessage = getRandomNumber(1, 10000000000).toString();
    const newDate = new Date();
    const dateForMessage = this.datepipe.transform(newDate, 'dd-MM-yyyy HH:mm:ss');
    this.message = {
      id: this.idOfMessage,
      senderId: this.currentUser,
      receiverId: this.idUserToTalk,
      messageText: this.messageText,
      date: dateForMessage,
    };
    this.firebaseService.create_message(this.message, this.idOfMessage).then(res => {
      this.messageText = '';
      console.log('le message à bien été envoyé');
    })
        .catch(error => {
          console.log(error);
        });
  }

  // Fonction pour rendre la date visible ou invisible
  messageVisible(){
    if (this.isDateVisible === false){
      this.isDateVisible = true;
    }else{
      this.isDateVisible = false;
    }
  }

}
