/**
 * Value parsing utilities for command line arguments
 * @module @funish/argv/argc
 */

/**
 * Parses a command line argument value and converts it to the appropriate type
 * Currently supports:
 * - Numbers (integers and floats)
 * - Strings (default)
 *
 * @param value The string value to parse
 * @returns The value converted to its appropriate type (number or string)
 * @example
 * ```ts
 * parseArgc('123');    // Returns: 123 (number)
 * parseArgc('12.34');  // Returns: 12.34 (number)
 * parseArgc('hello');  // Returns: 'hello' (string)
 * ```
 */
export function parseArgc(value: string) {
  if (!Number.isNaN(Number(value))) {
    return Number(value);
  }
  return value;
}
