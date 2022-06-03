import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTwitterTimelineComponent } from './angular-twitter-timeline.component';

describe('AngularTwitterTimelineComponent', () => {
  let component: AngularTwitterTimelineComponent;
  let fixture: ComponentFixture<AngularTwitterTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularTwitterTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTwitterTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
