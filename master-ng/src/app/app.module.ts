import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';

import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
// import {DropdownModule} from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { ViewRuleComponent } from './components/view-rule/view-rule.component';
import { ViewTriggerComponent } from './components/view-trigger/view-trigger.component';
import { ViewEffectComponent } from './components/view-effect/view-effect.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ViewRuleComponent,
    ViewTriggerComponent,
    ViewEffectComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    // DropdownModule,
    RadioButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    OverlayPanelModule,
    FileUploadModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
