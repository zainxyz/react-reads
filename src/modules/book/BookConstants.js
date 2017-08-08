/**
 * A map/dictionary containing the different bookshelf names in the MyReads Library.
 * @type {Object}
 */
const SHELF_TITLES_MAP = {
  currentlyReading: 'Currently Enjoy Reading',
  wantToRead: 'Want to Read',
  read: 'Already Read',
};

/**
 * A list of the different bookshelf names in the MyReads Library.
 * @type {[type]}
 */
const SHELF_TITLES_LIST =
  Object.keys(SHELF_TITLES_MAP).map(key => SHELF_TITLES_MAP[key]);

export {
  SHELF_TITLES_MAP,
  SHELF_TITLES_LIST,
};
