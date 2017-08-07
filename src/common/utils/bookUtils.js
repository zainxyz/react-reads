/**
 * Filter the given books list based on the given shelfId (shelf name in this case)
 * @param  {Array}  booksList The list of books
 * @param  {String} shelfId   The id of the designated shelf
 * @return {Array}            The filtered list of books
 */
const filterBooksListByShelfId = (booksList, shelfId) =>
  booksList.filter(book => book.shelf === shelfId);

export {
  filterBooksListByShelfId,
};
