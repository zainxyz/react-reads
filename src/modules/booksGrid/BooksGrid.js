import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import shortid from 'shortid';

import Book from '../book';

class BooksGrid extends Component {
  renderBooks() {
    if (
      this.props.booksList &&
      Array.isArray(this.props.booksList) &&
      !isEmpty(this.props.booksList)
    ) {
      return this.props.booksList.map((book) => (
        <li key={shortid.generate()}>
          <Book
            {...book}
            onShelfChange={this.props.onShelfChange}
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
};

export default BooksGrid;
