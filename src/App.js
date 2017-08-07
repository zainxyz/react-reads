import isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import shortid from 'shortid';

import './App.css';
import * as BooksAPI from './BooksAPI';
import BookShelf from './modules/bookShelf';
import { filterBooksListByShelfId } from './common/utils/bookUtils';

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchPage: true,
      shelves: {},
    };
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
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false, })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
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

export default BooksApp;
