import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  signIn(email: any, password: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  createUser(email: any, password: any) {
    return this.ngFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationEmail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  sendVerificationEmail() {
    return this.ngFireAuth.currentUser.then((user: any) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['login']);
      })
    })
  }

  passwordRecovery(passwordResetEmail: any) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email has been sent. Please, check your inbox.')
      })
      .catch((error) => {
        window.alert(error);
      })
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.emailVerified !== false;
  }

  get isEmailVerified() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.emailVerified !== false;
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['welcome'])
    })
  }
}
