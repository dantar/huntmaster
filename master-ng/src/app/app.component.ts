import { HuntRules } from './models/hunt';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'master-ng';

  rules: HuntRules[] = [];

  addRule(type: string) {
    this.rules.push(new HuntRules());
  }

}
