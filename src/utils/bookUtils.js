import isEmpty from 'lodash/isEmpty';

/**
 * Filter the given books list based on the given shelfId (shelf name in this case)
 * @param  {Array}  booksList The list of books
 * @param  {string} shelfId   The id of the designated shelf
 * @return {Array}            The filtered list of books
 */
const filterBooksListByShelfId = (booksList, shelfId) =>
  booksList.filter(book => book.shelf === shelfId);

/**
 * Build the book image url based on a given id and zoom level
 * NOTE: This is more of a helper method than an actual url generator function.
 * This is so we can display the larger version of the book's cover image.
 *
 * @param  {string} id   The bookId
 * @param  {number} zoom The zoom level for grabbing the image
 * @return {string}      The final url
 */
const buildBookCoverImageUrl = (id, zoom) =>
  `http://books.google.com/books/content?id=${id}` +
  `&printsec=frontcover&img=1&zoom=${zoom}&edge=curl&source=gbs_api`;

/**
 * Translate the given shelf name to a human readable shelf name,
 * as well as append a 'Books I' to the shelf name
 * @param  {string} shelfId        The shelf ID
 * @param  {Object} shelfTitlesMap The bookshelf title map
 * @return {string}
 */
const translateBookShelfName = (shelfId, shelfTitlesMap) => {
  const shelfName = shelfTitlesMap[shelfId];

  if (!isEmpty(shelfName)) {
    return `Books I ${shelfTitlesMap[shelfId]}`;
  }

  // TODO: Add a link to let the user add the book to their desired bookshelf in the MyReads Library.
  return 'Currently not in MyReads Library';
};

/**
 * Get the requested Industry Identifier from the given list of Industry Identifiers via an Id
 * @param  {Array}  list A list of industry identifiers
 * @param  {string} id   The identifier type to find
 * @return {string}
 */
const getBookIdentifierById = (list, id) => {
  const industry = (!isEmpty(list) &&
    Array.isArray(list) ?
    list.find(item => item.type === id) : ''
  );

  return (!isEmpty(industry) &&
    industry.identifier ?
    industry.identifier : ''
  );
};

export {
  buildBookCoverImageUrl,
  filterBooksListByShelfId,
  getBookIdentifierById,
  translateBookShelfName,
};
