import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BooksGrid from '../booksGrid';
import SearchBar from '../../common/searchBar';
import { searchBooks } from '../../common/api/BooksAPI';

/**
 * Class for searching for a book given a search term
 * @class
 * @extends {Component}
 */
class BookSearch extends Component {
  constructor(props) {
    super(props);

    // Setting the default state
    this.state = {
      fetchedBooks: [],
    };

    // Bindings to 'this'
    this.fetchBooksByQuery = this.fetchBooksByQuery.bind(this);
  }

  /**
   * Fetch a list of books based on the given query
   * @param  {string}        query The given query to search
   * @return {Function|null}
   */
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

  /**
   * Render a search bar atop the current page
   * @return {JSX}
   */
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

  /**
   * Render a books grid for the fetched books
   * @return {JSX}
   */
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
  closeSearchURL: PropTypes.string,
  fetchedBooks: PropTypes.func,
  placeholder: PropTypes.string,
  throttleSeconds: PropTypes.number,
};

BookSearch.defaultProps = {
  closeSearchURL: '',
  fetchedBooks: () => {},
  placeholder: '',
  throttleSeconds: 1200,
};

export default BookSearch;
