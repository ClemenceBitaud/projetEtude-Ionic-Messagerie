import {Component, OnInit} from '@angular/core';
import {User} from '../../modele/user';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private users = [];
  private currentUser: string;
  private connected: boolean;

  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute,
              private router: Router, private firebaseService: FirebaseService) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.connected = false;
      }else {
        this.connected = true;
        this.currentUser = auth.uid;
      }
    });
  }

  ngOnInit(): void {

    this.firebaseService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.data()['id'],
          firstName: e.payload.doc.data()['firstName'],
          username: e.payload.doc.data()['username'],
          picture: e.payload.doc.data()['picture']
        };
      });
      // console.log(this.users);
      this.users = this.users.filter(u => u.id !== this.currentUser);
    });
  }

  // Fonction de deconnexion
  logout(): void {
    this.afAuth.signOut();
    this.connected = false;
    this.router.navigate(['user-auth']);
  }

  // Fonction pour aller vers la page de conversation
  // id: id du user auquel on veut parler
  // username: username du user auquel on veut parler
  goToConversation(id: string, username: string) {
    const navigationExtras: NavigationExtras = { state: {
        idUserToTalk: id, usernameUserToTalk: username}};
    this.router.navigate(['user-conversation'], navigationExtras);
  }

}
