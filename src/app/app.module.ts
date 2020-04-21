import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  DoBootstrap,
  Injector,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  bootstrap: [],
  entryComponents: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(): void {}

  constructor(private injector: Injector) {
    const el: any = createCustomElement(AppComponent, { injector: this.injector });
    if (!customElements.get('app-cmp')) {
      customElements.define('app-cmp', el);
    } else {
      console.log('Sudha priya is right');
    }
  }
}
