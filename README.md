# Angular Twitter Timeline

[![npm version](https://img.shields.io/npm/v/angular-twitter-timeline.svg)](https://www.npmjs.com/package/angular-twitter-timeline)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Angular-22-red.svg)](https://angular.io/)

> Embed X (Twitter) timelines in your Angular 22+ applications with ease. Built as a standalone component using modern Angular features including signals and effects.

---

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Migration Guide](#migration-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- ✅ **Angular 22+** - Built for the latest Angular version
- ✅ **Standalone Component** - No NgModule required
- ✅ **Signal Inputs & Computeds** - Modern reactive programming
- ✅ **TypeScript** - Full type safety with strict typing
- ✅ **Tree-shakeable** - Optimized bundle size
- ✅ **SSR Compatible** - Works with Angular Universal
- ✅ **Customizable** - Theme, size, and language options
- ✅ **CLS (Layout Shift) Prevention** - Loading placeholder matches configured height to prevent layout jumps
- ✅ **SEO & Indexing Optimized** - Fallback link structure allows search crawler indexing
- ✅ **No-JS & Adblock Fallback** - Native fallback link remains functional if JavaScript is disabled or blocked
- ✅ **Memory Safe** - Automatically tears down loading subscription on component destruction to prevent leaks
- ✅ **X Platform Updated** - Compatible with latest X API changes

---

## 🎬 Demo

**Live Demo**: [https://angular-twitter-timeline.stackblitz.io](https://angular-twitter-timeline.stackblitz.io)

**Interactive Editor**: [https://stackblitz.com/edit/angular-twitter-timeline](https://stackblitz.com/edit/angular-twitter-timeline?file=src/app/app.component.ts)

---

## 📦 Installation

Install the package via npm:

```bash
npm install angular-twitter-timeline
```

Or using yarn:

```bash
yarn add angular-twitter-timeline
```

Or using pnpm:

```bash
pnpm add angular-twitter-timeline
```

### Requirements

- Angular 22.0.0 or higher
- TypeScript 6.0 or higher

---

## 🚀 Quick Start

### 1. Import the Component (Standalone - Recommended)

```typescript
import { Component } from '@angular/core';
import { AngularTwitterTimelineComponent } from 'angular-twitter-timeline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AngularTwitterTimelineComponent],
  template: `
    <angular-twitter-timeline
      [data]="{sourceType: 'profile', screenName: 'mustafaer_dev'}"
      [opts]="{height: 600, theme: 'light'}">
    </angular-twitter-timeline>
  `
})
export class AppComponent {}
```

### 2. Import in NgModule (Legacy)

If you're using NgModules:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularTwitterTimelineComponent } from 'angular-twitter-timeline';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularTwitterTimelineComponent  // Import as standalone
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## 📖 Usage Examples

### Example 1: Profile Timeline (Light Theme)

Display a user's timeline by their screen name:

```typescript
import { Component } from '@angular/core';
import { AngularTwitterTimelineComponent } from 'angular-twitter-timeline';

@Component({
  selector: 'app-profile-timeline',
  standalone: true,
  imports: [AngularTwitterTimelineComponent],
  template: `
    <angular-twitter-timeline
      [data]="timelineData"
      [opts]="timelineOptions">
    </angular-twitter-timeline>
  `
})
export class ProfileTimelineComponent {
  timelineData = {
    sourceType: 'profile' as const,
    screenName: 'mustafaer_dev'
  };

  timelineOptions = {
    theme: 'light' as const,
    height: 600
  };
}
```

### Example 2: URL Timeline (Dark Theme)

Display a timeline from a specific URL with custom styling:

```typescript
import { Component } from '@angular/core';
import { AngularTwitterTimelineComponent } from 'angular-twitter-timeline';

@Component({
  selector: 'app-url-timeline',
  standalone: true,
  imports: [AngularTwitterTimelineComponent],
  template: `
    <angular-twitter-timeline
      [data]="timelineData"
      [opts]="timelineOptions">
    </angular-twitter-timeline>
  `
})
export class UrlTimelineComponent {
  timelineData = {
    sourceType: 'url' as const,
    url: 'https://twitter.com/angular'
  };

  timelineOptions = {
    theme: 'dark' as const,
    height: 500,
    width: 400
  };
}
```

### Example 3: Responsive Timeline with Language

Display a timeline with custom language and responsive width:

```typescript
import { Component } from '@angular/core';
import { AngularTwitterTimelineComponent } from 'angular-twitter-timeline';

@Component({
  selector: 'app-responsive-timeline',
  standalone: true,
  imports: [AngularTwitterTimelineComponent],
  template: `
    <angular-twitter-timeline
      [data]="timelineData"
      [opts]="timelineOptions">
    </angular-twitter-timeline>
  `
})
export class ResponsiveTimelineComponent {
  timelineData = {
    sourceType: 'profile' as const,
    screenName: 'typescript'
  };

  timelineOptions = {
    theme: 'light' as const,
    height: 700,
    lang: 'en'  // BCP 47 language code
  };
}
```

### Example 4: Dynamic Timeline with Signals

Use Angular signals for reactive timeline updates:

```typescript
import { Component, signal } from '@angular/core';
import { AngularTwitterTimelineComponent } from 'angular-twitter-timeline';

@Component({
  selector: 'app-dynamic-timeline',
  standalone: true,
  imports: [AngularTwitterTimelineComponent],
  template: `
    <div>
      <button (click)="toggleTheme()">Toggle Theme</button>
      <angular-twitter-timeline
        [data]="timelineData()"
        [opts]="timelineOptions()">
      </angular-twitter-timeline>
    </div>
  `
})
export class DynamicTimelineComponent {
  timelineData = signal({
    sourceType: 'profile' as const,
    screenName: 'mustafaer_dev'
  });

  timelineOptions = signal({
    theme: 'light' as const,
    height: 600
  });

  toggleTheme() {
    const current = this.timelineOptions();
    this.timelineOptions.set({
      ...current,
      theme: current.theme === 'light' ? 'dark' : 'light'
    });
  }
}
```

---

## 📚 API Reference

### Component Selector

```typescript
<angular-twitter-timeline [data]="..." [opts]="..."/>
```

### Input Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `data` | `AngularTwitterTimelineDataInterface` | Yes | Timeline data configuration |
| `opts` | `AngularTwitterTimelineOptionsInterface` | No | Timeline display options |

---

### Data Interface

Configure what timeline to display:

```typescript
interface AngularTwitterTimelineDataInterface {
  sourceType: 'profile' | 'url';
  screenName?: string;
  url?: string;
}
```

#### Properties

**`sourceType`** (required)
- **Type**: `'profile' | 'url'`
- **Description**: Type of timeline to embed
- **Values**:
  - `'profile'` - Display user's profile timeline (requires `screenName`)
  - `'url'` - Display timeline from URL (requires `url`)

**`screenName`** (conditional)
- **Type**: `string`
- **Required when**: `sourceType: 'profile'`
- **Description**: X (Twitter) username without @ symbol
- **Example**: `'mustafaer_dev'`, `'angular'`, `'typescript'`

**`url`** (conditional)
- **Type**: `string`
- **Required when**: `sourceType: 'url'`
- **Description**: Absolute URL of X timeline
- **Examples**:
  - `'https://twitter.com/angular'`
  - `'https://x.com/mustafaer_dev'`
  - `'https://twitter.com/angular/likes'`
  - `'https://twitter.com/i/lists/12345'`

> **Note**: `screenName` and `url` are mutually exclusive based on `sourceType`

---

### Options Interface

Customize the timeline appearance:

```typescript
interface AngularTwitterTimelineOptionsInterface {
  height?: number;
  width?: number;
  theme?: 'light' | 'dark';
  lang?: string;
}
```

#### Currently Supported Properties ✅

**`height`** (optional)
- **Type**: `number`
- **Description**: Fixed height of the timeline widget in pixels
- **Range**: 200-2000 (recommended)
- **Default**: 600
- **Example**: `height: 500`

**`width`** (optional)
- **Type**: `number`
- **Description**: Fixed width of the timeline widget in pixels
- **Default**: Responsive (adapts to container)
- **Example**: `width: 400`

**`theme`** (optional)
- **Type**: `'light' | 'dark'`
- **Description**: Color theme of the timeline
- **Default**: `'light'`
- **Example**: `theme: 'dark'`

**`lang`** (optional)
- **Type**: `string`
- **Description**: Language code (BCP 47)
- **Default**: User's browser language
- **Examples**: `'en'`, `'es'`, `'fr'`, `'de'`, `'ja'`, `'pt'`
- **Reference**: [BCP 47 Language Codes](https://www.techonthenet.com/js/language_tags.php)

#### Deprecated Properties ❌

> **⚠️ Important**: X (Twitter) removed support for these parameters in November 2024

The following properties are marked as `@deprecated` and **no longer work**:

- ❌ `tweetLimit` - Cannot limit the number of tweets displayed
- ❌ `borderColor` - Cannot customize border colors
- ❌ `chrome` - Cannot toggle UI elements (noheader, nofooter, etc.)
- ❌ `ariaPolite` - Cannot customize screen reader behavior

**Migration**: Remove these properties from your code. See [X-TIMELINE-UPDATES.md](./X-TIMELINE-UPDATES.md) for details.

---

## 🔄 Migration Guide

### From Version 21 to 22

If you're upgrading from Angular 21, the API remains compatible. Update your Angular dependencies:

```bash
ng update @angular/core @angular/cli
npm install angular-twitter-timeline@latest
```

### From Deprecated Parameters

If you were using deprecated parameters, update your code:

**Before** (No longer works):
```typescript
opts = {
  tweetLimit: 5,          // ❌ Removed
  borderColor: '#1DA1F2', // ❌ Removed
  chrome: ['noheader'],   // ❌ Removed
  theme: 'dark',
  height: 400
};
```

**After** (Current):
```typescript
opts = {
  theme: 'dark',    // ✅ Works
  height: 400,      // ✅ Works
  width: 350,       // ✅ Works (optional)
  lang: 'en'        // ✅ Works (optional)
};
```

For complete migration details, see [X-TIMELINE-UPDATES.md](./X-TIMELINE-UPDATES.md)

---

## 🔧 Troubleshooting

### Timeline Not Displaying

**Problem**: The timeline doesn't show up

**Solutions**:
1. Check browser console for errors
2. Verify the screen name or URL is valid
3. Ensure X (Twitter) widgets script loads (check Network tab)
4. Check if Content Security Policy (CSP) allows Twitter scripts

```html
<!-- Add to index.html if using CSP -->
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' https://platform.twitter.com;">
```

### TypeScript Errors

**Problem**: Type errors with `sourceType`

**Solution**: Use `as const` assertion for string literals:

```typescript
// ✅ Correct
data = { sourceType: 'profile' as const, screenName: 'angular' };

// ❌ Wrong (Type string is not assignable to 'profile' | 'url')
data = { sourceType: 'profile', screenName: 'angular' };
```

### Timeline Not Updating

**Problem**: Timeline doesn't update when data changes

**Solution**: Use signals or ensure change detection:

```typescript
// ✅ Using signals (recommended)
timelineData = signal({ sourceType: 'profile', screenName: 'user1' });
// Update: this.timelineData.set({ sourceType: 'profile', screenName: 'user2' });

// ✅ Using regular properties (create new object)
timelineData = { sourceType: 'profile', screenName: 'user1' };
// Update: this.timelineData = { sourceType: 'profile', screenName: 'user2' };
```

### SSR Issues

**Problem**: Errors during server-side rendering

**Solution**: Check for `window` or `document` availability:

```typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export class MyComponent {
  private platformId = inject(PLATFORM_ID);
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Timeline will render only in browser
    }
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/mustafaer/angular-twitter-timeline.git
cd angular-twitter-timeline

# Install dependencies
npm install

# Build the library
npm run build

# Run demo application
npm run demo
```

### Reporting Issues

Found a bug? Please [open an issue](https://github.com/mustafaer/angular-twitter-timeline/issues) with:
- Angular version
- Browser and version
- Steps to reproduce
- Expected vs actual behavior

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 💖 Support

If this library helps you, consider supporting the development:

- ⭐ [Star on GitHub](https://github.com/mustafaer/angular-twitter-timeline)
- ☕ [Buy me a coffee](https://www.buymeacoffee.com/mustafaer)
- 💰 [Support on Patreon](https://www.patreon.com/mustafaer)

---

## 🔗 Links

- **NPM Package**: [https://www.npmjs.com/package/angular-twitter-timeline](https://www.npmjs.com/package/angular-twitter-timeline)
- **GitHub Repository**: [https://github.com/mustafaer/angular-twitter-timeline](https://github.com/mustafaer/angular-twitter-timeline)
- **Issues & Bugs**: [https://github.com/mustafaer/angular-twitter-timeline/issues](https://github.com/mustafaer/angular-twitter-timeline/issues)
- **X API Updates**: [X-TIMELINE-UPDATES.md](./X-TIMELINE-UPDATES.md)

---

## 📊 Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| Opera | ✅ Latest |

---

**Made with ❤️ by [Mustafa ER](https://github.com/mustafaer)**

