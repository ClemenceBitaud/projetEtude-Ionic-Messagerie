import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import {NavigationExtras, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.page.html',
  styleUrls: ['./user-auth.page.scss'],
})
export class UserAuthPage implements OnInit {

  id: string;
  dataUser = {
    email: '',
    password: ''
  };

  private authForm: FormGroup;
  connected: boolean;
  userId: string;
  mail: string;

  constructor(public afAuth: AngularFireAuth, private router: Router, public formBuilder: FormBuilder) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        // console.log('non connecté');
        this.connected = false;
      }else {
        // console.log('connecté: ' + auth.uid);
        this.connected = true;
        this.userId = auth.uid;
        this.mail = auth.email;
      }
    });
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('.+[@].+[.].+')])),
      password: new FormControl('', Validators.compose([
      Validators.minLength(5),
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])),
    });
  }

  login(): void {
    if (this.authForm.valid){
      this.afAuth.signInWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password);
      this.afAuth.authState.subscribe( auth => {
        if (!auth) {
          console.log('non connecté');
          this.connected = false;
        }else {
          console.log('connécté : ' + auth.uid);
          this.connected = true;
          this.id = auth.uid;
          // console.log(this.id);
          this.router.navigate(['home']);
        }
      });
    }
  }

  logout(): void {
    this.afAuth.signOut();
    this.connected = false;
  }

  signUp(): void {
    if (this.authForm.valid){
      this.afAuth.createUserWithEmailAndPassword(this.authForm.value.email, this.authForm.value.password);
      this.afAuth.authState.subscribe( auth => {
        if (!auth) {
          console.log('non connecté');
          this.connected = false;
        }else {
          console.log('connecté: ' + auth.uid);
          this.connected = true;
          this.id = auth.uid;
          // console.log(this.id);
          // console.log(this.authForm.value.email);
          // console.log(this.authForm.value.password);
          const navigationExtras: NavigationExtras = { state: {
              userPassword: this.authForm.value.password}};
          this.router.navigate(['add-user'], navigationExtras);
          this.authForm.reset();
        }
      });
    }
  }
}
