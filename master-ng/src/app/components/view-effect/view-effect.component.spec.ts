import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEffectComponent } from './view-effect.component';

describe('ViewEffectComponent', () => {
  let component: ViewEffectComponent;
  let fixture: ComponentFixture<ViewEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
