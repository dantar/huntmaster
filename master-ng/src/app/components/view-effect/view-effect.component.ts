import { HuntConsequence, HcMany, HcWhenThen, HuntCondition, HcOnce } from './../../models/hunt';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-view-effect,[app-view-effect]',
  templateUrl: './view-effect.component.html',
  styleUrls: ['./view-effect.component.scss']
})
export class ViewEffectComponent implements OnInit {

  @Input() effect: HuntConsequence;
  @Output() trash = new EventEmitter<HuntConsequence>();

  constructor(public game: GameService) { }

  ngOnInit() {
    if (!this.effect) {
      this.effect = new HuntConsequence();
    }
  }

  addEffectToList() {
    const e: HcMany = <HcMany>this.effect;
    if (!e.list) {
      e.list = [];
    }
    e.list.push(new HuntConsequence());
  }

  newWhenCondition(): HuntCondition {
    const e = this.effect as HcWhenThen;
    e.condition = e.condition ? e.condition : new HuntCondition();
    return e.condition;
  }

}
