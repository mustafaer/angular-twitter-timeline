# X (Twitter) Embedded Timelines Parameter Updates

This document summarizes the timeline parameter changes made by X (Twitter) in late 2024, which deprecated several previously supported customization options.

## Deprecated Parameters (No Longer Functional)

The following parameters have been fully deprecated by the X platform and no longer affect the rendered timeline widget:

- **`tweetLimit`**: You can no longer limit the number of tweets displayed dynamically. The timeline will load a default scrollable list.
- **`chrome`**: Options such as `noheader`, `nofooter`, `noborders`, and `transparent` are no longer supported.
- **`borderColor`**: Setting a custom border color is no longer supported.
- **`ariaPolite`**: Customized accessibility politeness parameters are no longer supported.

## Supported Parameters

The following parameters remain fully functional and supported by `angular-twitter-timeline`:

- **`theme`**: Sets the color theme of the widget. Supports `'light'` or `'dark'`.
- **`height`**: Sets a fixed height of the widget (positive integer in pixels, recommended 200-2000).
- **`width`**: Sets a fixed width of the widget (positive integer in pixels). If not specified, the widget is responsive.
- **`lang`**: Sets the language code (BCP 47 language code, e.g., `'en'`, `'es'`, `'fr'`).
