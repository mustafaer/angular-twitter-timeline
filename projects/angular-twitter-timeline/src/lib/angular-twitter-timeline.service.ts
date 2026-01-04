import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AngularTwitterTimelineService {
  private readonly TWITTER_SCRIPT_ID = 'twitter-wjs';
  private readonly TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';
  private platformId = inject(PLATFORM_ID);

  loadScript(): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    return new Observable((observer) => {
      this.startScriptLoad();

      if ((<any>window)['twttr'] && (<any>window)['twttr'].ready) {
        (<any>window)['twttr'].ready((twttr: any) => {
          observer.next(twttr);
          observer.complete();
        });
      } else {
        // Fallback if ready is not available immediately
        const checkInterval = setInterval(() => {
           if ((<any>window)['twttr'] && (<any>window)['twttr'].ready) {
             clearInterval(checkInterval);
             (<any>window)['twttr'].ready((twttr: any) => {
               observer.next(twttr);
               observer.complete();
             });
           }
        }, 100);
      }
    });
  }

  private startScriptLoad(): void {
    if (document.getElementById(this.TWITTER_SCRIPT_ID)) {
      return;
    }

    (<any>window)['twttr'] = (function (d, s, id, url) {
      let script: any;
      let firstScriptEl: any = d.getElementsByTagName(s)[0];
      let twitterScript: any = (<any>window)['twttr'] || {};

      if (d.getElementById(id)) {
        return twitterScript;
      }

      script = d.createElement(s);
      script.id = id;
      script.src = url;
      firstScriptEl.parentNode.insertBefore(script, firstScriptEl);

      twitterScript._e = [];

      twitterScript.ready = function (f: any) {
        twitterScript._e.push(f);
      };

      return twitterScript;
    }(document, 'script', this.TWITTER_SCRIPT_ID, this.TWITTER_WIDGET_URL));
  }
}
