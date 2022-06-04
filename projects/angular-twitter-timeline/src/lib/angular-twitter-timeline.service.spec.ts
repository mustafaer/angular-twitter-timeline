import {TestBed} from '@angular/core/testing';

import {AngularTwitterTimelineService} from './angular-twitter-timeline.service';

describe('AngularTwitterTimelineService', () => {
  let service: AngularTwitterTimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularTwitterTimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
