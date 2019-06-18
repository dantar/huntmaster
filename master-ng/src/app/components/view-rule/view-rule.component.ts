import { HuntRules, HtClickItem, HtWithItem } from './../../models/hunt';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-rule,[app-view-rule]',
  templateUrl: './view-rule.component.html',
  styleUrls: ['./view-rule.component.scss']
})
export class ViewRuleComponent implements OnInit {

  @Input() rule: HuntRules;

  constructor() { }

  ngOnInit() {
  }

  shortname(): string {
    let details = '';
    switch (this.rule.trigger.code) {
      case 'start':
        return 'game start';
      case 'click':
        return `${(<HtClickItem>this.rule.trigger).item}`;
      case 'with':
        return `${(<HtWithItem>this.rule.trigger).first} + ${(<HtWithItem>this.rule.trigger).second}`;
      case 'nomsg':
        return 'no message';
      default:
        return this.rule.trigger.code;
    }
  }

}
