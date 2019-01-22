import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesConfigComponent } from './nodes-config.component';

describe('NodesConfigComponent', () => {
  let component: NodesConfigComponent;
  let fixture: ComponentFixture<NodesConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
