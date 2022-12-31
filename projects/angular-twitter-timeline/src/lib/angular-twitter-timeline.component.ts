import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { AngularTwitterTimelineService } from "./angular-twitter-timeline.service";
import { AngularTwitterTimelineOptionsInterface } from "./angular-twitter-timeline-options.interface";
import { AngularTwitterTimelineDataInterface } from "./angular-twitter-timeline-data.interface";

@Component({
  selector: 'angular-twitter-timeline',
  template: ``,
  styles: []
})
export class AngularTwitterTimelineComponent implements OnChanges {
  @Input() data?: AngularTwitterTimelineDataInterface;
  /**
   * A hash of additional options to configure the widget
   */
  @Input() opts?: AngularTwitterTimelineOptionsInterface;

  defaultOpts: AngularTwitterTimelineOptionsInterface = {
    tweetLimit: 5
  };

  defaultData: AngularTwitterTimelineDataInterface = {
    sourceType: 'url',
    url: 'https://twitter.com/mustafaer_dev',
    screenName: 'Mustafa ER'
  };

  constructor(
    private element: ElementRef,
    private twitterTimelineService: AngularTwitterTimelineService
  ) {
  }

  ngOnChanges() {
    if (this.data && this.data.sourceType) {
      switch (this.data.sourceType) {
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
              { ...this.defaultData, ...this.data },
              nativeElement,
              { ...this.defaultOpts, ...this.opts }
            )
            .then(() => {
            })
            .catch((error: any) => console.error(error))
        },
        error: (error: any) => console.error(error),
      });
  }

}
