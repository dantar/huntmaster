import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTriggerComponent } from './view-trigger.component';

describe('ViewTriggerComponent', () => {
  let component: ViewTriggerComponent;
  let fixture: ComponentFixture<ViewTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
