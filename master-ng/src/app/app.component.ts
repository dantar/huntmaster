import { HuntRules, HuntTrigger } from './models/hunt';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'master-ng';

  rules: HuntRules[];

  @ViewChild('upload') upload: FileUpload;

  ngOnInit(): void {
    this.rules = [];
  }

  addRule(type: string) {
    this.rules.push({
      trigger: {type: 'trigger', code: 'click'},
      effect: {type: 'consequence', code: 'message'},
    });
  }

  loadJsonGame(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.rules = JSON.parse(reader.result as string);
      this.upload.clear();
    };
    reader.readAsText(event.files[0]);
  }

  saveGame() {
    const blob = new Blob([JSON.stringify(this.rules)], {type: 'text/json;charset=utf-8'});
    saveAs(blob, 'game.json');
  }

}
