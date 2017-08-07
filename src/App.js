import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import BookSearch from './modules/bookSearch';
import MyReads from './modules/myReads';

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.renderBookSearch = this.renderBookSearch.bind(this);
  }

  renderBookSearch() {
    return (
      <BookSearch
        closeSearchURL={this.props.closeSearchURL}
        placeholder={this.props.searchPlaceholder}
      />
    );
  }

  render() {
    return (
      <BrowserRouter basename="/">
        <div className="app">
          <Route exact path="/" component={MyReads} />
          <Route path="/search" render={this.renderBookSearch} />
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
