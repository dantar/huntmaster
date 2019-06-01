import { HuntRules, HuntTrigger } from './models/hunt';
import { Component, OnInit } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'master-ng';

  rules: HuntRules[];

  ngOnInit(): void {
    this.rules = [];
  }

  addRule(type: string) {
    this.rules.push({
      trigger: {type: 'trigger', code: 'click'},
      effect: {type: 'consequence', code: 'message'},
    });
  }

  loadJsonGame(upload: FileUpload, event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.rules = JSON.parse(reader.result as string);
      upload.clear();
    };
    reader.readAsText(event.files[0]);
  }
}
