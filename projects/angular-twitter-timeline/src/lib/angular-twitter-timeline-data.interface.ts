export class AngularTwitterTimelineDataInterface {
  /**
   * profile or URL
   */
  sourceType: string = 'profile';
  /**
   * Valid Twitter username
   */
  screenName?: string;
  /**
   * Absolute URL of a Twitter profile, likes, list, or collection
   */
  url?: string;
}
