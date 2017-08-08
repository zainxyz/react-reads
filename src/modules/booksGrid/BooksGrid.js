import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';

import Book from '../book';

/**
 * Class for rendering a collection of books in a grid.
 * @class
 * @extends {Component}
 */
class BooksGrid extends Component {
  /**
   * Render an array of books based on the passed-in booksList
   * @return {JSX|null}
   */
  renderBooks() {
    if (!isEmpty(this.props.booksList)) {
      return this.props.booksList.map((book) => (
        <li key={shortid.generate()}>
          <Book
            {...book}
            onShelfChange={this.props.onShelfChange}
            viewDetailsLink={this.props.viewDetailsLink}
          />
        </li>
      ));
    }
    return null;
  }

  render() {
    return (
      <ol className="books-grid">
        {this.renderBooks()}
      </ol>
    );
  }
}

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
