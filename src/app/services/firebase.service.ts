import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../modele/user';
import {Message} from '../modele/message';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  private collectionUser = 'AllUsers';
  private collectionMessage = 'AllMessages';

  // Ajouter un utilisateur dans la bdd en définissant l'id du doc = id du user
  create_user(user: User, id: string) {
    return this.firestore.collection(this.collectionUser).doc(id).set({...user});
  }

  // Ajouter un message dans la bdd en définissant l'id du doc = id du message
  create_message(message: Message, id: string) {
    return this.firestore.collection(this.collectionMessage).doc(id.toString()).set({...message});
  }

  // Supprimer un message
  delete_message(idDoc: string){
    return this.firestore.collection(this.collectionMessage).doc(idDoc).delete();
  }

  // Récupérer tout les user de la bdd
  getUsers() {
    return this.firestore.collection(this.collectionUser).snapshotChanges();
  }

  // Récupérer tout les message de la bdd
  getMessages() {
    return this.firestore.collection(this.collectionMessage).snapshotChanges();
  }

  // Mise à jour d'un message
  updateMessageText(idDoc: string, message: Message){
    return this.firestore.collection(this.collectionMessage).doc(idDoc).update({...message});
  }
}
