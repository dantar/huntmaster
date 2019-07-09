import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { HuntConsequence } from 'src/app/models/hunt';

@Component({
  selector: 'app-add-effect,[app-add-effect]',
  templateUrl: './add-effect.component.html',
  styleUrls: ['./add-effect.component.scss']
})
export class AddEffectComponent implements OnInit {

  @Input() effect: HuntConsequence;
  @Output() updateEffect = new EventEmitter<HuntConsequence>();

  constructor(public game: GameService) { }

  ngOnInit() {
  }

}
