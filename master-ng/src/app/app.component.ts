import { HuntRules, HuntTrigger, HtClickItem, HtWithItem, HcDropItem, HcGainItem } from './models/hunt';
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
  rulefilter = '';

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

  filterrule(rule: HuntRules) {
    if (this.rulefilter.length <= 0) {
      return true;
    }
    if (rule.trigger.code === 'click') {
      const r = <HtClickItem> rule.trigger;
      if (!r.item || r.item.indexOf(this.rulefilter) >= 0) {
        return true;
      };
    }
    if (rule.trigger.code === 'with') {
      const r = (<HtWithItem> rule.trigger);
      if (!r.second || !r.first || r.first.indexOf(this.rulefilter) >= 0 || r.second.indexOf(this.rulefilter) >= 0) {
        return true;
      };
    }
    if (rule.effect.code === 'drop') {
      const r = (<HcDropItem> rule.effect);
      if (!r.item || r.item.indexOf(this.rulefilter) >= 0) {
        return true;
      };
    }
    if (rule.effect.code === 'gain') {
      const r = (<HcGainItem> rule.effect);
      if (!r.item || r.item.indexOf(this.rulefilter) >= 0) {
        return true;
      };
    }
  }

}
