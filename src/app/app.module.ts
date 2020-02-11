import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordStrengthModule } from './password-strength/password-strength.module';
import { PasswordStrengthComponent } from './password-strength/component/password-strength/password-strength.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ViewChildTestModule } from './view-child-test/view-child-test.module';
import { ParentComponent } from './view-child-test/parent/parent.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordStrengthModule,
    BrowserAnimationsModule, 
    MaterialModule,
    ViewChildTestModule
  ],
  bootstrap: [],
  entryComponents: [PasswordStrengthComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap { 

  ngDoBootstrap(): void {}

  constructor(private injector: Injector) {
      const el = createCustomElement(PasswordStrengthComponent, {injector: this.injector});
      if(!customElements.get('app-password')) {customElements.define("app-password", el);}
      else console.log("Sudha priya is right");
  }
}
