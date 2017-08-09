import PropTypes from 'prop-types';
import React from 'react';

import SectionHeader from 'components/common/typography/SectionHeader';

import BookGrid from './BookGrid';

/**
 * Render a single bookshelf containing a collection of books
 * @param  {Array}    options.booksList     The list of books
 * @param  {Function} options.onShelfChange The callback for shelf change event
 * @param  {string}   options.title         The title of the bookshelf
 * @param  {Object}   options               The props for the BookShelf component
 * @return {JSX}
 */
const BookShelf = ({ booksList, onShelfChange, title, }) => (
  <div className="bookshelf">
    {
      title &&
      <SectionHeader
        className="bookshelf-title"
        title={title}
      />
    }
    <div className="bookshelf-books">
      {
        booksList &&
        <BookGrid
          booksList={booksList}
          onShelfChange={onShelfChange}
          viewDetailsLink
        />
      }
    </div>
  </div>
);

BookShelf.propTypes = {
  booksList: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func,
  title: PropTypes.string.isRequired,
};

BookShelf.defaultProps = {
  onShelfChange: () => {},
};

export default BookShelf;
