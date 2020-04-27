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
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NgxChartsModule],
  bootstrap: [],
  entryComponents: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(): void {}

  constructor(private injector: Injector) {
    const el: any = createCustomElement(AppComponent, { injector: this.injector });
    if (!customElements.get('bar-chart')) {
      customElements.define('bar-chart', el);
    } else {
      console.log('Element Already Loaded');
    }
  }
}
