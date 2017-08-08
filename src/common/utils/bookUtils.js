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
 * Convert the given list of authors into a single string for better readability
 * @param  {Object}      authors The authors of the given book
 * @return {string|null}
 */
const transformBookAuthorsToString = (authors) => (!isEmpty(authors) ?
  authors.reduce((res, author) => (
      res ? `${res}, ${author}` : `${author}`
    ),
    ''
  ) : null
);

const buildBookImageUrl = (id, zoom) =>
  `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}&edge=curl&source=gbs_api`;

export {
  buildBookImageUrl,
  filterBooksListByShelfId,
  transformBookAuthorsToString,
};
