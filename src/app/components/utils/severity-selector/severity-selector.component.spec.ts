import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeveritySelectorComponent } from './severity-selector.component';

describe('SeveritySelectorComponent', () => {
  let component: SeveritySelectorComponent;
  let fixture: ComponentFixture<SeveritySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeveritySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeveritySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
