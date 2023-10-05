const NEWLINE_PLACEHOLDER = "§";
const PARAGRAPH_CHARACTER = "\n";

const punctuation: string = `[](){}!?.,:;'"\/*&^%$_+-–—=<>@|~` //This will match any characteristic that is in the previously defined classification sequence
  .split("")
  .join("\\");
const ellipsis: string = "\\.{3}";

// NOTE: changed the origin config, orgin: '[a-zA-Zа-яА-ЯёЁ]+'
const words: string = "[a-zA-ZÀ-ÖØ-öø-ÿА-ЯЁё]+"; // This regular expression matches words containing Latin and Cyrillic characters, including accented Latin characters.
const compounds: string = `${words}-${words}`; // This will match compound words, i.e. two words separated by a hyphen

const newlinesRegex: RegExp = /\n\s*/g;
const tokenizeRegex: RegExp = new RegExp(
  `(${ellipsis}|${compounds}|${words}|[${punctuation}])`,
);

// remove empty string
function exists(entity: string): Boolean {
  return !!entity;
}

export function tokenize(text: string): string[] {
  return text
    .replaceAll(newlinesRegex, NEWLINE_PLACEHOLDER)
    .split(tokenizeRegex)
    .filter(exists);
}

export function textify(tokens: string[]): string {
  return tokens
    .filter(exists)
    .join("")
    .replaceAll(NEWLINE_PLACEHOLDER, PARAGRAPH_CHARACTER);
}
