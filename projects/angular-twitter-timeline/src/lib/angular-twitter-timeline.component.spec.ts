import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularTwitterTimelineComponent } from './angular-twitter-timeline.component';
import { AngularTwitterTimelineService } from './angular-twitter-timeline.service';
import { of } from 'rxjs';
import { ComponentRef, PLATFORM_ID } from '@angular/core';

describe('AngularTwitterTimelineComponent', () => {
  let component: AngularTwitterTimelineComponent;
  let fixture: ComponentFixture<AngularTwitterTimelineComponent>;
  let componentRef: ComponentRef<AngularTwitterTimelineComponent>;
  let mockTwitterService: jasmine.SpyObj<AngularTwitterTimelineService>;

  beforeEach(async () => {
    mockTwitterService = jasmine.createSpyObj('AngularTwitterTimelineService', ['loadScript']);
    mockTwitterService.loadScript.and.returnValue(of({}));

    // Mock window.twttr
    (window as any).twttr = {
      widgets: {
        createTimeline: jasmine.createSpy('createTimeline').and.returnValue(Promise.resolve())
      }
    };

    await TestBed.configureTestingModule({
      imports: [AngularTwitterTimelineComponent],
      providers: [
        { provide: AngularTwitterTimelineService, useValue: mockTwitterService },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AngularTwitterTimelineComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  afterEach(() => {
    // Clean up global mock
    delete (window as any).twttr;
  });

  it('should create', () => {
    componentRef.setInput('data', { sourceType: 'profile', screenName: 'test_user' });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call loadScript on initialization', fakeAsync(() => {
    componentRef.setInput('data', { sourceType: 'profile', screenName: 'test_user' });

    fixture.detectChanges();
    tick();

    expect(mockTwitterService.loadScript).toHaveBeenCalled();
  }));

  it('should compute fallbackUrl and displayName based on input', fakeAsync(() => {
    componentRef.setInput('data', { sourceType: 'profile', screenName: 'test_user' });
    fixture.detectChanges();
    tick();

    expect(component.fallbackUrl()).toBe('https://twitter.com/test_user');
    expect(component.displayName()).toBe('test_user');

    componentRef.setInput('data', { sourceType: 'url', url: 'https://twitter.com/test' });
    fixture.detectChanges();
    tick();

    expect(component.fallbackUrl()).toBe('https://twitter.com/test');
    expect(component.displayName()).toBe('test');
  }));

  it('should toggle loading state when timeline is created', fakeAsync(() => {
    componentRef.setInput('data', { sourceType: 'profile', screenName: 'test_user' });
    
    // Initial state before load completion
    expect(component.loading()).toBeTrue();

    fixture.detectChanges();
    tick();

    // Mock service returns immediately, so loading becomes false
    expect(component.loading()).toBeFalse();
  }));
});
