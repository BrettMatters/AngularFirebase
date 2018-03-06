import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: []
})

export class MaterialModule { }