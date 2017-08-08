import isEmpty from 'lodash/isEmpty';

/**
 * Convert the given list of strings into a single string for better readability
 * @param  {Object}      list The list of strings
 * @return {string|null}
 */
const transformArrayIntoString = (list) => (!isEmpty(list) &&
  Array.isArray(list) ?
  list.reduce((res, str) => (
      res ? `${res}, ${str}` : `${str}`
    ),
    ''
  ) : null
);

export {
  transformArrayIntoString,
};
