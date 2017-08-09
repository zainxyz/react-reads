import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import SelectList from 'common/selectList';
import { moveBookToShelf } from 'api/booksAPI';
import { transformArrayIntoString } from 'utils/arrayUtils';

import * as BookConstants from './BookConstants';

/**
 * Render the book cover
 * @param {string} title      The title of the book cover
 * @param {Object} imageLinks The image links for the book cover
 * @param {Object} style      The style attribute for the book cover
 * @param {string} subtitle   The subtitle of the book cover
 * @return {JSX}
 */
const renderBookCover = (title, imageLinks, style, subtitle) => {
  // Create the image source link
  const imgSrc =
    imageLinks &&
    imageLinks.thumbnail ?
    imageLinks.thumbnail : '';

  // Build the alternate text for the image
  let altText = `Book: ${title}`;

  // Append the 'subtitle' of the book (to the altText) if one is present
  if (!isEmpty(subtitle)) {
    altText = `${altText} (${subtitle})`;
  }

  return (
    <img
      alt={altText}
      className="book-cover"
      src={imgSrc}
      style={style}
      title={title}
    />
  );
};

/**
 * Render a book shelf changer (a simple select input)
 * @param {Function} onSelectChange The callback function
 * @param {string}   value          The value for the select input
 * @param {Array}    options        The list of options for the select input
 * @return {JSX}
 */
const renderBookShelfChanger = (onSelectChange, value, options) => (
  <div className="book-shelf-changer">
    <SelectList
      defaultValue="Move to shelf..."
      onBlur={onSelectChange}
      options={options}
      value={value}
    />
  </div>
);

/**
 * Render the author's names, if present otherwise render the publisher's name if present
 * @param  {Array}  authors   The authors list
 * @param  {string} publisher The name of the publisher
 * @return {string}
 */
const renderAuthors = (authors, publisher) => (
  authors ?
  transformArrayIntoString(authors) : (
    publisher ?
    publisher : ''
  )
);

/**
 * Render a 'view details' link underneath the book
 * @param  {string}  id              The book id
 * @param  {boolean} viewDetailsLink Should we display the link?
 * @return {JSX}
 */
const renderDetailsLink = (id, viewDetailsLink) => (
  viewDetailsLink ?
  (
    <Link
      className="nav-link book-details-link"
      to={`/book/${id}`}
    >
      View Details
    </Link>
  ) : null
);

/**
 * Render a single book with all the required information.
 * @param  {Array}    options.authors         The list of authors
 * @param  {string}   options.id              The book id
 * @param  {Object}   options.imageLinks      The links for the image thumbnails
 * @param  {Function} options.onShelfChange   The callback for changing the book's current shelf
 * @param  {string}   options.publisher       The publisher of the book
 * @param  {string}   options.shelf           The current shelf that the book is on
 * @param  {Object}   options.style           The styles for the book
 * @param  {string}   options.subtitle        The subtitle for the book
 * @param  {string}   options.title           The title for the book
 * @param  {boolean}  options.viewDetailsLink Should we display the 'view details' link?
 * @param  {Object}   options                 The props for the Book component
 * @return {JSX}
 */
const Book = ({
  authors,
  id,
  imageLinks,
  onShelfChange,
  publisher,
  shelf,
  style,
  subtitle,
  title,
  viewDetailsLink,
}) => {
  /**
   * Update the book - to - shelf association
   * @param  {string}   shelfId The id of the new shelf
   * @return {Function}
   */
  const updateBook = (shelfId) => moveBookToShelf(id, shelfId)
    .then(res => onShelfChange(res));

  return (
    <div className="book">
      <div className="book-top">
        {renderBookCover(title, imageLinks, style.bookCover, subtitle)}
        {renderBookShelfChanger(updateBook, shelf, BookConstants.SELECT_LIST_OPTIONS)}
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{renderAuthors(authors, publisher)}</div>
      <div className="book-details">{renderDetailsLink(id, viewDetailsLink)}</div>
    </div>
  );
};

Book.propTypes = {
  authors: PropTypes.array,
  id: PropTypes.string.isRequired,
  imageLinks: PropTypes.object,
  onShelfChange: PropTypes.func,
  publisher: PropTypes.string,
  shelf: PropTypes.string,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  viewDetailsLink: PropTypes.bool,
};

Book.defaultProps = {
  authors: [],
  imageLinks: {},
  onShelfChange: () => {},
  publisher: '',
  shelf: '',
  style: {
    bookCover: {
      width: '128px',
      height: '193px',
    },
  },
  subtitle: '',
  title: '',
  viewDetailsLink: false,
};

export default Book;
