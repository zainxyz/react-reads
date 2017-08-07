import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';

import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './modules/bookShelf';
import BookSearch from './modules/bookSearch';
import { filterBooksListByShelfId } from './common/utils/bookUtils';

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      shelves: {},
      showSearchPage: true,
    };

    this.fetchedBooks = this.fetchedBooks.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(res => {
        const read = filterBooksListByShelfId(res, 'read');
        const currentlyReading = filterBooksListByShelfId(res, 'currentlyReading');
        const wantToRead = filterBooksListByShelfId(res, 'wantToRead');

        this.setState({
          shelves: {
            currentlyReading: {
              title: 'Currently Enjoy Reading',
              booksList: currentlyReading,
            },
            wantToRead: {
              title: 'I Want to Read',
              booksList: wantToRead,
            },
            read: {
              title: 'I\'ve Already Read',
              booksList: read,
            },
          },
        });
      });
  }

  fetchedBooks(booksList) {
    console.log('fetchedBooks : ', booksList);
  }

  renderBookShelves() {
    const { shelves, } = this.state;

    if (!isEmpty(shelves)) {
      return Object.keys(shelves).map(idx => (
        <BookShelf {...shelves[idx]} key={shortid.generate()} />
      ));
    }

    return null;
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch
            fetchedBooks={this.fetchedBooks}
            placeholder={this.props.searchPlaceholder}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.renderBookShelves()}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true, })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

BooksApp.propTypes = {
  searchPlaceholder: PropTypes.string,
};

BooksApp.defaultProps = {
  searchPlaceholder: 'Search a book by title or author...',
};

export default BooksApp;
