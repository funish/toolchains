/**
 * Type definitions for command line argument parsing
 * @module @funish/argv/types
 */

/**
 * Interface representing parsed command line arguments
 * @interface Args
 * @property {string[]} _ Array of positional arguments (not starting with - or --)
 * @property {string | boolean | number | string[]} [key] Named arguments with their values
 * @example
 * ```ts
 * const args: Args = {
 *   _: ['file1.txt', 'file2.txt'],
 *   port: 3000,
 *   debug: true,
 *   name: 'test'
 * };
 * ```
 */
export interface Args {
  _: string[];
  [key: string]: string | boolean | number | string[];
}
