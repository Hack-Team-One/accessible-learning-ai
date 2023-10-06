export function toFirstLetterUppercase(text: string | undefined): string | undefined {
  if (!text) {
    return text;
  }
  return text[0].toUpperCase() + text.slice(1);
}
  
export function camelCaseToUpperCaseSpaces(text: string | undefined): string | undefined {
  if (!text) {
    return text;
  }

  // Replace camel case with spaces before each uppercase letter (except after special characters)
  const spaced = text.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

  // Capitalize the first letter of each word or the letter following a hyphen
  return spaced.replace(/\b\w|-\w/g, letter => letter.toUpperCase());
}
  