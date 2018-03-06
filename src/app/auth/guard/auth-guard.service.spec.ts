import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { UserService } from '../providers/user.service';
import { Router } from '@angular/router';


describe('AuthGuardService', () => {
  let userServiceSpy, routerSpy;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedInUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({   
      providers: [
        AuthGuardService,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));

  describe('canActivate: ', () => {
    it('Should resolve(true) if a user is logged in', async(inject([AuthGuardService], (service: AuthGuardService) => {
      let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['NotUsedButRequired']);
      let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['NotUsedButRequired']);

      userServiceSpy.getLoggedInUser.and.returnValue({
        subscribe: (callback: Function) => {
          callback(true);
        }
      });

      var promise = service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy);

      promise.then((result) => {
        expect(result).toBeTruthy();
      });
    })));

    it('Should resolve(false) and navigate to the login page if a user is not logged in', async(inject([AuthGuardService], (service: AuthGuardService) => {
      let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['NotUsedButRequired']);
      let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['NotUsedButRequired']);

      let returnUrl = 'theReturnURL';
      routerStateSnapshotSpy.url = returnUrl;

      userServiceSpy.getLoggedInUser.and.returnValue({
        subscribe: (callback: Function) => {
          callback(false);
        }
      });

      var promise = service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['login'], { queryParams: { returnUrl: returnUrl } })
      promise.then((result) => {
        expect(result).toBeFalsy();
      });
    })));
  });

});
