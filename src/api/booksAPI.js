import isEmpty from 'lodash/isEmpty';

import { GET, PUT, POST } from './HTTP';

/**
 * The Main API Url
 * @type {string}
 * @memberOf DudeThisRocks
 */
const APIUrl = 'https://reactnd-books-api.udacity.com';

/**
 * A uniquely generated token for storing bookshelf data on the backend server.
 * @type {string}
 */
let token = localStorage.token;

// If token is not present, then set one in the localStorage by generating a new token.
if (isEmpty(token)) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

// Add-on headers for the booksAPI calls
const headers = {
  Authorization: token,
};

/**
 * Fetch a book by a given bookId
 * @param  {string} bookId The id of the book to fetch
 * @return {Object}
 */
export const getBookById = bookId =>
  GET({ url: `${APIUrl}/books/${bookId}`, headers, });

/**
 * Fetch all of the books at once
 * @return {Object} List of all the books
 */
export const getAllBooks = () =>
  GET({ url: `${APIUrl}/books`, headers, });

/**
 * Move a given book to a different bookshelf
 * @param  {string} bookId The id of the book to update
 * @param  {string} shelf  The updated shelf name for the given bookId
 * @return {Object}
 */
export const moveBookToShelf = (bookId, shelf) =>
  PUT({ url: `${APIUrl}/books/${bookId}`, headers, body: { shelf, }, });

/**
 * Search for books given a search string
 * @param  {Object} query      The search string
 * @param  {number} maxResults The maximum number of results requested
 * @return {Array|Object}
 */
export const searchBooks = (query, maxResults) =>
  POST({ url: `${APIUrl}/search`, headers, body: { query, maxResults, }, });
