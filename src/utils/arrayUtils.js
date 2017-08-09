import isEmpty from 'lodash/isEmpty';

/**
 * Convert the given list of strings into a single string for better readability
 * Can use the native Array.join() method instead of this function, but then you won't have the
 * capability of capturing null values or empty lists.
 * @param  {Object}      list The list of strings
 * @return {string|null}
 */
const transformArrayIntoString = (list) => (!isEmpty(list) &&
  Array.isArray(list) ?
  list.join(', ') : list
);

export {
  transformArrayIntoString,
};
