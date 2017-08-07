import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import './App.css';
import { getAllBooks } from './common/api/BooksAPI';
import BookShelf from './modules/bookShelf';
import BookSearch from './modules/bookSearch';
import { filterBooksListByShelfId } from './common/utils/bookUtils';

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      shelves: {},
      showSearchPage: false,
    };

    this.fetchedBooks = this.fetchedBooks.bind(this);
    this.onShelfChange = this.onShelfChange.bind(this);
    this.renderBookSearch = this.renderBookSearch.bind(this);
    this.renderMyReads = this.renderMyReads.bind(this);
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  onShelfChange(updatedBooks) {
    if (!isEmpty(updatedBooks)) {
      this.fetchAllBooks();
    }
  }

  fetchAllBooks() {
    getAllBooks()
      .then(res => {
        const booksList = res.books ? res.books : [];
        const read = filterBooksListByShelfId(booksList, 'read');
        const currentlyReading = filterBooksListByShelfId(booksList, 'currentlyReading');
        const wantToRead = filterBooksListByShelfId(booksList, 'wantToRead');

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
        <BookShelf
          {...shelves[idx]}
          key={shortid.generate()}
          onShelfChange={this.onShelfChange}
        />
      ));
    }

    return null;
  }

  renderBookSearch() {
    return (
      <BookSearch
        closeSearchURL={this.props.closeSearchURL}
        fetchedBooks={this.fetchedBooks}
        placeholder={this.props.searchPlaceholder}
      />
    );
  }

  renderMyReads() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.renderBookShelves()}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter basename="/">
        <div className="app">
          <Route exact path="/" render={this.renderMyReads} />
          <Route path="/search" render={this.renderBookSearch} />
        </div>
      </BrowserRouter>
    );
  }
}

BooksApp.propTypes = {
  closeSearchURL: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  title: PropTypes.string,
};

BooksApp.defaultProps = {
  closeSearchURL: '/',
  searchPlaceholder: 'Search a book by title or author...',
  title: 'Zain\'s Reads',
};

export default BooksApp;
