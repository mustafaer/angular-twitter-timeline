/**
 * Interface for X (Twitter) Embedded Timeline data configuration
 * Updated for X platform changes (November 2024)
 */
export class AngularTwitterTimelineDataInterface {
  /**
   * Type of timeline to embed
   * 'profile' - User profile timeline
   * 'url' - Timeline from a specific URL (profile, likes, list, or collection)
   */
  sourceType: 'profile' | 'url' = 'profile';

  /**
   * Valid X (Twitter) username (without @ symbol)
   * Used when sourceType is 'profile'
   * Example: 'mustafaer_dev'
   */
  screenName?: string;

  /**
   * Absolute URL of an X (Twitter) profile, likes, list, or collection
   * Used when sourceType is 'url'
   * Example: 'https://twitter.com/angular' or 'https://x.com/angular'
   */
  url?: string;
}
