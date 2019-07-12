import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HuntCondition } from 'src/app/models/hunt';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-add-condition,[app-add-condition]',
  templateUrl: './add-condition.component.html',
  styleUrls: ['./add-condition.component.scss']
})
export class AddConditionComponent implements OnInit {

  @Input() condition: HuntCondition;
  @Output() replace = new EventEmitter<HuntCondition>();

  constructor(public game: GameService) { }

  ngOnInit() {
  }

}
