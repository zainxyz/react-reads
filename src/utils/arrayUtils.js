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

/**
 * Merge similar list items in two lists based on a given key.
 * @param  {Array}  oldList The old list
 * @param  {Array}  newList The new list
 * @param  {string} key     The match key
 * @return {Array}         The updated list
 */
const mergeOldAndNewListsByKey = (oldList, newList, key) => {
  // Double check if the passed in lists are indeed an array,
  // if not then return an empty array since we can't iterate over their nonexistent items.
  if (!Array.isArray(oldList) || !Array.isArray(newList)) {
    return [];
  }

  const updatedList = [...newList];

  newList.forEach((newListItem, idx) => {
    const sameItem = oldList.find(oldListItem => newListItem[key] === oldListItem[key]);
    if (!isEmpty(sameItem)) {
      updatedList[idx] = {
        ...newListItem,
        ...sameItem,
      };
    }
  });

  return updatedList;
};

export {
  mergeOldAndNewListsByKey,
  transformArrayIntoString,
};
