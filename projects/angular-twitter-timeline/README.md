# Angular Twitter Timeline

Embed Twitter Timeline in Angular application.

## Installation

To install this library, run:

```bash
$ npm i angular-twitter-timeline
```

## Usage

### Standalone Component (Recommended for Angular 20)

Import the component directly in your Angular app:

```ts
// Import angular-twitter-timeline standalone component
import { AngularTwitterTimelineComponent } from "angular-twitter-timeline";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AngularTwitterTimelineComponent],
  templateUrl: './app.component.html'
})
export class AppComponent { }
```

### Module-based (Legacy)

If you're still using NgModules:

```ts
// Import angular-twitter-timeline
import { AngularTwitterTimelineComponent } from "angular-twitter-timeline";

@NgModule({
  ...
    imports: [
  ...,
  AngularTwitterTimelineComponent
],
...
})
export class AppModule { }
```

Once the library is imported, you can use its component in your Angular application:

```xml
<!-- You can now use the library component in app.component.html -->
<angular-twitter-timeline
  [data]="{sourceType: 'profile', screenName: 'mustafaer_dev'}"
  [opts]="{height: 600, theme: 'light'}"
  ></angular-twitter-timeline>
```

> **⚠️ Important Update**: X (Twitter) has deprecated several timeline parameters. See the main README for details.

## Data

Data can take value of `url` or `profile`.
If `url` is set, you have to provide a valid Twitter/X URL;
If `profile` is set, you have to set `screenName` as a valid Twitter/X screen name (without @ symbol). E.g. `mustafaer_dev`.

`url` and `screenName` are mutually exclusive.

```ts
AngularTwitterTimelineDataInterface {
  /**
   * Type of timeline to embed
   */
  sourceType: 'profile' | 'url';
  /**
   * Valid X (Twitter) username (without @ symbol)
   */
  screenName?: string;
  /**
   * Absolute URL of an X (Twitter) profile, likes, list, or collection
   */
  url?: string;
}
```

## Options

### Currently Supported ✅

```ts
AngularTwitterTimelineOptionsInterface {
  /**
   * Set a fixed height of the embedded widget (in pixels)
   */
  height?: number;
  /**
   * Set a fixed width of the embedded widget (in pixels)
   */
  width?: number;
  /**
   * Sets the theme of the widget
   */
  theme?: 'light' | 'dark';
  /**
   * Language code (BCP 47)
   */
  lang?: string;
}
```

### Deprecated ❌

The following parameters are deprecated and no longer functional:
- `tweetLimit`
- `borderColor`
- `chrome`
- `ariaPolite`

