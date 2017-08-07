import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import * as BooksAPI from '../../BooksAPI';
import SearchBar from '../../common/searchBar';
import BooksGrid from '../booksGrid';

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
      BooksAPI.search(query, 10)
        .then(res => {
          if (!isEmpty(res) &&
            Array.isArray(res)
          ) {
            this.setState({ fetchedBooks: res, });
            this.props.fetchedBooks(res);
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
  fetchedBooks: PropTypes.func.isRequired,
  throttleSeconds: PropTypes.number,
};

BookSearch.defaultProps = {
  placeholder: '',
  throttleSeconds: 1200,
};

export default BookSearch;
