import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordStrengthModule } from './password-strength/password-strength.module';
import { PasswordStrengthComponent } from './password-strength/component/password-strength/password-strength.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordStrengthModule
  ],
  entryComponents: [PasswordStrengthComponent],
  providers: [],
  bootstrap: []
})
export class AppModule { 
  constructor(private injector: Injector) {
      const el = createCustomElement(PasswordStrengthComponent, {injector: this.injector});
      customElements.define("app-password-strength", el);
  }
}
