/**
 * Updated interface for X (Twitter) Embedded Timeline options
 * Based on the latest X platform changes (November 2024)
 * Reference: https://twittercommunity.com/t/embedded-timelines-update-parameters-support/177112
 *
 * DEPRECATED PARAMETERS (no longer supported):
 * - tweetLimit (removed)
 * - chrome (removed)
 * - ariaPolite (removed)
 * - borderColor (removed)
 */
export class AngularTwitterTimelineOptionsInterface {
  /**
   * Set a fixed height of the embedded widget
   * Positive integer (in pixels)
   * Recommended range: 200-2000
   */
  height?: number;

  /**
   * Set a fixed width of the embedded widget
   * Positive integer (in pixels)
   * Note: Timeline will be responsive if not specified
   */
  width?: number;

  /**
   * Sets the theme of the widget. Default = 'light'.
   * Supported values: 'light' or 'dark'
   */
  theme?: 'light' | 'dark';

  /**
   * Language code for the rendered timeline
   * BCP 47 language code (e.g., 'en', 'es', 'fr', 'de', 'ja')
   * Default: User's browser language
   */
  lang?: string;

  /**
   * @deprecated This parameter is no longer supported by X (Twitter)
   * Previously used to limit the number of tweets displayed
   */
  tweetLimit?: number;

  /**
   * @deprecated This parameter is no longer supported by X (Twitter)
   * Previously used to adjust border colors
   */
  borderColor?: string;

  /**
   * @deprecated This parameter is no longer supported by X (Twitter)
   * Previously used to toggle display elements (noheader, nofooter, etc.)
   */
  chrome?: string[];

  /**
   * @deprecated This parameter is no longer supported by X (Twitter)
   * Previously used for aria-polite behavior
   */
  ariaPolite?: string[];
}
