import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
// import { DropdownModule } from 'primeng/dropdown';

import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
// import {DropdownModule} from 'primeng/dropdown';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
 
import { AppComponent } from './app.component';
import { ViewRuleComponent } from './components/view-rule/view-rule.component';
import { ViewTriggerComponent } from './components/view-trigger/view-trigger.component';
import { ViewEffectComponent } from './components/view-effect/view-effect.component';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './services/game.service';
import { ViewConditionComponent } from './components/view-condition/view-condition.component';
import { AddEffectComponent } from './components/add-effect/add-effect.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewRuleComponent,
    ViewTriggerComponent,
    ViewEffectComponent,
    ViewConditionComponent,
    AddEffectComponent
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
    FieldsetModule,
    Angular2FontawesomeModule,
  ],
  providers: [
    GameService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
