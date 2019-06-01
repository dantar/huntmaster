import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { ViewRuleComponent } from './components/view-rule/view-rule.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewRuleComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
