import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { UserService } from '../../auth/providers/user.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let userServiceSpy;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['logout']);
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logout should call user service to logout', () => {
    component.logout();   
    expect(userServiceSpy.logout).toHaveBeenCalled();
  });
});
