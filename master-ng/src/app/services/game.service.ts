import { Injectable } from '@angular/core';
import { HuntRules, HuntTrigger, HtClickItem, HtWithItem, HcDropItem, HcGainItem, HcMany, HuntConsequence, HuntGame } from '../models/hunt';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: HuntGame;
  rules: HuntRules[];
  clipboard: HuntRules;
  pinned: HuntRules[];
  rulefilter = '';

  effects = [
    'many',
    'message', 
    'gain', 
    'score', 
    'drop', 
    'when', 
    'once', 
    'sound', 
    'end', 
  ];
  sounds = [
    'applause',
    'click',
  ];
  triggers = [
    'start', 
    'click', 
    'with', 
    'nomsg'];


  constructor() { 
    this.setGame({
      name: 'untitled',
      title: 'The game title',
      rules: [],
      version: 1,
    });
    this.pinned = [];
    this.clipboard = null;
  }  

  addRule(code: string) {
    const rule = {
      trigger: {type: 'trigger', code: code},
      effect: {type: 'consequence', code: 'message'},
    };
    this.rules.push(rule);
    this.pinned.push(rule);
  }

  getGame(): HuntGame {
    return this.game;
  }

  setGame(game: HuntGame) {
    this.game = game;
    this.rules = game.rules;
  }

  allitems(): string[] {
    const result:string[] = [];
    this.rules.forEach((rule) => {
      this.searchitems(result, rule.effect);
    });
    return result;
  }

  private searchitems(found: string[], effect: HuntConsequence) {
    if (effect.code === 'gain' && !found.includes((<HcGainItem>effect).item)) {
      found.push((<HcGainItem>effect).item);
    }
    if (effect.code === 'many') {
      (<HcMany>effect).list.forEach((e) => {
        this.searchitems(found, e);
      });
    }
  }

  filterrule(rule: HuntRules) {
    if (this.rulefilter.length <= 0) {
      return true;
    }
    if (this.pinned.indexOf(rule) >= 0) {
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
    return false;
  }

  addEffect(previous: HuntConsequence, code: string): HuntConsequence {
    const effect = new HuntConsequence();
    effect.code = code;
    if (previous) {
      if (previous.code === 'many') {
        (previous as HcMany).list.push(effect);
        return previous;
      } else {
        return new HcMany([previous, effect]);
      }
    } else {
      return effect;
    }
  }

  moveUpRule(rule: HuntRules) {
    const index = this.rules.indexOf(rule);
    if (index > 0 && index < this.rules.length) {
      this.rules.splice(index - 1, 0, this.rules.splice(index, 1)[0]);
    }
  }

  moveDownRule(rule: HuntRules) {
    const index = this.rules.indexOf(rule);
    if (index >= 0 && index < this.rules.length - 1) {
      this.rules.splice(index +1, 0, this.rules.splice(index, 1)[0]);
    }
  }

  copyRule(rule: HuntRules) {
    const index = this.rules.indexOf(rule);
    this.rules.splice(index +1, 0, JSON.parse(JSON.stringify(rule)));
  }

  cutRule(rule: HuntRules) {
    const index = this.rules.indexOf(rule);
    this.clipboard = this.rules.splice(index, 1)[0];
  }

  pasteRule(rule: HuntRules) {
    const index = this.rules.indexOf(rule);
    this.rules.splice(index +1, 0, this.clipboard);
    this.clipboard = null;
  }

  trashRule(rule: HuntRules) {
    const index = this.rules.indexOf(rule);
    this.rules.splice(index, 1);
  }

  trashClipboard() {
    this.clipboard = null;
  }

}
