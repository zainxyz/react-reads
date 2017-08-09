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

/**
 * The options for the select drop-down to move book from one shelf to another
 * TODO: For now these options reside in this BookConstants file, maybe in future
 * these can be dynamically generated based on a list of available bookShelf Ids?
 * @type {Array}
 */
const SELECT_LIST_OPTIONS = [
  {
    "value": "currentlyReading",
    "label": "Currently Reading",
  },
  {
    "value": "wantToRead",
    "label": "Want to Read",
  },
  {
    "value": "read",
    "label": "Read",
  },
  {
    "value": "none",
    "label": "None",
  }
];

export {
  SELECT_LIST_OPTIONS,
  SHELF_TITLES_LIST,
  SHELF_TITLES_MAP,
};
