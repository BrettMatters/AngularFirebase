import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

describe('UserService', () => {
  let angularFireAuthSpy;

  beforeEach(() => {
    angularFireAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['getLoggedInUser']);
    angularFireAuthSpy.auth = jasmine.createSpyObj('Auth', ['signInWithRedirect', 'signOut']);
    angularFireAuthSpy.auth.signOut.and.returnValue({
      then: (callback: Function) => {
        callback();
      }
    });

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AngularFireAuth, useValue: angularFireAuthSpy }]
    });
  });

  xit('should be created', inject([UserService], (service: UserService) => {
    angularFireAuthSpy.auth.signOut.and.returnValue({
      then: (callback: Function) => { }
    });

    var newService = new UserService(angularFireAuthSpy);
    expect(newService).toBeTruthy();

    newService.getLoggedInUser().subscribe((user) => {
      expect(user).toBeUndefined();
    });
  }));

  it('getLoggedInUser: returns an observable for the user logon state', inject([UserService], (service: UserService) => {
    var obs = service.getLoggedInUser();
    expect(obs).toEqual(jasmine.any(Observable));
  }));

  it('loginWithGoogle', inject([UserService], (service: UserService) => {
    service.loginWithGoogle();
    expect(angularFireAuthSpy.auth.signInWithRedirect).toHaveBeenCalledWith(jasmine.any(firebase.auth.GoogleAuthProvider))
  }));

  it('logout: should logout from current Firebase auth', inject([UserService], (service: UserService) => {
    service.logout();
    //Signout was called on Firebase
    expect(angularFireAuthSpy.auth.signOut).toHaveBeenCalled();
    //Service now reports a null user
    service.getLoggedInUser().subscribe((user) => {
      expect(user).toBeNull();
    });
  }));
});
