import { Component, OnInit, Input } from '@angular/core';
import { HuntCondition, HcListLogicOperator, HcNotOf } from 'src/app/models/hunt';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-view-condition,[app-view-condition]',
  templateUrl: './view-condition.component.html',
  styleUrls: ['./view-condition.component.scss']
})
export class ViewConditionComponent implements OnInit {

  @Input() condition: HuntCondition;

  constructor() {
  }
  
  ngOnInit() {
    if (!this.condition) {
      this.condition = new HuntCondition();
    }
  }

}
