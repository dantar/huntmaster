import { HuntRules } from './../../models/hunt';
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

}
