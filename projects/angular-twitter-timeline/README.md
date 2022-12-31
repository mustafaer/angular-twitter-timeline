# Angular Twitter Timeline
Embed Twitter Timeline in Angular application.

## Installation

To install this library, run:

```bash
$ npm i angular-twitter-timeline
```

## Usage

Import in your Angular app:


```typescript
// Import angular-twitter-timeline
import {AngularTwitterTimelineModule} from "angular-twitter-timeline";

@NgModule({
  ...
  imports: [
    ...,
    AngularTwitterTimelineModule
  ],
    ...
})
export class AppModule { }
```

Once the library is imported, you can use its component in your Angular application:

```xml
<!-- You can now use the library component in app.component.html -->
<angular-twitter-timeline 
	[data]="{sourceType: 'profile', url: 'mustafaer_dev'}"
	[opts]="{tweetLimit: 5}"
></angular-twitter-timeline>
```

## Data
Data can take value of `url` or `profile`.  
If `url` is set, you have to provide a valid Twitter URL;  
If `profile` is set, you have to set `screenName` as a valid Twitter screen name. E.g. `@mustafaer_dev`.

```typescript

`url` and `screenName` are mutually exclusive.

```typescript
AngularTwitterTimelineDataInterface {
  /**
   * profile or URL
   */
  sourceType: string;
  /**
   * Valid Twitter username
   */
  screenName?: string;
  /**
   * Absolute URL of a Twitter profile, likes, list, or collection
   */
  url: string;
}
```

## Options
```typescript
AngularTwitterTimelineOptionsInterface {
  /**
   * Render a timeline statically, displaying only n number of Tweets.
   */
  tweetLimit?: number;
  /**
   * Set a fixed height of the embedded widget
   * Positive integer
   */
  height?: number;
  /**
   * Adjust the color of borders inside the widget.
   * Hexadecimal color
   */
  borderColor?: string;
  /**
   * Sets the theme of the widget. Default = 'light'.
   * 'light' or 'dark'
   */
  theme?: string;
  /**
   * Toggle the display of design elements in the widget. This parameter is a space-separated list of values
   * Values: noheader, nofooter, noborders, transparent, noscrollbar
   */
  chrome?: string[];
  /**
   * Apply the specified aria-polite behavior to the rendered timeline.
   * New Tweets may be added to the top of a timeline, affecting screen readers
   * Values: polite, assertive, rude
   */
  ariaPolite?: string[];
}
```
