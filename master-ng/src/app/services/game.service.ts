import { Injectable } from '@angular/core';
import { HuntRules, HuntTrigger, HtClickItem, HtWithItem, HcDropItem, HcGainItem, HcMany, HuntConsequence, HuntGame, HuntCondition, HcListLogicOperator, HcAndOf, HcOrOf, HcHaveItem, HcNotOf, HcRangeScore } from '../models/hunt';

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
    'nomsg',
  ];

  conditions = ['have', 'range', 'and', 'or', 'not'];


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

  static effectFactory: {[code: string]: ()=>HuntConsequence} = {}

  newEffect(code: string): HuntConsequence {
    return GameService.effectFactory[code]();
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

  toggleCondition(condition: HuntCondition) {
    switch (condition.code) {
      case 'and':
        condition.code = 'or';
        break;
      case 'or':
        condition.code = 'and';
        break;
      default:
        break;
    }
  }

  newCondition(code: string): HuntCondition {
    switch (code) {
      case 'have':
        return new HcHaveItem(null);
      case 'range':
          return new HcRangeScore(null, null, null);
      case 'and':
        return new HcAndOf([]);
      case 'or':
        return new HcOrOf([]);
      case 'not':
        return new HcNotOf(null);
    }
  }

  addCondition(previous: HuntCondition, code: string): HuntCondition {
    const condition = this.newCondition(code);
    if (previous) {
      switch (previous.code) {
        case 'or':
        case 'and':
          (previous as HcListLogicOperator).conditions.push(condition);
          return previous
        case 'not':
          (previous as HcNotOf).condition = condition;
          return previous;
        default:
          return new HcAndOf([previous, condition]);
      }
    } else {
      return condition;
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

GameService.effectFactory['when'] = ()=> new HcWhenThen();
GameService.effectFactory['sound'] = ()=> new HcSound(null);
GameService.effectFactory['gain'] = ()=> new HcGainItem(null);
GameService.effectFactory['score'] = ()=> new HcGainCountable(null, null);
GameService.effectFactory['drop'] = ()=> new HcDropItem(null);
GameService.effectFactory['message'] = ()=> new HcMessage('');
GameService.effectFactory['once'] = ()=> new HcOnce(null, null, null);
GameService.effectFactory['many'] = ()=> new HcMany([]);
