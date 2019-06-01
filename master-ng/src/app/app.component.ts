import { HuntRules, HuntTrigger } from './models/hunt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'master-ng';

  rules: HuntRules[];

  ngOnInit(): void {
    this.rules = [];
  }

  addRule(type: string) {
    this.rules.push({
      trigger: {type: 'trigger', code: 'click'},
      effect: {type: 'consequence', code: 'message'},
    });
  }

}
