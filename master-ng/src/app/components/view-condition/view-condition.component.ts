import { Component, OnInit, Input } from '@angular/core';
import { HuntCondition, HcListLogicOperator, HcNotOf } from 'src/app/models/hunt';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-view-condition,[app-view-condition]',
  templateUrl: './view-condition.component.html',
  styleUrls: ['./view-condition.component.scss']
})
export class ViewConditionComponent implements OnInit {

  conditions = ['have', 'range', 'and', 'or', 'not'];

  @Input() condition: HuntCondition;

  constructor() {
  }
  
  ngOnInit() {
    if (!this.condition) {
      this.condition = new HuntCondition();
    }
  }

  getConditionList(): HuntCondition[] {
    let c = this.condition as HcListLogicOperator;
    if (! c.conditions) {
      c.conditions = [];
    }
    return c.conditions;
  }

  addConditionToList() {
    this.getConditionList().push({type: 'condition', code: 'have'});
  }

  getConditionOf(): HuntCondition {
    let c = this.condition as HcNotOf;
    if (! c.condition) {
      c.condition = {type: 'condition', code: 'have'};
    }
    return c.condition;
  }

}
