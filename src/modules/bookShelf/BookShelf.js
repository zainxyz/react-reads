import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';

import Book from '../book';

class BookShelf extends Component {
  renderBooks() {
    if (
      this.props.booksList &&
      Array.isArray(this.props.booksList) &&
      !isEmpty(this.props.booksList)
    ) {
      return this.props.booksList.map((book) => (
        <li key={shortid.generate()}>
          <Book {...book} />
        </li>
      ));
    }
    return null;
  }

  renderTitle() {
    if (this.props.title) {
      return <h2 className="bookshelf-title">{this.props.title}</h2>;
    }
    return null;
  }

  render() {
    return (
      <div className="bookshelf">
        {this.renderTitle()}
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.renderBooks()}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  booksList: PropTypes.array.isRequired,
};

export default BookShelf;
