import { HuntConsequence, HcMany } from './../../models/hunt';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-effect,[app-view-effect]',
  templateUrl: './view-effect.component.html',
  styleUrls: ['./view-effect.component.scss']
})
export class ViewEffectComponent implements OnInit {

  @Input() effect: HuntConsequence;
  effects = ['end', 'sound', 'gain', 'score', 'drop', 'message', 'once', 'many'];
  sounds = ['applause'];

  constructor() { }

  ngOnInit() {
  }

  addEffectToList() {
    const e: HcMany = <HcMany>this.effect;
    if (!e.list) {
      e.list = [];
    }
    e.list.push(new HuntConsequence());
  }

}
