import { HuntRules, HtClickItem, HtWithItem, HcMessage, HcMany, HuntConsequence } from './../../models/hunt';
import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-view-rule,[app-view-rule]',
  templateUrl: './view-rule.component.html',
  styleUrls: ['./view-rule.component.scss']
})
export class ViewRuleComponent implements OnInit {

  @Input() rule: HuntRules;

  constructor(public game: GameService) { }

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
