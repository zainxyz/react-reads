import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BooksGrid from 'common/booksGrid';
import { SectionHeader } from 'common/typography';

/**
 * Class for rendering a bookshelf
 * @class
 * @extends {Component}
 */
class BookShelf extends Component {
  /**
   * Render a books grid based on the given list of books
   * @return {JSX|null}
   */
  renderBooksGrid() {
    if (this.props.booksList) {
      return (
        <BooksGrid
          booksList={this.props.booksList}
          onShelfChange={this.props.onShelfChange}
          viewDetailsLink
        />
      );
    }
    return null;
  }

  /**
   * Render the title of the bookshelf
   * @return {JSX|null}
   */
  renderTitle() {
    const { title, } = this.props;

    if (title) {
      return (
        <SectionHeader
          className="bookshelf-title"
          title={title}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <div className="bookshelf">
        {this.renderTitle()}
        <div className="bookshelf-books">
          {this.renderBooksGrid()}
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  booksList: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func,
  title: PropTypes.string.isRequired,
};

BookShelf.defaultProps = {
  onShelfChange: () => {},
};

export default BookShelf;
