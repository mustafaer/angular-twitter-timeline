import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AngularTwitterTimelineService {
  private TWITTER_SCRIPT_ID = 'twitter-wjs';
  private TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';

  loadScript(): Observable<any> {
    return new Observable((observer) => {

      this.startScriptLoad();

      (<any>window)['twttr'].ready((twttr: any) => {
        observer.next(twttr);
        observer.complete();
      });

    });
  }

  private startScriptLoad() {
    (<any>window)['twttr'] = (function (d, s, id, url) {
      let script: any,
        firstScriptEl: any = d.getElementsByTagName(s)[0],
        twitterScript: any = (<any>window)['twttr'] || {};
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
