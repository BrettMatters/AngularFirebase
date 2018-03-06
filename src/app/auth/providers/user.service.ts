import { Injectable, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private loggedInUser = new BehaviorSubject(undefined);

  constructor(public afAuth: AngularFireAuth) {
    //Load the initial logged in user
    this._getLoggedInFirebaseUser().then((user) => {
      this.loggedInUser.next(user);
    }, () => {
      this.loggedInUser.next(null);
    })
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUser.asObservable();
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.loggedInUser.next(null);
    });
  }

  /** 
   * Check the authentication state to determine if a user is logged in, safer than
   * firebase.auth().currentUser as authentication is an async process and can return null if
   * isnt fully ready yet.
  */
  _getLoggedInFirebaseUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          reject(false);
        }
      })
    });
  }
}