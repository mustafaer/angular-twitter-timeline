import { Component, ElementRef, input, effect, inject } from '@angular/core';
import { AngularTwitterTimelineService } from "./angular-twitter-timeline.service";
import { AngularTwitterTimelineOptionsInterface } from "./angular-twitter-timeline-options.interface";
import { AngularTwitterTimelineDataInterface } from "./angular-twitter-timeline-data.interface";

@Component({
  selector: 'angular-twitter-timeline',
  standalone: true,
  template: ``,
  providers: [AngularTwitterTimelineService]
})
export class AngularTwitterTimelineComponent {
  // Modern Angular signals
  data = input<AngularTwitterTimelineDataInterface>();

  /**
   * A hash of additional options to configure the widget
   */
  opts = input<AngularTwitterTimelineOptionsInterface>();

  private element = inject(ElementRef);
  private twitterTimelineService = inject(AngularTwitterTimelineService);

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
    // Use effect to respond to input changes
    effect(() => {
      const currentData = this.data();
      if (currentData && currentData.sourceType) {
        switch (currentData.sourceType) {
          case 'url':
            delete this.defaultData.screenName;
            break;
          case 'profile':
            delete this.defaultData.url;
            break;
          default:
            break;
        }
        this.loadTwitterWidget();
      }
    });
  }

  loadTwitterWidget() {
    this.twitterTimelineService
      .loadScript()
      .subscribe({
        next: () => {
          let nativeElement = this.element.nativeElement;
          nativeElement.innerHTML = "";
          (<any>window)['twttr']
            .widgets
            .createTimeline(
              {...this.defaultData, ...this.data()},
              nativeElement,
              {...this.defaultOpts, ...this.opts()}
            )
            .then(() => {
            })
            .catch((error: any) => console.error(error))
        },
        error: (error: any) => console.error(error),
      });
  }

}
