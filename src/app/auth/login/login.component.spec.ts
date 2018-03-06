import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from '../providers/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy, routerSpy, activatedRouteSpy;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedInUser', 'loginWithGoogle']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['NotUsedButRequired']);
    activatedRouteSpy.snapshot = {
      queryParams: {}
    };

    userServiceSpy.getLoggedInUser.and.returnValue({
      subscribe: (callback: Function) => {
      }
    });

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MaterialModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('NgOnInit', () => {
    it('should redirect to main route if user is logged in already, with no redirect route', () => {
      userServiceSpy.getLoggedInUser.and.returnValue({
        subscribe: (callback: Function) => {
          callback(true);
        }
      });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
    });

    xit('should redirect to the redirect route if one was provided if user is logged in', () => {
      activatedRouteSpy.snapshot.queryParams.returnUrl = {
        returnUrl: '/redirectUrl'
      }
      userServiceSpy.getLoggedInUser.and.returnValue({
        subscribe: (callback: Function) => {
          callback(true);
        }
      });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/redirectUrl');
    });

    it('should remove loading state while if no user is logged in so they can action component', () => {
      userServiceSpy.getLoggedInUser.and.returnValue({
        subscribe: (callback: Function) => {
          callback(null);

          expect(component.loading).toBeFalsy();
        }
      });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have loading state true if an undefined response is returned on login check (as its not ready yet)', () => {
      userServiceSpy.getLoggedInUser.and.returnValue({
        subscribe: (callback: Function) => {
          callback();

          expect(component.loading).toBeTruthy();
        }
      });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('loginGoogle should user userservice to login via google', () => {
    component.loginGoogle();
    expect(userServiceSpy.loginWithGoogle).toHaveBeenCalled();
  });
});
