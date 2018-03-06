import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './providers/user.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './guard/auth-guard.service';
import { MaterialModule } from '../material/material.module';

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule
  ],
  exports: [LoginComponent],
  providers: [AngularFireAuth, UserService, AuthGuardService],
  declarations: [LoginComponent]
})
export class AuthModule { }
