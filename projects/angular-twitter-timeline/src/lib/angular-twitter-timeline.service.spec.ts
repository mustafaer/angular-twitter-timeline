import { TestBed } from '@angular/core/testing';
import { AngularTwitterTimelineService } from './angular-twitter-timeline.service';
import { PLATFORM_ID } from '@angular/core';

describe('AngularTwitterTimelineService', () => {
  let service: AngularTwitterTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularTwitterTimelineService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(AngularTwitterTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have loadScript method', () => {
    expect(service.loadScript).toBeDefined();
  });
});
