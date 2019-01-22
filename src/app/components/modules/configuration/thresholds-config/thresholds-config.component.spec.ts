import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdsConfigComponent } from './thresholds-config.component';

describe('ThresholdsConfigComponent', () => {
  let component: ThresholdsConfigComponent;
  let fixture: ComponentFixture<ThresholdsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThresholdsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
