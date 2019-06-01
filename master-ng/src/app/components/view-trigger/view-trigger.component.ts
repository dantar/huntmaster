import { HuntTrigger } from './../../models/hunt';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-trigger,[app-view-trigger]',
  templateUrl: './view-trigger.component.html',
  styleUrls: ['./view-trigger.component.scss']
})
export class ViewTriggerComponent implements OnInit {

  @Input() trigger: HuntTrigger;
  triggers = ['start', 'click', 'with', 'nomsg'];

  constructor() { }

  ngOnInit() {
  }

}
