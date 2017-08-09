import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import 'App.css';
import BookDetails from 'modules/bookDetails';
import BookSearch from 'modules/bookSearch';
import MyReads from 'modules/myReads';
import UndefinedBooksListException from 'UndefinedBooksListException';
import { getAllBooks } from 'api/booksAPI';

/**
 * Class for creating the main Books Application
 * @class
 * @extends {Component}
 */
class BooksApp extends Component {
  constructor(props) {
    super(props);

    // Set the initial state
    this.state = {
      booksList: [],
    };

    // Bindings to 'this'
    this.fetchAllBooks = this.fetchAllBooks.bind(this);
    this.renderBookSearch = this.renderBookSearch.bind(this);
    this.renderMyReads = this.renderMyReads.bind(this);
  }

  componentDidMount() {
    // Fetch all of the books on the initial mounting
    this.fetchAllBooks();
  }

  /**
   * Make a fetch request to get all of the books for the given user (me in this case)
   * @return {Promise}
   */
  fetchAllBooks() {
    getAllBooks()
      .then(res => {
        // This is the final booksList coming back from the API fetch call.
        const booksList = res.books ? res.books : [];

        // After successfully fetching the 'booksList', update the component's state with booksList
        this.setState({ booksList, });
      })
      .catch(() => {
        throw new UndefinedBooksListException();
      });

    return null;
  }

  /**
   * Render the book search route
   * @return {JSX}
   */
  renderBookSearch() {
    const { booksList, } = this.state;
    const { closeSearchURL, searchPlaceholder, } = this.props;

    return (
      <BookSearch
        closeSearchURL={closeSearchURL}
        originalBooksList={booksList}
        placeholder={searchPlaceholder}
        fetchAllBooks={this.fetchAllBooks}
      />
    );
  }

  /**
   * Render the my reads route
   * @return {JSX}
   */
  renderMyReads() {
    const { booksList, } = this.state;

    return (
      <MyReads
        booksList={booksList}
        onShelfChange={this.fetchAllBooks}
      />
    );
  }

  render() {
    return (
      <BrowserRouter basename="/">
        <div className="app">
          <Route exact path="/" render={this.renderMyReads} />
          <Route path="/search" render={this.renderBookSearch} />
          <Route path="/book/:bookId" component={BookDetails} />
        </div>
      </BrowserRouter>
    );
  }
}

BooksApp.propTypes = {
  closeSearchURL: PropTypes.string,
  searchPlaceholder: PropTypes.string,
};

BooksApp.defaultProps = {
  closeSearchURL: '/',
  searchPlaceholder: 'Search a book by title or author...',
};

export default BooksApp;
