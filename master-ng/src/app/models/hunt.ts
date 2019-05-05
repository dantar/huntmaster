export class HuntGame {
  name: string;
  title: string;
  rules: HuntRules[];
}

export class HuntState {
  tags: string[] = [];
  items: {[item: string]: HuntItem} = {};
  messages: HuntMessage[] = [];
  sounds: string[] = [];
  log: HuntMessage[] = [];
  score: {[item: string]: number} = {};
  runstate: string;
}

export class HuntMessage {
  text: string;
  constructor(text: string) {
    this.text = text;
  }
}

export class HuntRules {
  trigger: HuntTrigger;
  effect: HuntConsequence;
}

export class TypedBase {
  type: string;
}

// Hunt ITEMS

export class HuntItem extends TypedBase {
  type = 'item';
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}

// Hunt TRIGGERS

export class HuntTrigger extends TypedBase {
  type = 'trigger';
  code: string;
}

export class HtInitGame extends HuntTrigger {
  code = 'start';
}

export class HtClickItem extends HuntTrigger {
  code = 'click';
  item: string;
  constructor(item: string) {
    super();
    this.item = item;
  }
}

export class HtWithItem extends HuntTrigger {
  code = 'with';
  first: string;
  second: string;
  constructor(first: string, second: string) {
    super();
    this.first = first;
    this.second = second;
  }
}

export class HtNoMessages extends HuntTrigger {
  code = 'nomsg';
}

//
// Hunt CONSEQUENCES
//

export class HuntConsequence extends TypedBase {
  type = 'consequence';
  code: string;
}


export class HcEndGame extends HuntConsequence {
  code = 'end';
}

export class HcSound extends HuntConsequence {
  code = 'sound';
  sound: string;
  constructor(sound: string) {
    super();
    this.sound = sound;
  }
}

export class HcGainItem extends HuntConsequence {
  code = 'gain';
  item: string;
  constructor(item: string) {
    super();
    this.item = item;
  }
}

export class HcGainCountable extends HuntConsequence {
  code = 'score';
  item: string;
  value: number;
  constructor(item: string, value: number) {
    super();
    this.item = item;
    this.value = value;
  }
}

export class HcDropItem extends HuntConsequence {
  code = 'drop';
  item: string;
  constructor(item: string) {
    super();
    this.item = item;
  }
}

export class HcMessage extends HuntConsequence {
  code = 'message';
  text: string;
  constructor(text: string) {
    super();
    this.text = text;
  }
}

export class HcOnce extends HuntConsequence {
  code = 'once';
  item: string;
  first: HuntConsequence;
  others: HuntConsequence;

  constructor(item: string, first: HuntConsequence, others: HuntConsequence) {
    super();
    this.item = item;
    this.first = first;
    this.others = others;
  }
}

export class HcMany extends HuntConsequence {
  code = 'many';
  list: HuntConsequence[];
  constructor(list: HuntConsequence[]) {
    super();
    this.list = list;
  }
}

// Hunt EVENTS

export class HuntEvent extends TypedBase {
  type = 'event';
  code: string;
}

export class HeStart extends HuntEvent {
  code = 'start';
}

export class HeOneItem extends HuntEvent {
  code = 'one';
  item: string;
  constructor(item: string) {
    super();
    this.item = item;
  }
}

export class HeTwoItems extends HuntEvent {
  code = 'two';
  first: string;
  second: string;
  constructor(first: string, second: string) {
    super();
    this.first = first;
    this.second = second;
  }
}
