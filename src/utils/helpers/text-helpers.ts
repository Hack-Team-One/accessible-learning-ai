/**
 * Convert the first letter of a string to uppercase
 * @param text - The input string
 * @returns The string with its first letter converted to uppercase
 */
export function toFirstLetterUppercase(text: string | undefined): string | undefined {
    if (!text) {
      return text;
    }
    return text[0].toUpperCase() + text.slice(1);
  }
  
  /**
   * Convert a camel case string to a capitalized string with spaces
   * @param text - A camel case string (possibly with hyphens as well)
   * @returns A string that has a space before each
   * uppercase letter (except after a hyphen) and all words are capitalized.
   */
  export function camelCaseToUpperCaseSpaces(text: string | undefined): string | undefined {
    if (!text) {
      return text;
    }
  
    // Replace camel case with spaces before each uppercase letter (except after special characters)
    const spaced = text.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  
    // Capitalize the first letter of each word or the letter following a hyphen
    return spaced.replace(/\b\w|-\w/g, letter => letter.toUpperCase());
  }
  