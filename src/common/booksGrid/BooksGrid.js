import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';

import Book from 'common/book';

/**
 * Render a collection of books in a grid
 * @param  {Array}    options.booksList       The list of books
 * @param  {Function} options.onShelfChange   The callback for shelf change event
 * @param  {boolean}  options.viewDetailsLink Should we display the 'view details' link?
 * @param  {Object}   options                 The props for the BooksGrid component
 * @return {JSX}
 */
const BooksGrid = ({ booksList, onShelfChange, viewDetailsLink, }) => (
  <ol className="books-grid">
    {
      booksList.map(book => (
        <li key={shortid.generate()}>
          <Book
            {...book}
            onShelfChange={onShelfChange}
            viewDetailsLink={viewDetailsLink}
          />
        </li>
      ))
    }
  </ol>
);

BooksGrid.propTypes = {
  booksList: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func,
  viewDetailsLink: PropTypes.bool,
};

BooksGrid.defaultProps = {
  onShelfChange: () => {},
  viewDetailsLink: false,
};

export default BooksGrid;
