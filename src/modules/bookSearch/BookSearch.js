import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BooksGrid from '../booksGrid';
import SearchBar from '../../common/searchBar';
import { searchBooks } from '../../common/api/BooksAPI';

class BookSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchedBooks: [],
    };

    this.fetchBooksByQuery = this.fetchBooksByQuery.bind(this);
  }

  fetchBooksByQuery(query) {
    if (
      query &&
      this.props.fetchedBooks &&
      typeof this.props.fetchedBooks === 'function'
    ) {
      searchBooks(query, 10)
        .then(res => {
          const booksList = res.books ? res.books : [];

          if (!isEmpty(booksList) &&
            Array.isArray(booksList)
          ) {
            this.setState({ fetchedBooks: booksList, });
            this.props.fetchedBooks(booksList);
          } else {
            this.setState({ fetchedBooks: [], });
            this.props.fetchedBooks([]);
          }
        });
    } else if (query === '') {
      this.setState({ fetchedBooks: [], });
      this.props.fetchedBooks([]);
    }

    return null;
  }

  renderSearchBar() {
    return (
      <SearchBar
        closeSearchURL={this.props.closeSearchURL}
        getQuery={this.fetchBooksByQuery}
        placeholder={this.props.placeholder}
        throttleSeconds={this.props.throttleSeconds}
      />
    );
  }

  renderSearchedBooksGrid() {
    return (
      <BooksGrid
        booksList={this.state.fetchedBooks}
      />
    );
  }

  render() {
    return (
      <div className="books-search-wrapper">
        {this.renderSearchBar()}
        <div className="search-results">
          {this.renderSearchedBooksGrid()}
        </div>
      </div>
    );
  }
}

BookSearch.propTypes = {
  placeholder: PropTypes.string,
  closeSearchURL: PropTypes.string,
  fetchedBooks: PropTypes.func.isRequired,
  throttleSeconds: PropTypes.number,
};

BookSearch.defaultProps = {
  closeSearchURL: '',
  placeholder: '',
  throttleSeconds: 1200,
};

export default BookSearch;
