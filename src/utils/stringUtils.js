import templateRegex from 'es6-template-regex';

/**
 * Replace multiple values in a given text (string) with the corresponding
 * values from the given dictionary
 * @param  {string} text       The string containing es5 ${} curly
 * @param  {Object} dictionary The dictionary to use for text replacement
 * @return {string}
 */
const textReplacement = (text, dictionary) =>
  text.replace(templateRegex(), (noop, key) =>
    dictionary[key] || ''
  );

export {
  textReplacement,
};
