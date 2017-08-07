import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BooksGrid from '../booksGrid';

class BookShelf extends Component {
  renderBooksGrid() {
    if (this.props.booksList) {
      return (
        <BooksGrid
          booksList={this.props.booksList}
          onShelfChange={this.props.onShelfChange}
        />
      );
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