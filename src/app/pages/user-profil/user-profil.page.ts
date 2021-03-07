import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../modele/user';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.page.html',
  styleUrls: ['./user-profil.page.scss'],
})
export class UserProfilPage implements OnInit {

  private userId: string;
  private connected: boolean;
  private theUser = [];

  constructor(public afAuth: AngularFireAuth, private firebaseService: FirebaseService, private route: ActivatedRoute,
              private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userId = this.router.getCurrentNavigation().extras.state.idUserProfil;
      }
    });
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.connected = false;
      }else {
        this.connected = true;
      }
    });
  }

  ngOnInit(): void {
    this.firebaseService.getUsers().subscribe(data => {
      this.theUser = data.map(e => {
        return {
          id: e.payload.doc.data()['id'],
          firstName: e.payload.doc.data()['firstName'],
          lastName: e.payload.doc.data()['lastName'],
          birthdate: e.payload.doc.data()['birthdate'],
          username: e.payload.doc.data()['username'],
          email: e.payload.doc.data()['email'],
          password: e.payload.doc.data()['password'],
          address: e.payload.doc.data()['address'],
          picture: e.payload.doc.data()['picture']
        };
      });
      this.theUser = this.theUser.filter(u => u.id === this.userId);
    });
  }

  // Fonction pour retourner à la conversation
  back(): void {
    this.router.navigate(['user-conversation']);
  }
}
