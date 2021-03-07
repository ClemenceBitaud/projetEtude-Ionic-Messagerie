import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../services/firebase.service';
import {User} from '../../modele/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  private userForm: FormGroup;
  private user: User;
  private userId: string;
  private userEmail: string;
  private userPassword: string;
  private isPasswordValid = true;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public afAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService, public formBuilder: FormBuilder, private datepipe: DatePipe) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userPassword = this.router.getCurrentNavigation().extras.state.userPassword;
      }
    });
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
      }else {
        // console.log('connecté: ' + auth.uid);
        this.userId = auth.uid;
        this.userEmail = auth.email;
      }
    });
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[- a-zA-Z]+')])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[- a-zA-Z]+')])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[- a-zA-Z0-9]+')])),
      birthdate: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])),
    });
  }

  // Fonction pour créer un compte
  public createAccount(): void {
    this.isPasswordValid = true;
    if (this.userForm.valid) {
      if (this.userPassword === this.userForm.value.confirmPassword) {
        this.isPasswordValid = true;
        const picture = document.getElementById('picture') as HTMLInputElement;
        let profilePicture: File;
        if (picture.files.length > 0){
          profilePicture = picture.files[0];
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(profilePicture);
        fileReader.onloadend = event => {
          this.user = {
            id: this.userId,
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            birthdate: this.datepipe.transform(this.userForm.value.birthdate, 'dd-MM-yyyy'),
            username: this.userForm.value.username,
            email: this.userEmail,
            password: this.userPassword,
            address: this.userForm.value.address,
            picture: event.target.result.toString()
          };
          this.firebaseService.create_user(this.user, this.userId).then(res => {
            this.userForm.reset();
          })
              .catch(error => {
                console.log(error);
              });
          this.router.navigate(['home']);
        };
      }else {
        this.isPasswordValid = false;
      }
    }
  }

  // Fonction pour retourner à la page de connexion
  back(): void {
    this.afAuth.signOut();
    this.router.navigate(['user-auth']);
  }

}
