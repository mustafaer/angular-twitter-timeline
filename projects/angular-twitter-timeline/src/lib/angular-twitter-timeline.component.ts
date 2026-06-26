import { Component, ElementRef, input, effect, inject, ChangeDetectionStrategy, PLATFORM_ID, computed, signal, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { AngularTwitterTimelineService } from "./angular-twitter-timeline.service";
import { AngularTwitterTimelineOptionsInterface } from "./angular-twitter-timeline-options.interface";
import { AngularTwitterTimelineDataInterface } from "./angular-twitter-timeline-data.interface";

@Component({
  selector: 'angular-twitter-timeline',
  standalone: true,
  host: {
    '[class.loading]': 'loading()'
  },
  template: `
    @if (loading()) {
      <div class="loading-placeholder" [style.height]="height()" role="status" aria-live="polite">
        <div class="spinner" aria-hidden="true"></div>
        <span>Loading Tweets...</span>
      </div>
    }
    <a class="twitter-timeline"
       [href]="fallbackUrl()"
       [attr.aria-label]="'Tweets by ' + displayName()">
      Tweets by {{ displayName() }}
    </a>
    <noscript>
      <a class="twitter-timeline-noscript"
         [href]="fallbackUrl()"
         [attr.aria-label]="'Tweets by ' + displayName()">
        Tweets by {{ displayName() }}
      </a>
    </noscript>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-height: 100px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    :host(.loading) .twitter-timeline {
      display: none;
    }
    .loading-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      color: #657786;
      font-size: 0.9rem;
      gap: 0.75rem;
    }
    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid #e1e8ed;
      border-top-color: #1da1f2;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .twitter-timeline, .twitter-timeline-noscript {
      color: #1da1f2;
      text-decoration: none;
      font-weight: 500;
    }
    .twitter-timeline:hover, .twitter-timeline-noscript:hover {
      text-decoration: underline;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularTwitterTimelineComponent {
  // Modern Angular signals
  data = input.required<AngularTwitterTimelineDataInterface>();

  /**
   * A hash of additional options to configure the widget
   */
  opts = input<AngularTwitterTimelineOptionsInterface>();

  loading = signal(true);

  fallbackUrl = computed(() => {
    const currentData = this.data();
    if (!currentData) return 'https://twitter.com';
    if (currentData.sourceType === 'url') {
      return currentData.url || 'https://twitter.com';
    }
    return `https://twitter.com/${currentData.screenName || ''}`;
  });

  displayName = computed(() => {
    const currentData = this.data();
    if (!currentData) return 'Twitter';
    if (currentData.sourceType === 'url') {
      return currentData.url ? currentData.url.split('/').pop() : 'Twitter';
    }
    return currentData.screenName || 'Twitter';
  });

  height = computed(() => {
    const options = this.opts();
    if (options && options.height) {
      return typeof options.height === 'number' ? `${options.height}px` : options.height;
    }
    return `${this.defaultOpts.height}px`;
  });

  private element = inject(ElementRef);
  private twitterTimelineService = inject(AngularTwitterTimelineService);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private scriptSubscription?: Subscription;

  defaultOpts: AngularTwitterTimelineOptionsInterface = {
    theme: 'light',
    height: 600
  };

  defaultData: AngularTwitterTimelineDataInterface = {
    sourceType: 'url',
    url: 'https://twitter.com/mustafaer_dev',
    screenName: 'Mustafa ER'
  };

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.scriptSubscription?.unsubscribe();
    });

    // Use effect to respond to input changes
    effect(() => {
      const currentData = this.data();
      if (currentData && currentData.sourceType) {
        this.loadTwitterWidget();
      }
    });
  }

  loadTwitterWidget() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loading.set(true);
    this.scriptSubscription?.unsubscribe();

    this.scriptSubscription = this.twitterTimelineService
      .loadScript()
      .subscribe({
        next: () => {
          let nativeElement = this.element.nativeElement;
          
          if (!(<any>window)['twttr'] || !(<any>window)['twttr'].widgets) {
            console.error('Twitter widgets script loaded but twttr or twttr.widgets is not defined.');
            this.loading.set(false);
            return;
          }

          // Clear loading placeholder and fallback link from DOM right before widget creation
          nativeElement.innerHTML = "";

          const combinedData = { ...this.defaultData, ...this.data() };
          if (combinedData.sourceType === 'url') {
            delete combinedData.screenName;
          } else if (combinedData.sourceType === 'profile') {
            delete combinedData.url;
          }

          (<any>window)['twttr']
            .widgets
            .createTimeline(
              combinedData,
              nativeElement,
              {...this.defaultOpts, ...this.opts()}
            )
            .then(() => {
              this.loading.set(false);
            })
            .catch((error: any) => {
              console.error(error);
              this.loading.set(false);
            });
        },
        error: (error: any) => {
          console.error(error);
          this.loading.set(false);
        },
      });
  }

}
