import { Component, OnInit, Input } from '@angular/core';
import { HuntCondition } from 'src/app/models/hunt';

@Component({
  selector: 'app-view-condition,[app-view-condition]',
  templateUrl: './view-condition.component.html',
  styleUrls: ['./view-condition.component.scss']
})
export class ViewConditionComponent implements OnInit {

  conditions = ['have'];

  @Input() condition: HuntCondition;

  constructor() {
  }
  
  ngOnInit() {
    if (!this.condition) {
      this.condition = new HuntCondition();
    }
  }

}
